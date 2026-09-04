import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WhatsAppAccount'
  },
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  image: String,
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema);
