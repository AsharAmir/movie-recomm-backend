const Movie = require('../models/Movie');
const User = require('../models/User');

exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const recommendedMovies = await Movie.find({ genre: { $in: user.preferences.genres } }).limit(10); //get 10 recomms
    res.json(recommendedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
