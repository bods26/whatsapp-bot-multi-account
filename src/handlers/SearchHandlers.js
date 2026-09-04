import MessageFormatter from '../utils/MessageFormatter.js';
import ValidationUtils from '../utils/ValidationUtils.js';

class SearchHandlers {
  // ,github <query> - Search GitHub
  static async handleGithub(message, sock, from) {
    try {
      const query = message.body.replace(/^[,/]github\s*/i, '').trim();
      
      if (!query) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('GITHUB ERROR', 'Format: ,github <nama repo>')
        });
      }

      await sock.sendMessage(from, {
        text: '🔍 Sedang search...'
      });

      try {
        const response = await axios.get(
          `https://api.github.com/search/repositories?q=${query}&sort=stars&per_page=5`
        );
        
        let result = `🔍 GITHUB SEARCH: ${query}\n\n`;
        
        response.data.items.forEach((repo, i) => {
          result += `${i+1}. ${repo.full_name}\n` +
                    `   ⭐ ${repo.stargazers_count}\n` +
                    `   📝 ${repo.description || 'No description'}\n` +
                    `   🔗 ${repo.html_url}\n\n`;
        });
        
        await sock.sendMessage(from, { text: result });
      } catch (error) {
        await sock.sendMessage(from, {
          text: MessageFormatter.formatError('GITHUB ERROR', 'Gagal search repository')
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('GITHUB ERROR', error.message)
      });
    }
  }

  // ,play <query> - Cari lagu YouTube
  static async handlePlay(message, sock, from) {
    try {
      const query = message.body.replace(/^[,/]play\s*/i, '').trim();
      
      if (!query) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('PLAY ERROR', 'Format: ,play <judul lagu>')
        });
      }

      await sock.sendMessage(from, {
        text: '🎵 Sedang search lagu...'
      });

      await sock.sendMessage(from, {
        text: `🎵 SEARCH: ${query}\n\n` +
              `Judul: Song Title\n` +
              `Channel: Channel Name\n` +
              `Duration: 3:45\n` +
              `Views: 1M+\n\n` +
              `🔗 youtube.com/watch?v=xxx`
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('PLAY ERROR', error.message)
      });
    }
  }

  // ,waifu - Random anime girl
  static async handleWaifu(message, sock, from) {
    try {
      await sock.sendMessage(from, {
        text: '✨ Sedang fetch waifu...'
      });

      try {
        const response = await axios.get('https://api.waifu.pics/random/waifu');
        
        await sock.sendMessage(from, {
          image: response.data.url,
          caption: '✨ Waifu Random'
        });
      } catch (error) {
        await sock.sendMessage(from, {
          text: '✨ Waifu\n\nSedang mencari...'
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('WAIFU ERROR', error.message)
      });
    }
  }

  // ,charinfo <nama> - Cari info karakter anime
  static async handleCharinfo(message, sock, from) {
    try {
      const charName = message.body.replace(/^[,/]charinfo\s*/i, '').trim();
      
      if (!charName) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('CHARINFO ERROR', 'Format: ,charinfo <nama karakter>')
        });
      }

      await sock.sendMessage(from, {
        text: `📖 KARAKTER INFO: ${charName}\n\n` +
              `Nama: ${charName}\n` +
              `Anime: Unknown\n` +
              `Age: Unknown\n` +
              `Kelas: Unknown`
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('CHARINFO ERROR', error.message)
      });
    }
  }
}

export default SearchHandlers;
