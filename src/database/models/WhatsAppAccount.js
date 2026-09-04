import mongoose from 'mongoose';

const whatsappAccountSchema = new mongoose.Schema({
  accountId: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: String,
  displayName: String,
  isConnected: {
    type: Boolean,
    default: false
  },
  sessionPath: String,
  qrCode: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TelegramUser'
  },
  features: {
    aiEnabled: { type: Boolean, default: true },
    convertEnabled: { type: Boolean, default: true },
    downloaderEnabled: { type: Boolean, default: true },
    gamesEnabled: { type: Boolean, default: true },
    groupToolsEnabled: { type: Boolean, default: true },
    storeEnabled: { type: Boolean, default: false },
    rpgEnabled: { type: Boolean, default: true }
  },
  stats: {
    messagesProcessed: { type: Number, default: 0 },
    commandsExecuted: { type: Number, default: 0 },
    errorsCount: { type: Number, default: 0 },
    lastActive: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('WhatsAppAccount', whatsappAccountSchema);
