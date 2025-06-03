import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  order_date: { type: Date, default: Date.now }
}, { 
    timestamps: true,
    versionKey: false
 });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
