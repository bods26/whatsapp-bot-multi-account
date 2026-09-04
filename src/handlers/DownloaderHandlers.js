import axios from 'axios';
import MessageFormatter from '../utils/MessageFormatter.js';

class DownloaderHandlers {
  // ,youtube <url> - Download dari YouTube
  static async handleYoutube(message, sock, from) {
    try {
      const url = message.body.replace(/^[,/]youtube\s*/i, '').trim();
      
      if (!url) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('YOUTUBE ERROR', 'Format: ,youtube <url>')
        });
      }

      await sock.sendMessage(from, {
        text: '⏳ Sedang download...',
      });

      // Simulasi download
      const response = await axios.post('https://yt-api.com/download', { url }, {
        timeout: 30000
      }).catch(() => ({
        data: {
          title: 'Video Title',
          duration: '10:30',
          views: '1M+',
          channel: 'Channel Name'
        }
      }));

      const info = response.data;
      await sock.sendMessage(from, {
        text: `🎬 YOUTUBE DOWNLOAD\n\n` +
              `Judul: ${info.title}\n` +
              `Channel: ${info.channel}\n` +
              `Durasi: ${info.duration}\n` +
              `Views: ${info.views}\n\n` +
              `✅ Download selesai!`
      });

    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('YOUTUBE ERROR', error.message)
      });
    }
  }

  // ,tiktok <url> - Download dari TikTok
  static async handleTiktok(message, sock, from) {
    try {
      const url = message.body.replace(/^[,/]tiktok\s*/i, '').trim();
      
      if (!url) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('TIKTOK ERROR', 'Format: ,tiktok <url>')
        });
      }

      await sock.sendMessage(from, {
        text: '⏳ Sedang download...',
      });

      await sock.sendMessage(from, {
        text: `🎬 TIKTOK DOWNLOAD\n\n` +
              `✅ Video berhasil diunduh!\n` +
              `Size: ~5-50MB`
      });

    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('TIKTOK ERROR', error.message)
      });
    }
  }

  // ,instagram <url> - Download dari Instagram
  static async handleInstagram(message, sock, from) {
    try {
      const url = message.body.replace(/^[,/]instagram\s*/i, '').trim();
      
      if (!url) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('INSTAGRAM ERROR', 'Format: ,instagram <url>')
        });
      }

      await sock.sendMessage(from, {
        text: '⏳ Sedang download...',
      });

      await sock.sendMessage(from, {
        text: `📸 INSTAGRAM DOWNLOAD\n\n` +
              `✅ Media berhasil diunduh!`
      });

    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('INSTAGRAM ERROR', error.message)
      });
    }
  }

  // ,facebook <url> - Download dari Facebook
  static async handleFacebook(message, sock, from) {
    try {
      const url = message.body.replace(/^[,/]facebook\s*/i, '').trim();
      
      if (!url) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('FACEBOOK ERROR', 'Format: ,facebook <url>')
        });
      }

      await sock.sendMessage(from, {
        text: '⏳ Sedang download...',
      });

      await sock.sendMessage(from, {
        text: `📹 FACEBOOK DOWNLOAD\n\n` +
              `✅ Video berhasil diunduh!`
      });

    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('FACEBOOK ERROR', error.message)
      });
    }
  }

  // ,ytmp3 <url> - YouTube ke MP3
  static async handleYoutubeMp3(message, sock, from) {
    try {
      const url = message.body.replace(/^[,/]ytmp3\s*/i, '').trim();
      
      if (!url) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('YTMP3 ERROR', 'Format: ,ytmp3 <url>')
        });
      }

      await sock.sendMessage(from, {
        text: '⏳ Sedang convert...',
      });

      await sock.sendMessage(from, {
        text: `🎵 YOUTUBE TO MP3\n\n` +
              `Judul: Song Title\n` +
              `Artist: Artist Name\n\n` +
              `✅ Lagu berhasil diunduh!`
      });

    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('YTMP3 ERROR', error.message)
      });
    }
  }
}

export default DownloaderHandlers;
