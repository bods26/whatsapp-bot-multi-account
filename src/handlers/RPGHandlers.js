import UserData from '../database/models/UserData.js';
import MessageFormatter from '../utils/MessageFormatter.js';
import GameEngine from '../utils/GameEngine.js';

class RPGHandlers {
  // ,mulairpg - Mulai RPG
  static async handleMulaiRPG(message, sock, from) {
    try {
      const existingPlayer = await UserData.findOne({ userId: from });
      
      if (existingPlayer?.rpg?.level) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('RPG ERROR', 'Kamu sudah punya karakter!')
        });
      }

      const player = new UserData({
        userId: from,
        rpg: {
          level: 1,
          exp: 0,
          hp: 100,
          maxHp: 100,
          mana: 50,
          maxMana: 50,
          gold: 0,
          inventory: [],
          stats: {
            strength: 10,
            intelligence: 10,
            agility: 10,
            endurance: 10
          }
        }
      });

      await player.save();

      await sock.sendMessage(from, {
        text: `⚔️ RPG START!\n\n` +
              `Nama: Petualang\n` +
              `Level: 1\n` +
              `HP: 100/100\n` +
              `Gold: 0\n\n` +
              `Gunakan:\n` +
              `,Profile - Lihat status\n` +
              `,Inventory - Lihat item\n` +
              `,Berburu - Cari monster\n` +
              `,Menambang - Mining\n` +
              `,Berlatih - Naik exp`
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('RPG ERROR', error.message)
      });
    }
  }

  // ,profile - Lihat profil karakter
  static async handleProfile(message, sock, from) {
    try {
      const player = await UserData.findOne({ userId: from });
      
      if (!player) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('RPG ERROR', 'Gunakan ,mulairpg terlebih dahulu')
        });
      }

      const expToLevel = player.rpg.level * 100 - player.rpg.exp;
      const profile = MessageFormatter.formatProfile(player.rpg);
      
      await sock.sendMessage(from, { text: profile });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('PROFILE ERROR', error.message)
      });
    }
  }

  // ,inventory - Lihat inventaris
  static async handleInventory(message, sock, from) {
    try {
      const player = await UserData.findOne({ userId: from });
      
      if (!player) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('INVENTORY ERROR', 'Gunakan ,mulairpg terlebih dahulu')
        });
      }

      let inv = `🎒 INVENTORY (${player.rpg.inventory.length}/20)\n\n`;
      
      if (player.rpg.inventory.length === 0) {
        inv += 'Inventory kosong';
      } else {
        player.rpg.inventory.forEach((item, i) => {
          inv += `${i+1}. ${item.name} x${item.quantity}\n`;
        });
      }
      
      await sock.sendMessage(from, { text: inv });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('INVENTORY ERROR', error.message)
      });
    }
  }

  // ,berburu - Hunt untuk mendapat exp
  static async handleBerburu(message, sock, from) {
    try {
      const player = await UserData.findOne({ userId: from });
      
      if (!player) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('HUNT ERROR', 'Gunakan ,mulairpg terlebih dahulu')
        });
      }

      const monster = GameEngine.getRandomMonster();
      let monsterHp = monster.hp;
      let battles = [];
      
      while (monsterHp > 0 && player.rpg.hp > 0) {
        const playerDamage = player.rpg.stats.strength + Math.random() * 10;
        monsterHp -= playerDamage;
        battles.push(`⚔️ Kamu damage ${Math.floor(playerDamage)}`);
        
        if (monsterHp <= 0) break;
        
        const monsterDamage = monster.damage + Math.random() * 5;
        player.rpg.hp -= monsterDamage;
        battles.push(`💥 ${monster.name} damage ${Math.floor(monsterDamage)}`);
      }
      
      let result = `🎮 HASIL PERTEMPURAN\n\n`;
      result += `vs ${monster.name}\n\n`;
      battles.slice(0, 5).forEach(b => result += b + '\n');
      
      if (player.rpg.hp > 0) {
        player.rpg.exp += monster.exp;
        player.rpg.inventory.push({ name: monster.loot, quantity: 1 });
        player.rpg.gold += 50;
        result += `\n✅ MENANG!\n+${monster.exp} EXP\n+${monster.loot}\n+50 Gold`;
        
        // Check level up
        if (player.rpg.exp >= player.rpg.level * 100) {
          player.rpg.level++;
          player.rpg.exp = 0;
          player.rpg.maxHp += 20;
          player.rpg.hp = player.rpg.maxHp;
          result += `\n\n🎉 LEVEL UP! Level ${player.rpg.level}`;
        }
      } else {
        player.rpg.hp = player.rpg.maxHp;
        result += `\n❌ KALAH!\n-50 Gold`;
        player.rpg.gold = Math.max(0, player.rpg.gold - 50);
      }
      
      await player.save();
      await sock.sendMessage(from, { text: result });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('HUNT ERROR', error.message)
      });
    }
  }

  // ,berlatih - Training untuk exp
  static async handleBerlatih(message, sock, from) {
    try {
      const player = await UserData.findOne({ userId: from });
      
      if (!player) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('TRAINING ERROR', 'Gunakan ,mulairpg terlebih dahulu')
        });
      }

      const expGained = Math.floor(Math.random() * 30) + 10;
      player.rpg.exp += expGained;
      
      let result = `💪 TRAINING SELESAI\n\n+${expGained} EXP`;
      
      if (player.rpg.exp >= player.rpg.level * 100) {
        player.rpg.level++;
        player.rpg.exp = 0;
        player.rpg.maxHp += 20;
        player.rpg.hp = player.rpg.maxHp;
        result += `\n\n🎉 LEVEL UP! Level ${player.rpg.level}`;
      }
      
      await player.save();
      await sock.sendMessage(from, { text: result });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('TRAINING ERROR', error.message)
      });
    }
  }
}

export default RPGHandlers;
