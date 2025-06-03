import mongoose from 'mongoose';

const RuleSchema = new mongoose.Schema({
  field: { type: String, required: true }, // e.g., "total_spent"
  operator: { type: String, required: true }, // e.g., ">", "<", "=="
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: false });

const AudienceSegmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rules: [RuleSchema],
  logic: { type: String, default: 'AND' }, // OR / AND
  audiencePreviewCount: Number
}, {
   timestamps: true,
  versionKey: false
 });

export default mongoose.models.AudienceSegment || mongoose.model('AudienceSegment', AudienceSegmentSchema);
