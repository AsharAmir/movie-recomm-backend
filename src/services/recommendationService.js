const Movie = require('../models/Movie');
const Review = require('../models/Review');
const User = require('../models/User');

const getPersonalizedRecommendations = async (userId) => {
  try {
    const user = await User.findById(userId);
    const { genres } = user.preferences;

    // Fetch top-rated movies in the user's preferred genres
    const recommendedMovies = await Movie.find({ genre: { $in: genres } })
      .sort({ averageRating: -1 })
      .limit(10);

    return recommendedMovies;
  } catch (error) {
    throw new Error(`Error generating recommendations: ${error.message}`);
  }
};

const getSimilarTitles = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) throw new Error('Movie not found');

    const similarMovies = await Movie.find({
      _id: { $ne: movie._id }, // Exclude the current movie
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
      { $sort: { reviewCount: -1 } }, // sort in descending
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
