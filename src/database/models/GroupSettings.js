import mongoose from 'mongoose';

const groupSettingsSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WhatsAppAccount'
  },
  groupName: String,
  antilink: {
    enabled: { type: Boolean, default: false },
    warnings: mongoose.Schema.Types.Mixed,
    action: { type: String, default: 'kick' } // kick, mute, warn
  },
  antiswgc: {
    enabled: { type: Boolean, default: false }
  },
  welcome: {
    enabled: { type: Boolean, default: false },
    message: String
  },
  rules: [String],
  admins: [String],
  moderators: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('GroupSettings', groupSettingsSchema);
