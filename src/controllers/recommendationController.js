const {
  getPersonalizedRecommendations,
  getSimilarTitles,
  getTrendingMovies,
  getTopRatedMovies,
} = require('../services/recommendationService');

exports.getRecommendations = async (req, res, next) => {
  try {
    const recommendations = await getPersonalizedRecommendations(req.user._id);
    res.json(recommendations);
  } catch (error) {
    next(error);
  }
};

exports.getSimilarTitles = async (req, res, next) => {
  try {
    const similarTitles = await getSimilarTitles(req.params.movieId);
    res.json(similarTitles);
  } catch (error) {
    next(error);
  }
};

exports.getTrendingMovies = async (req, res, next) => {
  try {
    const trendingMovies = await getTrendingMovies();
    res.json(trendingMovies);
  } catch (error) {
    next(error);
  }
};

exports.getTopRatedMovies = async (req, res, next) => {
  try {
    const topRatedMovies = await getTopRatedMovies();
    res.json(topRatedMovies);
  } catch (error) {
    next(error);
  }
};
