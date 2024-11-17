const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['Movies', 'Actors', 'Industry'], required: true },
  relatedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  publishedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
