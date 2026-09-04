import mongoose from 'mongoose';

const userDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WhatsAppAccount'
  },
  profile: {
    name: String,
    bio: String
  },
  rpg: {
    level: { type: Number, default: 1 },
    exp: { type: Number, default: 0 },
    hp: { type: Number, default: 100 },
    maxHp: { type: Number, default: 100 },
    mana: { type: Number, default: 50 },
    maxMana: { type: Number, default: 50 },
    gold: { type: Number, default: 0 },
    inventory: [{
      name: String,
      quantity: Number
    }],
    stats: {
      strength: { type: Number, default: 10 },
      intelligence: { type: Number, default: 10 },
      agility: { type: Number, default: 10 },
      endurance: { type: Number, default: 10 }
    }
  },
  store: {
    orders: [{
      productId: String,
      quantity: Number,
      status: String,
      createdAt: Date
    }],
    cart: [{
      productId: String,
      quantity: Number
    }]
  },
  premium: {
    isPremium: { type: Boolean, default: false },
    expiresAt: Date
  },
  warnings: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('UserData', userDataSchema);
