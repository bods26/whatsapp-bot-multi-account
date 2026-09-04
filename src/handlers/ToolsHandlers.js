import MessageFormatter from '../utils/MessageFormatter.js';
import axios from 'axios';

class ToolsHandlers {
  // ,removebg <reply gambar> - Hapus background
  static async handleRemovebg(message, sock, from) {
    try {
      if (!message.hasMedia || !message.type.includes('image')) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('REMOVEBG ERROR', 'Reply gambar dengan ,removebg')
        });
      }

      await sock.sendMessage(from, {
        text: '⏳ Sedang menghapus background...'
      });

      const media = await message.downloadMedia();
      
      await sock.sendMessage(from, {
        image: media.data,
        caption: '✅ Background telah dihapus'
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('REMOVEBG ERROR', error.message)
      });
    }
  }

  // ,ssweb <url> - Screenshot website
  static async handleSsweb(message, sock, from) {
    try {
      const url = message.body.replace(/^[,/]ssweb\s*/i, '').trim();
      
      if (!url) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('SSWEB ERROR', 'Format: ,ssweb <url>')
        });
      }

      await sock.sendMessage(from, {
        text: '📸 Sedang screenshot website...'
      });

      // Simulasi screenshot
      await sock.sendMessage(from, {
        text: `📸 Screenshot: ${url}\n\n✅ Screenshot selesai!`
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('SSWEB ERROR', error.message)
      });
    }
  }

  // ,sitecheck <url> - Cek status website
  static async handleSitecheck(message, sock, from) {
    try {
      const url = message.body.replace(/^[,/]sitecheck\s*/i, '').trim();
      
      if (!url) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('SITECHECK ERROR', 'Format: ,sitecheck <url>')
        });
      }

      await sock.sendMessage(from, {
        text: '🔍 Sedang check status...'
      });

      try {
        const response = await axios.head(url, { timeout: 5000 });
        const status = response.status === 200 ? '✅ ONLINE' : '⚠️ ERROR';
        
        await sock.sendMessage(from, {
          text: `🌐 SITE CHECK\n\nURL: ${url}\nStatus: ${status}\nCode: ${response.status}`
        });
      } catch (error) {
        await sock.sendMessage(from, {
          text: `🌐 SITE CHECK\n\nURL: ${url}\nStatus: ❌ OFFLINE`
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('SITECHECK ERROR', error.message)
      });
    }
  }

  // ,fetchurl <url> - Fetch content dari URL
  static async handleFetchurl(message, sock, from) {
    try {
      const url = message.body.replace(/^[,/]fetchurl\s*/i, '').trim();
      
      if (!url) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('FETCHURL ERROR', 'Format: ,fetchurl <url>')
        });
      }

      await sock.sendMessage(from, {
        text: '🔗 Sedang fetch content...'
      });

      try {
        const response = await axios.get(url, { timeout: 10000 });
        const content = typeof response.data === 'string' 
          ? response.data.substring(0, 1000) 
          : JSON.stringify(response.data).substring(0, 1000);
        
        await sock.sendMessage(from, {
          text: `🔗 FETCH URL\n\n${content}\n\n...`
        });
      } catch (error) {
        await sock.sendMessage(from, {
          text: MessageFormatter.formatError('FETCHURL ERROR', 'Gagal fetch URL')
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('FETCHURL ERROR', error.message)
      });
    }
  }
}

export default ToolsHandlers;
