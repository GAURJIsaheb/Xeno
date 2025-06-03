import mongoose from 'mongoose';

const RuleSchema = new mongoose.Schema({
  field: { type: String, required: true },    // e.g., "total_spent"
  operator: { type: String, required: true }, // e.g., ">", "<", "=="
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: false });

const SegmentData = new mongoose.Schema({
  id: { type: String, required: true, unique: true },    // segment ID
  name: { type: String, required: true },                 // segment name
  description: { type: String, required: true },          // segment description
  count: { type: Number, required: true },                 // number of customers
  lastUpdated: { type: Date, required: true },            // last update date
  tags: [{ type: String }],                                // array of tags

  rules: [RuleSchema],                                     // optional: filtering rules
  logic: { type: String, enum: ['AND', 'OR'], default: 'AND' },  // rules logic
  audiencePreviewCount: { type: Number }                   // optional preview count
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.models.Segment || mongoose.model('Segment', SegmentData);
