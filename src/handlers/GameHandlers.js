import GameSession from '../database/models/GameSession.js';
import GameEngine from '../utils/GameEngine.js';
import MessageFormatter from '../utils/MessageFormatter.js';

class GameHandlers {
  // ,blackjack - Permainan Blackjack
  static async handleBlackjack(message, sock, from) {
    try {
      const command = message.body.toLowerCase();
      
      if (command === ',blackjack' || command === '/blackjack') {
        const deck = GameEngine.generateDeck();
        const playerHand = [deck.pop(), deck.pop()];
        const dealerHand = [deck.pop(), deck.pop()];
        
        const gameState = {
          deck, playerHand, dealerHand, phase: 'playing'
        };
        
        await GameSession.create({
          userId: from,
          gameType: 'blackjack',
          gameState,
          status: 'playing',
          startedAt: new Date()
        });
        
        const playerValue = GameEngine.calculateBlackjackValue(playerHand);
        const dealerValue = GameEngine.calculateBlackjackValue([dealerHand[1]]);
        
        await sock.sendMessage(from, {
          text: `🃏 BLACKJACK\n\n` +
                `Kartu Kamu: ${this.displayCards(playerHand)}\n` +
                `Total: ${playerValue}\n\n` +
                `Dealer: [?] [${dealerHand[1].rank}${dealerHand[1].suit}]\n\n` +
                `Gunakan: ,hit atau ,stand`
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('BLACKJACK ERROR', error.message)
      });
    }
  }

  // ,hangman - Tebak kata
  static async handleHangman(message, sock, from) {
    try {
      const command = message.body.toLowerCase();
      
      if (command === ',hangman' || command === '/hangman') {
        const word = GameEngine.getRandomWord();
        
        const gameState = {
          word,
          guessed: new Set(),
          wrong: 0,
          maxWrong: 6
        };
        
        await GameSession.create({
          userId: from,
          gameType: 'hangman',
          gameState,
          status: 'playing',
          startedAt: new Date()
        });
        
        const display = '_ '.repeat(word.length);
        
        await sock.sendMessage(from, {
          text: `🎮 HANGMAN\n\n` +
                `${display}\n\n` +
                `Salah: 0/6\n\n` +
                `Gunakan: ,guess <huruf>`
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('HANGMAN ERROR', error.message)
      });
    }
  }

  // ,slot - Slot Machine
  static async handleSlot(message, sock, from) {
    try {
      const emojis = ['🍎', '🍊', '🍋', '🍌', '🍉', '💰'];
      
      const spin = () => emojis[Math.floor(Math.random() * emojis.length)];
      
      const result1 = spin();
      const result2 = spin();
      const result3 = spin();
      
      const isWin = result1 === result2 && result2 === result3;
      
      await sock.sendMessage(from, {
        text: `🎰 SLOT MACHINE\n\n` +
              `${result1} ${result2} ${result3}\n\n` +
              (isWin ? `🎉 JACKPOT! MENANG!` : `❌ Coba lagi dengan ,slot`)
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('SLOT ERROR', error.message)
      });
    }
  }

  // ,tebak - Tebak angka
  static async handleTebak(message, sock, from) {
    try {
      const command = message.body.toLowerCase();
      
      if (command === ',tebak' || command === '/tebak') {
        const number = Math.floor(Math.random() * 100) + 1;
        
        const gameState = {
          number,
          attempts: 0,
          maxAttempts: 10
        };
        
        await GameSession.create({
          userId: from,
          gameType: 'tebak',
          gameState,
          status: 'playing',
          startedAt: new Date()
        });
        
        await sock.sendMessage(from, {
          text: `🎯 TEBAK ANGKA\n\n` +
                `Angka antara 1-100\n` +
                `Kesempatan: 10\n\n` +
                `Gunakan: ,tebak <angka>`
        });
      }
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('TEBAK ERROR', error.message)
      });
    }
  }

  // ,snake - Game Snake
  static async handleSnake(message, sock, from) {
    try {
      const gameState = GameEngine.initSnakeGame();
      
      await GameSession.create({
        userId: from,
        gameType: 'snake',
        gameState,
        status: 'playing',
        startedAt: new Date()
      });
      
      await sock.sendMessage(from, {
        text: `🐍 SNAKE GAME\n\n` +
              `Score: 0\n\n` +
              `Gunakan: ,up, ,down, ,left, ,right\n` +
              `Stop: ,quit`
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('SNAKE ERROR', error.message)
      });
    }
  }

  // ,mines - Minesweeper
  static async handleMines(message, sock, from) {
    try {
      const gameState = {
        grid: 5,
        mines: 5,
        revealed: [],
        score: 0
      };
      
      await GameSession.create({
        userId: from,
        gameType: 'mines',
        gameState,
        status: 'playing',
        startedAt: new Date()
      });
      
      await sock.sendMessage(from, {
        text: `💣 MINESWEEPER\n\n` +
              `Score: 0\n\n` +
              `Gunakan: ,click <x> <y>`
      });
    } catch (error) {
      await sock.sendMessage(from, {
        text: MessageFormatter.formatError('MINES ERROR', error.message)
      });
    }
  }

  // Utility untuk display kartu
  static displayCards(hand) {
    return hand.map(card => `${card.rank}${card.suit}`).join(' ');
  }
}

export default GameHandlers;
