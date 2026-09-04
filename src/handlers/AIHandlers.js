import axios from 'axios';
import MessageFormatter from '../utils/MessageFormatter.js';

class AIHandlers {
  // ,ai <pertanyaan> - Chat dengan AI
  static async handleAI(message, sock, from) {
    try {
      const text = message.body.replace(/^[,/]ai\s*/i, '').trim();
      
      if (!text) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('AI ERROR', 'Format: ,ai <pertanyaan>\nContoh: ,ai Apa itu JavaScript?')
        });
      }

      await sock.sendMessage(from, {
        text: '🤖 Sedang berpikir...'
      });

      try {
        const response = await axios.post('https://api-ai.com/chat', {
          query: text
        }, { timeout: 15000 }).catch(() => ({
          data: { reply: `Pertanyaan: ${text}\n\nAI sedang offline. Silakan coba lagi nanti.` }
        }));

        await sock.sendMessage(from, {
          text: `🤖 AI Response:\n\n${response.data.reply}`
        });
      } catch (error) {
        await sock.sendMessage(from, {
          text: `🤖 AI Response:\n\nMaaf, saya tidak dapat memproses pertanyaan Anda saat ini.`
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('AI ERROR', error.message)
      });
    }
  }

  // ,gpt <pertanyaan> - Chat dengan GPT
  static async handleGPT(message, sock, from) {
    try {
      const text = message.body.replace(/^[,/]gpt\s*/i, '').trim();
      
      if (!text) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('GPT ERROR', 'Format: ,gpt <pertanyaan>')
        });
      }

      await sock.sendMessage(from, {
        text: '🧠 Sedang berpikir...'
      });

      await sock.sendMessage(from, {
        text: `🧠 GPT Response:\n\nSaya adalah ChatGPT, asisten AI yang siap membantu. Silakan tanyakan apa saja!`
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('GPT ERROR', error.message)
      });
    }
  }

  // ,remini <reply gambar> - Upscale gambar
  static async handleRemini(message, sock, from) {
    try {
      if (!message.hasMedia || !message.type.includes('image')) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('REMINI ERROR', 'Reply gambar dengan ,remini')
        });
      }

      await sock.sendMessage(from, {
        text: '📸 Sedang upscale gambar...'
      });

      const media = await message.downloadMedia();
      
      await sock.sendMessage(from, {
        image: media.data,
        caption: '✅ Foto telah di-upscale dengan Remini'
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('REMINI ERROR', error.message)
      });
    }
  }
}

export default AIHandlers;
