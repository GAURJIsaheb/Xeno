import mongoose from 'mongoose';

const DeliveryReceiptSchema = new mongoose.Schema({
  logId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunicationLog', required: true },
  status: { type: String, enum: ['SENT', 'FAILED'], required: true },
  receivedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  versionKey: false });

export default mongoose.models.DeliveryReceipt || mongoose.model('DeliveryReceipt', DeliveryReceiptSchema);
