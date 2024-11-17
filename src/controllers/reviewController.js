const Review = require('../models/Review');
const Movie = require('../models/Movie');

exports.addReview = async (req, res, next) => {
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
    // res.status(400).json({ error: error.message });
    next(error);
  }
};

exports.getReviewsForMovie = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ movieId: req.params.movieId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

exports.getReviewHighlights = async (req, res, next) => {
  try {
    const topRatedReviews = await Review.find({ movieId: req.params.movieId })
      .sort({ rating: -1 }) 
      .limit(3)
      .populate('userId', 'name');

    const mostDiscussedReviews = await Review.find({ movieId: req.params.movieId })
      .sort({ commentsCount: -1 }) 
      .limit(3)
      .populate('userId', 'name');

    res.json({
      topRatedReviews,
      mostDiscussedReviews,
    });
  } catch (error) {
    next(error);
  }
};


exports.addOrUpdateReview = async (req, res, next) => {
  const { movieId, rating, review } = req.body;

  try {
    let existingReview = await Review.findOne({ movieId, userId: req.user._id });

    if (existingReview) {
      // if existing, edit it
      const oldRating = existingReview.rating;
      existingReview.rating = rating;
      existingReview.review = review;
      await existingReview.save();

      // Update the movie's average rating
      const movie = await Movie.findById(movieId);
      movie.averageRating = ((movie.averageRating * movie.ratingsCount) - oldRating + rating) / movie.ratingsCount;
      await movie.save();

      return res.status(200).json({ message: 'Review updated', review: existingReview });
    } else {
      const newReview = new Review({ movieId, userId: req.user._id, rating, review });
      await newReview.save();

      const movie = await Movie.findById(movieId);
      movie.ratingsCount++;
      movie.averageRating = ((movie.averageRating * (movie.ratingsCount - 1)) + rating) / movie.ratingsCount;
      await movie.save();

      return res.status(201).json({ message: 'Review added', review: newReview });
    }
  } catch (error) {
    next(error);
  }
};