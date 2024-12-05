const Movie = require('../models/Movie');
const Review = require('../models/Review');
const User = require('../models/User');

const getPersonalizedRecommendations = async (userId) => {
  try {
    const userReviews = await Review.find({ userId });
    const reviewedMovieIds = userReviews.map((review) => review.movieId);

    const similarUsers = await Review.aggregate([
      { $match: { movieId: { $in: reviewedMovieIds }, userId: { $ne: userId } } },
      { $group: { _id: '$userId', similarityScore: { $sum: 1 } } },
      { $sort: { similarityScore: -1 } },
      { $limit: 10 },
    ]);

    
    const similarUserIds = similarUsers.map((user) => user._id);

    const recommendations = await Review.aggregate([
      { $match: { userId: { $in: similarUserIds }, movieId: { $nin: reviewedMovieIds } } },
      { $group: { _id: '$movieId', avgRating: { $avg: '$rating' } } },
      { $sort: { avgRating: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: '_id',
          as: 'movieDetails',
        },
      },
      { $unwind: '$movieDetails' },
    ]);

    return recommendations.map((rec) => rec.movieDetails);
  } catch (error) {
    throw new Error(`Error generating recommendations: ${error.message}`);
  }
};

const getSimilarTitles = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) throw new Error('Movie not found');

    const similarMovies = await Movie.find({
      _id: { $ne: movie._id },
      $or: [
        { genre: { $in: movie.genre } },
        { director: movie.director },
      ],
    })
      .sort({ popularity: -1 })
      .limit(5);

    return similarMovies;
  } catch (error) {
    throw new Error(`Error fetching similar titles: ${error.message}`);
  }
};

const getTrendingMovies = async () => {
  try {
    const trending = await Review.aggregate([
      {
        $group: {
          _id: '$movieId',
          reviewCount: { $count: {} },
          averageRating: { $avg: '$rating' },
        },
      },
      { $sort: { reviewCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: '_id',
          as: 'movieDetails',
        },
      },
      { $unwind: '$movieDetails' },
    ]);

    return trending.map((t) => t.movieDetails);
  } catch (error) {
    throw new Error(`Error fetching trending movies: ${error.message}`);
  }
};

const getTopRatedMovies = async () => {
  try {
    const topRated = await Movie.find().sort({ averageRating: -1 }).limit(10);
    return topRated;
  } catch (error) {
    throw new Error(`Error fetching top-rated movies: ${error.message}`);
  }
};

module.exports = {
  getPersonalizedRecommendations,
  getSimilarTitles,
  getTrendingMovies,
  getTopRatedMovies,
};
