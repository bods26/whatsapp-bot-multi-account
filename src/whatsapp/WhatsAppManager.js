import { makeWASocket, useMultiFileAuthState, DisconnectReason, delay } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ConvertHandlers from './handlers/ConvertHandlers.js';
import DownloaderHandlers from './handlers/DownloaderHandlers.js';
import GameHandlers from './handlers/GameHandlers.js';
import RPGHandlers from './handlers/RPGHandlers.js';
import AIHandlers from './handlers/AIHandlers.js';
import GroupHandlers from './handlers/GroupHandlers.js';
import ToolsHandlers from './handlers/ToolsHandlers.js';
import SearchHandlers from './handlers/SearchHandlers.js';
import ValidationUtils from './utils/ValidationUtils.js';
import MessageFormatter from './utils/MessageFormatter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class WhatsAppManager {
  constructor() {
    this.accounts = new Map();
    this.logger = pino({ level: 'silent' });
  }

  async connectAccount(accountId, sessionPath) {
    try {
      const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
      
      const sock = makeWASocket({
        auth: state,
        logger: this.logger,
        printQRInTerminal: false,
        msgRetryCounterMap: {},
        defaultQueryTimeoutMs: 0,
      });

      sock.ev.on('creds.update', saveCreds);

      sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          console.log(`[${accountId}] QR Code Generated`);
          this.onQRCode(accountId, qr);
        }

        if (connection === 'close') {
          const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
          if (shouldReconnect) {
            this.reconnectAccount(accountId, sessionPath);
          }
        } else if (connection === 'open') {
          console.log(`✅ [${accountId}] Bot Connected!`);
        }
      });

      sock.ev.on('messages.upsert', async (m) => {
        await this.handleMessage(m, sock, accountId);
      });

      this.accounts.set(accountId, sock);
      return sock;
    } catch (error) {
      console.error(`❌ Connection error for ${accountId}:`, error.message);
      throw error;
    }
  }

  async reconnectAccount(accountId, sessionPath) {
    await delay(5000);
    this.connectAccount(accountId, sessionPath);
  }

  async handleMessage(m, sock, accountId) {
    try {
      const message = m.messages[0];
      if (!message.message) return;

      const from = message.key.remoteJid;
      const text = (
        message.message.conversation ||
        message.message.extendedTextMessage?.text ||
        message.message.imageMessage?.caption ||
        ''
      ).toLowerCase();

      // Check rate limit
      if (!ValidationUtils.checkRateLimit(from, 10, 60000)) {
        return await sock.sendMessage(from, {
          text: '⏳ Tunggu sebelum menggunakan command lagi'
        });
      }

      const cmd = ValidationUtils.parseCommand(text);
      if (!cmd) return;

      console.log(`[${accountId}] Command: ${cmd.command} from ${from}`);

      // Route commands
      const commandHandlers = {
        // Convert
        sticker: () => ConvertHandlers.handleSticker(message, sock, from),
        brat: () => ConvertHandlers.handleBrat(message, sock, from),
        quote: () => ConvertHandlers.handleQuote(message, sock, from),
        emojimix: () => ConvertHandlers.handleEmojimix(message, sock, from),

        // Downloader
        youtube: () => DownloaderHandlers.handleYoutube(message, sock, from),
        ytmp3: () => DownloaderHandlers.handleYoutubeMp3(message, sock, from),
        tiktok: () => DownloaderHandlers.handleTiktok(message, sock, from),
        instagram: () => DownloaderHandlers.handleInstagram(message, sock, from),
        igdl: () => DownloaderHandlers.handleInstagram(message, sock, from),
        facebook: () => DownloaderHandlers.handleFacebook(message, sock, from),

        // Games
        blackjack: () => GameHandlers.handleBlackjack(message, sock, from),
        hangman: () => GameHandlers.handleHangman(message, sock, from),
        slot: () => GameHandlers.handleSlot(message, sock, from),
        tebak: () => GameHandlers.handleTebak(message, sock, from),
        snake: () => GameHandlers.handleSnake(message, sock, from),
        mines: () => GameHandlers.handleMines(message, sock, from),

        // RPG
        mulairpg: () => RPGHandlers.handleMulaiRPG(message, sock, from),
        profile: () => RPGHandlers.handleProfile(message, sock, from),
        inventory: () => RPGHandlers.handleInventory(message, sock, from),
        berburu: () => RPGHandlers.handleBerburu(message, sock, from),
        berlatih: () => RPGHandlers.handleBerlatih(message, sock, from),

        // AI
        ai: () => AIHandlers.handleAI(message, sock, from),
        gpt: () => AIHandlers.handleGPT(message, sock, from),
        remini: () => AIHandlers.handleRemini(message, sock, from),

        // Group
        antilinkon: () => GroupHandlers.handleAntilinkOn(message, sock, from),
        antilinkoff: () => GroupHandlers.handleAntilinkOff(message, sock, from),
        antilinkstatus: () => GroupHandlers.handleAntilinkStatus(message, sock, from),
        kick: () => GroupHandlers.handleKick(message, sock, from),
        promote: () => GroupHandlers.handlePromote(message, sock, from),
        demote: () => GroupHandlers.handleDemote(message, sock, from),

        // Tools
        removebg: () => ToolsHandlers.handleRemovebg(message, sock, from),
        ssweb: () => ToolsHandlers.handleSsweb(message, sock, from),
        sitecheck: () => ToolsHandlers.handleSitecheck(message, sock, from),
        fetchurl: () => ToolsHandlers.handleFetchurl(message, sock, from),

        // Search
        github: () => SearchHandlers.handleGithub(message, sock, from),
        play: () => SearchHandlers.handlePlay(message, sock, from),
        waifu: () => SearchHandlers.handleWaifu(message, sock, from),
        charinfo: () => SearchHandlers.handleCharinfo(message, sock, from),

        // Help
        help: () => this.handleHelp(sock, from),
        menu: () => this.handleMenu(sock, from),
      };

      const handler = commandHandlers[cmd.command];
      if (handler) {
        await handler();
      } else {
        await sock.sendMessage(from, {
          text: `❓ Command ,${cmd.command} tidak ditemukan. Gunakan ,menu untuk melihat daftar command.`
        });
      }

      // Anti-link check untuk grup
      if (from.endsWith('@g.us')) {
        await GroupHandlers.checkAndRemoveLink(message, sock, from);
      }
    } catch (error) {
      console.error('Message handler error:', error);
      await sock.sendMessage(m.messages[0].key.remoteJid, {
        text: MessageFormatter.formatError('ERROR', error.message)
      }).catch(() => {});
    }
  }

  async handleMenu(sock, from) {
    const menu = `
☕️ DILS SCM BOT
WhatsApp Bot To Solve Your Problems

[ AI ]
,ai - Chat dengan AI
,gpt - ChatGPT
,remini - Upscale foto

[ CONVERT ]
,brat - Brat style text
,quote - Generate quote
,emojimix - Mix emoji
,sticker - Buat sticker

[ DOWN ]
,youtube - Download YouTube
,ytmp3 - YouTube ke MP3
,tiktok - Download TikTok
,instagram - Download Instagram
,facebook - Download Facebook

[ GAME ]
,blackjack - Blackjack game
,hangman - Hangman game
,slot - Slot machine
,tebak - Tebak angka
,snake - Snake game
,mines - Minesweeper

[ GROUP ]
,antilinkon - Enable anti-link
,antilinkoff - Disable anti-link
,antilinkstatus - Status anti-link
,kick - Kick member
,promote - Jadikan admin
,demote - Turunkan dari admin

[ RPG ]
,mulairpg - Mulai RPG
,profile - Lihat profil
,inventory - Lihat inventaris
,berburu - Hunt monster
,berlatih - Training

[ TOOLS ]
,removebg - Hapus background
,ssweb - Screenshot website
,sitecheck - Cek status website
,fetchurl - Fetch URL content

[ SEARCH ]
,github - Search GitHub
,play - Cari lagu YouTube
,waifu - Random anime girl
,charinfo - Info karakter

Format: ,<command> atau /<command>
    `.trim();

    await sock.sendMessage(from, { text: menu });
  }

  async handleHelp(sock, from) {
    const help = `
❓ BANTUAN\n
Gunakan command dengan format:
,<command> <parameter>
Contoh: ,ai apa itu javascript

Untuk melihat semua command:
,menu

Jika ada bug atau error:
Laporkan ke owner bot.
    `.trim();

    await sock.sendMessage(from, { text: help });
  }

  getAccount(accountId) {
    return this.accounts.get(accountId);
  }

  async disconnectAccount(accountId) {
    const sock = this.accounts.get(accountId);
    if (sock) {
      await sock.end();
      this.accounts.delete(accountId);
    }
  }

  onQRCode(accountId, qr) {
    // Event handler untuk QR code
    console.log(`QR Code for ${accountId}`);
  }
}

export default WhatsAppManager;
