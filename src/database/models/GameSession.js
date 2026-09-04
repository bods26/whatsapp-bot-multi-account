import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
  userId: String,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WhatsAppAccount'
  },
  gameType: String, // blackjack, hangman, snake, etc
  gameState: mongoose.Schema.Types.Mixed,
  score: Number,
  status: String, // playing, won, lost, paused
  startedAt: Date,
  endedAt: Date,
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 jam
    index: { expireAfterSeconds: 0 }
  }
});

export default mongoose.model('GameSession', gameSessionSchema);
