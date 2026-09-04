import GroupSettings from '../database/models/GroupSettings.js';
import MessageFormatter from '../utils/MessageFormatter.js';

class GroupHandlers {
  // ,antilink on - Enable antilink
  static async handleAntilinkOn(message, sock, from) {
    try {
      const groupId = from;
      
      let groupSettings = await GroupSettings.findOne({ groupId });
      if (!groupSettings) {
        groupSettings = new GroupSettings({ groupId });
      }
      
      groupSettings.antilink.enabled = true;
      await groupSettings.save();
      
      await sock.sendMessage(from, {
        text: '✅ Antilink AKTIF\n\nSetiap pesan berisi link akan dihapus.'
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('ANTILINK ERROR', error.message)
      });
    }
  }

  // ,antilink off - Disable antilink
  static async handleAntilinkOff(message, sock, from) {
    try {
      const groupSettings = await GroupSettings.findOne({ groupId: from });
      
      if (!groupSettings) {
        return await sock.sendMessage(from, {
          text: MessageFormatter.formatError('ANTILINK ERROR', 'Antilink belum diaktifkan')
        });
      }
      
      groupSettings.antilink.enabled = false;
      await groupSettings.save();
      
      await sock.sendMessage(from, {
        text: '❌ Antilink NONAKTIF'
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('ANTILINK ERROR', error.message)
      });
    }
  }

  // ,antilink status - Cek status antilink
  static async handleAntilinkStatus(message, sock, from) {
    try {
      const groupSettings = await GroupSettings.findOne({ groupId: from });
      
      const status = groupSettings?.antilink?.enabled ? 'AKTIF ✅' : 'NONAKTIF ❌';
      const warnings = groupSettings?.antilink?.warnings ? Object.keys(groupSettings.antilink.warnings).length : 0;
      
      await sock.sendMessage(from, {
        text: `🔗 ANTILINK STATUS\n\n` +
              `Status: ${status}\n` +
              `Members dengan warning: ${warnings}`
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('ANTILINK ERROR', error.message)
      });
    }
  }

  // ,kick <reply pesan> - Kick member
  static async handleKick(message, sock, from) {
    try {
      if (message.hasQuotedMsg) {
        const quotedMsg = message.getQuotedMessage();
        const userToKick = quotedMsg.from;
        
        await sock.groupParticipantsUpdate(
          from,
          [userToKick],
          'remove'
        );
        
        await sock.sendMessage(from, {
          text: '👋 Member telah di-kick!'
        });
      } else {
        await sock.sendMessage(from, {
          text: MessageFormatter.formatError('KICK ERROR', 'Reply pesan member yang ingin di-kick')
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('KICK ERROR', error.message)
      });
    }
  }

  // ,promote <reply pesan> - Jadikan admin
  static async handlePromote(message, sock, from) {
    try {
      if (message.hasQuotedMsg) {
        const quotedMsg = message.getQuotedMessage();
        const userToPromote = quotedMsg.from;
        
        await sock.groupParticipantsUpdate(
          from,
          [userToPromote],
          'promote'
        );
        
        await sock.sendMessage(from, {
          text: '⬆️ User telah dijadikan admin!'
        });
      } else {
        await sock.sendMessage(from, {
          text: MessageFormatter.formatError('PROMOTE ERROR', 'Reply pesan user yang ingin di-promote')
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('PROMOTE ERROR', error.message)
      });
    }
  }

  // ,demote <reply pesan> - Turunkan dari admin
  static async handleDemote(message, sock, from) {
    try {
      if (message.hasQuotedMsg) {
        const quotedMsg = message.getQuotedMessage();
        const userToDemote = quotedMsg.from;
        
        await sock.groupParticipantsUpdate(
          from,
          [userToDemote],
          'demote'
        );
        
        await sock.sendMessage(from, {
          text: '⬇️ Admin telah diturunkan!'
        });
      } else {
        await sock.sendMessage(from, {
          text: MessageFormatter.formatError('DEMOTE ERROR', 'Reply pesan admin yang ingin di-demote')
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('DEMOTE ERROR', error.message)
      });
    }
  }

  // Check link dalam pesan
  static async checkAndRemoveLink(message, sock, from) {
    try {
      const groupSettings = await GroupSettings.findOne({ groupId: from });
      
      if (!groupSettings?.antilink?.enabled) return;
      
      const urlPattern = /https?:\/\/|wa\.me\/|whatsapp\.com/gi;
      
      if (urlPattern.test(message.body)) {
        const sender = message.from.split('@')[0];
        
        if (!groupSettings.antilink.warnings) {
          groupSettings.antilink.warnings = {};
        }
        
        groupSettings.antilink.warnings[sender] = (groupSettings.antilink.warnings[sender] || 0) + 1;
        
        // Delete pesan
        await sock.sendMessage(from, {
          delete: message.key
        });
        
        const warnings = groupSettings.antilink.warnings[sender];
        
        await sock.sendMessage(from, {
          text: `⚠️ @${sender}\n❌ LINK TERDETEKSI\nPeringatan: ${warnings}/3\n\n3 peringatan = KICK!`,
          mentions: [message.from]
        });
        
        // Kick jika 3x warning
        if (warnings >= 3) {
          await sock.groupParticipantsUpdate(
            from,
            [message.from],
            'remove'
          );
          
          await sock.sendMessage(from, {
            text: `👋 @${sender} telah di-KICK karena antilink`,
            mentions: [message.from]
          });
          
          delete groupSettings.antilink.warnings[sender];
        }
        
        await groupSettings.save();
      }
    } catch (error) {
      console.error('Antilink check error:', error);
    }
  }
}

export default GroupHandlers;
