const Review = require('../models/Review');
const Movie = require('../models/Movie');

exports.addReview = async (req, res) => {
  const { movieId, rating, review } = req.body;
  try {
    const newReview = new Review({ movieId, userId: req.user._id, rating, review });

    await newReview.save();
    const movie = await Movie.findById(movieId); //find movie and update its rating
    
    movie.averageRating = ((movie.averageRating * (movie.ratingsCount - 1)) + rating) / movie.ratingsCount;
    movie.ratingsCount++;

    await movie.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReviewsForMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).populate('userId', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
