import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  last_active: { type: Date },
  total_spent: { type: Number, default: 0 },
  visit_count: { type: Number, default: 0 }
}, { timestamps: true ,
    versionKey: false
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
