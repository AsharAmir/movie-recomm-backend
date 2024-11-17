const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  recipient: { type: String, required: true }, 
  awardTitle: { type: String, required: true }, 
  organization: { type: String, required: true }, 
  year: { type: Number, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Award', awardSchema);
