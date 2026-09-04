import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
  userId: String,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WhatsAppAccount'
  },
  gameType: String,
  gameState: mongoose.Schema.Types.Mixed,
  score: Number,
  status: String,
  startedAt: Date,
  endedAt: Date,
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    index: { expireAfterSeconds: 0 }
  }
});

export default mongoose.model('GameSession', gameSessionSchema);
