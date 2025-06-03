 import mongoose from 'mongoose';

// const CampaignSchema = new mongoose.Schema({
//   segmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'AudienceSegment', required: true },
//   name: { type: String, required: true },
//   message: { type: String, required: true },
//   status: { type: String, enum: ['Draft', 'Sent', 'Scheduled'], default: 'Draft' },
//   sent: { type: Number, default: 0 },
//   opened: { type: Number, default: 0 },
//   startedAt: { type: Date, default: Date.now }
// }, { 
//   timestamps: true,
//   versionKey: false
// });

// export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);

const CampaignSchema = new mongoose.Schema({
  segmentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Draft', 'Sent', 'Scheduled'], default: 'Draft' },
  sent: { type: Number, default: 0 },
  opened: { type: Number, default: 0 },
  clicked: { type: Number, default: 0 },              // add clicked
  sentDate: { type: Date, default: null },             // date campaign was sent
  scheduledDate: { type: Date, default: null },        // date campaign scheduled for
  tags: [{ type: String }],                             // array of tag strings
  startedAt: { type: Date, default: Date.now }         // can keep for when campaign was created
}, { 
  timestamps: true,
  versionKey: false
});
export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);

