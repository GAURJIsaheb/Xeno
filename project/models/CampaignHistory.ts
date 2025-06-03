// models/CampaignHistory.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICampaignHistory extends Document {
  campaignId: mongoose.Types.ObjectId;
  name: string;
  message: string;
  status: 'Sent' | 'Scheduled';
  sent: number;
  opened: number;
  clicked: number;
  sentDate: Date | null;
  scheduledDate: Date | null;
  tags: string[];
  snapshotDate: Date;
}

const CampaignHistorySchema = new Schema<ICampaignHistory>({
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Sent', 'Scheduled'], required: true },
  sent: { type: Number, default: 0 },
  opened: { type: Number, default: 0 },
  clicked: { type: Number, default: 0 },
  sentDate: { type: Date, default: null },
  scheduledDate: { type: Date, default: null },
  tags: [{ type: String }],
  snapshotDate: { type: Date, default: Date.now }  // When this history entry was created
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.models.CampaignHistory || mongoose.model<ICampaignHistory>('CampaignHistory', CampaignHistorySchema);
