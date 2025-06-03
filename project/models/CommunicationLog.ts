import mongoose from 'mongoose';

const CommunicationLogSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  status: { type: String, enum: ['SENT', 'FAILED', 'PENDING'], default: 'PENDING' },
  message: String,
  sentAt: Date
}, 
{ timestamps: true ,
  versionKey: false
});

export default mongoose.models.CommunicationLog || mongoose.model('CommunicationLog', CommunicationLogSchema);
