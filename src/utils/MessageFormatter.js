class MessageFormatter {
  // Format menu dengan tombol
  static formatMenu(title, items, footer = '') {
    let menu = `╔════════════════════╗\n`;
    menu += `║ ${title.padEnd(18)} ║\n`;
    menu += `╠════════════════════╣\n`;
    
    items.forEach((item, i) => {
      menu += `║ ${(i + 1)}.  ${item.padEnd(14)} ║\n`;
    });
    
    menu += `╚════════════════════╝`;
    if (footer) menu += `\n${footer}`;
    
    return menu;
  }

  // Format error message
  static formatError(title, message) {
    return `❌ ${title}\n\n${message}`;
  }

  // Format success message
  static formatSuccess(title, message) {
    return `✅ ${title}\n\n${message}`;
  }

  // Format info message
  static formatInfo(title, data) {
    let message = `ℹ️ ${title}\n\n`;
    for (let [key, value] of Object.entries(data)) {
      message += `${key}: ${value}\n`;
    }
    return message;
  }

  // Format profile
  static formatProfile(player) {
    return `
⚔️ PROFILE KARAKTER

Nama: ${player.name || 'Petualang'}
Level: ${player.level || 1}
EXP: ${player.exp || 0}/${(player.level || 1) * 100}

❤️ HP: ${player.hp || 100}/${player.maxHp || 100}
💎 Mana: ${player.mana || 50}/${player.maxMana || 50}
💰 Gold: ${player.gold || 0}

⚡ Strength: ${player.stats?.strength || 10}
🧠 Intelligence: ${player.stats?.intelligence || 10}
🏃 Agility: ${player.stats?.agility || 10}
🛡️ Endurance: ${player.stats?.endurance || 10}
    `.trim();
  }
}

export default MessageFormatter;
