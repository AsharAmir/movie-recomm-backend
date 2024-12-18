const mongoose = require('mongoose');

const upcomingMovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genres: [String],
  trailerLink: { type: String },
  reminderSubscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('UpcomingMovie', upcomingMovieSchema);
