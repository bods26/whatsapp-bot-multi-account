class GameEngine {
  // Generate deck kartu
  static generateDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];

    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push({ suit, rank });
      }
    }

    return deck.sort(() => Math.random() - 0.5);
  }

  // Hitung nilai kartu BlackJack
  static calculateBlackjackValue(hand) {
    let value = 0;
    let aces = 0;

    for (let card of hand) {
      if (card.rank === 'A') {
        aces++;
        value += 11;
      } else if (['J', 'Q', 'K'].includes(card.rank)) {
        value += 10;
      } else {
        value += parseInt(card.rank);
      }
    }

    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }

    return value;
  }

  // Game Snake
  static initSnakeGame() {
    return {
      grid: 10,
      snake: [{ x: 5, y: 5 }],
      food: { x: 8, y: 8 },
      direction: 'right',
      score: 0
    };
  }

  // Random word untuk Hangman
  static getRandomWord() {
    const words = [
      'javascript',
      'programming',
      'whatsapp',
      'baileys',
      'mongodb',
      'telegram',
      'developer',
      'artificial',
      'intelligence',
      'adventure'
    ];
    return words[Math.floor(Math.random() * words.length)];
  }

  // RPG Monster
  static getRandomMonster() {
    const monsters = [
      { name: 'Slime', hp: 20, damage: 5, exp: 25, loot: 'Slime Jelly' },
      { name: 'Goblin', hp: 40, damage: 10, exp: 50, loot: 'Goblin Coin' },
      { name: 'Orc', hp: 60, damage: 15, exp: 100, loot: 'Orc Tusks' },
      { name: 'Skeleton', hp: 50, damage: 12, exp: 75, loot: 'Bone Dust' },
      { name: 'Wolf', hp: 35, damage: 8, exp: 40, loot: 'Wolf Fur' }
    ];
    return monsters[Math.floor(Math.random() * monsters.length)];
  }
}

export default GameEngine;
