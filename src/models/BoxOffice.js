const mongoose = require('mongoose');

const boxOfficeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  openingWeekendEarnings: { type: Number, required: true },
  totalEarnings: { type: Number, required: true },
  internationalEarnings: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('BoxOffice', boxOfficeSchema);
