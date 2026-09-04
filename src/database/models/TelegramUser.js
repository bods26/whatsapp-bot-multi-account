import mongoose from 'mongoose';

const telegramUserSchema = new mongoose.Schema({
  telegramId: {
    type: Number,
    unique: true,
    required: true
  },
  username: String,
  firstName: String,
  lastName: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WhatsAppAccount'
  }],
  settings: {
    language: { type: String, default: 'id' },
    notifications: { type: Boolean, default: true },
    theme: { type: String, default: 'dark' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TelegramUser', telegramUserSchema);
