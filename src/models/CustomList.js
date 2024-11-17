const mongoose = require('mongoose');

const customListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }], 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
}, { timestamps: true });

module.exports = mongoose.model('CustomList', customListSchema);
