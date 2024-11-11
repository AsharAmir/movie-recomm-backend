const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: [String],
  director: String,
  cast: [String],
  releaseDate: Date,
  runtime: Number,
  synopsis: String,
  trivia: String,
  goofs: String,
  soundtrack: String,
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  parentalGuidance: String,
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
