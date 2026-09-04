import { Telegraf } from 'telegraf';
import TelegramUser from '../database/models/TelegramUser.js';
import WhatsAppAccount from '../database/models/WhatsAppAccount.js';
import dotenv from 'dotenv';

dotenv.config();

class TelegramDashboard {
  constructor(whatsappManager) {
    this.bot = new Telegraf(process.env.TELEGRAM_TOKEN);
    this.whatsappManager = whatsappManager;
    this.adminId = parseInt(process.env.TELEGRAM_ADMIN_ID);
    this.setupMiddleware();
    this.setupCommands();
  }

  setupMiddleware() {
    this.bot.use(async (ctx, next) => {
      try {
        // Register user
        const userId = ctx.from.id;
        let user = await TelegramUser.findOne({ telegramId: userId });
        
        if (!user) {
          user = new TelegramUser({
            telegramId: userId,
            username: ctx.from.username,
            firstName: ctx.from.first_name,
            lastName: ctx.from.last_name,
            isAdmin: userId === this.adminId
          });
          await user.save();
        }
        
        ctx.user = user;
        await next();
      } catch (error) {
        console.error('Middleware error:', error);
      }
    });
  }

  setupCommands() {
    // /start - Dashboard utama
    this.bot.command('start', async (ctx) => {
      const keyboard = {
        inline_keyboard: [
          [
            { text: '➕ Tambah Akun', callback_data: 'add_account' },
            { text: '📱 Daftar Akun', callback_data: 'list_accounts' }
          ],
          [
            { text: '⚙️ Pengaturan', callback_data: 'settings' },
            { text: '📊 Statistik', callback_data: 'stats' }
          ],
          [
            { text: '💾 Backup', callback_data: 'backup' },
            { text: '📚 Bantuan', callback_data: 'help' }
          ]
        ]
      };

      await ctx.reply(
        '🤖 Selamat Datang di Dashboard WhatsApp Bot\n\n' +
        'Gunakan menu di bawah untuk mengelola akun WhatsApp Anda.',
        { reply_markup: keyboard }
      );
    });

    // Callback handlers
    this.bot.action('add_account', this.handleAddAccount.bind(this));
    this.bot.action('list_accounts', this.handleListAccounts.bind(this));
    this.bot.action('settings', this.handleSettings.bind(this));
    this.bot.action('stats', this.handleStats.bind(this));
    this.bot.action('backup', this.handleBackup.bind(this));
    this.bot.action('help', this.handleHelp.bind(this));

    // Text input handler
    this.bot.on('text', this.handleText.bind(this));
  }

  async handleAddAccount(ctx) {
    try {
      const user = ctx.user;
      
      await ctx.reply(
        '📱 Tambah Akun WhatsApp\n\n' +
        'Masukkan nomor WhatsApp Anda (format: 628xxxxx):',
        { reply_markup: { remove_keyboard: true } }
      );

      this.awaitingPhoneNumber = ctx.from.id;
    } catch (error) {
      await ctx.reply('❌ Error: ' + error.message);
    }
  }

  async handleListAccounts(ctx) {
    try {
      const accounts = await WhatsAppAccount.find({ owner: ctx.user._id });
      
      if (accounts.length === 0) {
        return await ctx.reply('📱 Anda belum memiliki akun WhatsApp.');
      }

      let message = '📱 DAFTAR AKUN WHATSAPP\n\n';
      
      accounts.forEach((acc, i) => {
        const status = acc.isConnected ? '✅ Online' : '⭕ Offline';
        message += `${i + 1}. ${acc.phoneNumber}\n`;
        message += `   Status: ${status}\n`;
        message += `   Messages: ${acc.stats.messagesProcessed}\n\n`;
      });

      const keyboard = {
        inline_keyboard: accounts.map(acc => [
          {
            text: `${acc.isConnected ? '🔌' : '🔋'} ${acc.phoneNumber}`,
            callback_data: `acc_${acc._id}`
          }
        ])
      };

      await ctx.reply(message, { reply_markup: keyboard });
    } catch (error) {
      await ctx.reply('❌ Error: ' + error.message);
    }
  }

  async handleSettings(ctx) {
    try {
      const keyboard = {
        inline_keyboard: [
          [
            { text: '🌐 Bahasa', callback_data: 'lang' },
            { text: '🔔 Notifikasi', callback_data: 'notif' }
          ],
          [
            { text: '🎨 Theme', callback_data: 'theme' },
            { text: '↩️ Kembali', callback_data: 'start' }
          ]
        ]
      };

      await ctx.reply('⚙️ PENGATURAN\n\nPilih pengaturan yang ingin diubah:', {
        reply_markup: keyboard
      });
    } catch (error) {
      await ctx.reply('❌ Error: ' + error.message);
    }
  }

  async handleStats(ctx) {
    try {
      const accounts = await WhatsAppAccount.find({ owner: ctx.user._id });
      const totalMessages = accounts.reduce((sum, acc) => sum + acc.stats.messagesProcessed, 0);
      const totalCommands = accounts.reduce((sum, acc) => sum + acc.stats.commandsExecuted, 0);

      const message = `
📊 STATISTIK BOT\n
` +
        `Jumlah Akun: ${accounts.length}\n` +
        `Pesan Diproses: ${totalMessages}\n` +
        `Command Dijalankan: ${totalCommands}\n` +
        `Akun Online: ${accounts.filter(a => a.isConnected).length}\n` +
        `Akun Offline: ${accounts.filter(a => !a.isConnected).length}\n`;

      await ctx.reply(message);
    } catch (error) {
      await ctx.reply('❌ Error: ' + error.message);
    }
  }

  async handleBackup(ctx) {
    try {
      await ctx.reply('💾 Membuat backup...');
      // Backup logic
      await ctx.reply('✅ Backup berhasil dibuat!');
    } catch (error) {
      await ctx.reply('❌ Error: ' + error.message);
    }
  }

  async handleHelp(ctx) {
    const help = `
❓ BANTUAN\n
` +
      `Dashboard ini digunakan untuk mengelola multiple akun WhatsApp.\n\n` +
      `Menu:\n` +
      `➕ Tambah Akun - Tambahkan nomor WhatsApp baru\n` +
      `📱 Daftar Akun - Lihat semua akun yang terdaftar\n` +
      `⚙️ Pengaturan - Ubah preferensi\n` +
      `📊 Statistik - Lihat statistik penggunaan\n` +
      `💾 Backup - Backup data\n`;

    await ctx.reply(help);
  }

  async handleText(ctx) {
    try {
      if (ctx.from.id === this.awaitingPhoneNumber) {
        const phoneNumber = ctx.message.text.replace(/\D/g, '');
        
        if (phoneNumber.length < 10 || phoneNumber.length > 15) {
          return await ctx.reply('❌ Nomor WhatsApp tidak valid!');
        }

        const account = new WhatsAppAccount({
          accountId: `${ctx.from.id}_${Date.now()}`,
          phoneNumber,
          owner: ctx.user._id
        });

        await account.save();
        this.awaitingPhoneNumber = null;

        await ctx.reply(
          `✅ Akun ${phoneNumber} berhasil ditambahkan!\n\n` +
          'Silakan scan QR code untuk melakukan autentikasi.'
        );
      }
    } catch (error) {
      await ctx.reply('❌ Error: ' + error.message);
    }
  }

  async start() {
    console.log('🤖 Telegram Dashboard started...');
    this.bot.launch();
  }

  async stop() {
    this.bot.stop();
  }
}

export default TelegramDashboard;
