import WhatsAppAccount from '../database/models/WhatsAppAccount.js';
import UserData from '../database/models/UserData.js';
import GameSession from '../database/models/GameSession.js';
import MessageFormatter from '../utils/MessageFormatter.js';
import GameEngine from '../utils/GameEngine.js';

class ConvertHandlers {
  // ,sticker - Buat sticker dari gambar/video
  static async handleSticker(message, sock, from) {
    try {
      if (!message.hasMedia) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('STICKER ERROR', 'Reply gambar atau video dengan ,sticker')
        });
      }

      const media = await message.downloadMedia();
      const { default: sharp } = await import('sharp');
      
      const stickerBuffer = await sharp(media.data)
        .resize(512, 512, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .webp({ quality: 80 })
        .toBuffer();

      await sock.sendMessage(from, {
        sticker: stickerBuffer,
        packName: 'Dils Bot',
        author: 'Made with Love'
      }, { quoted: message });

    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('STICKER ERROR', error.message)
      });
    }
  }

  // ,brat - Generate Brat style text
  static async handleBrat(message, sock, from) {
    try {
      const text = message.body.replace(/^[,/]brat\s*/i, '').trim();
      
      if (!text) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('BRAT ERROR', 'Format: ,brat <text>')
        });
      }

      const bratText = text.split('').join(' ').toUpperCase();
      
      await sock.sendMessage(from, {
        text: `✨ BRAT STYLE\n\n${bratText}`
      });

    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('BRAT ERROR', error.message)
      });
    }
  }

  // ,quote - Generate quote image
  static async handleQuote(message, sock, from) {
    try {
      const text = message.body.replace(/^[,/]quote\s*/i, '').trim();
      
      if (!text) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('QUOTE ERROR', 'Format: ,quote <text>')
        });
      }

      const { default: sharp } = await import('sharp');
      const svg = `
        <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
            </style>
          </defs>
          <rect width="800" height="600" fill="#1a1a1a"/>
          <text x="400" y="300" font-size="48" font-family="Playfair Display" fill="#fff" text-anchor="middle" word-spacing="5">
            ${text.substring(0, 50)}
          </text>
          <text x="400" y="500" font-size="24" font-family="Arial" fill="#888" text-anchor="middle">
            - Dils Bot
          </text>
        </svg>
      `;

      const buffer = await sharp(Buffer.from(svg))
        .png()
        .toBuffer();

      await sock.sendMessage(from, {
        image: buffer,
        caption: '💭 Quote'
      });

    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('QUOTE ERROR', error.message)
      });
    }
  }

  // ,emojimix - Campur emoji
  static async handleEmojimix(message, sock, from) {
    try {
      const args = message.body.replace(/^[,/]emojimix\s*/i, '').trim().split(' ');
      
      if (args.length < 2) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('EMOJIMIX ERROR', 'Format: ,emojimix <emoji1> <emoji2>')
        });
      }

      const [emoji1, emoji2] = args;
      
      await sock.sendMessage(from, {
        text: `✨ Emoji Mix Result:\n\n${emoji1} + ${emoji2} = 🎉`
      });

    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('EMOJIMIX ERROR', error.message)
      });
    }
  }
}

export default ConvertHandlers;
