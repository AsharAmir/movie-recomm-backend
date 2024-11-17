const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.moderateReviews= async(req, res, next) => {
    try{
        const reviews = await Review.find().populate('userId', 'name').populate('movieId', 'title');
        res.json(reviews);

    }catch(error){
        // res.status(500).json({message: 'Internal server error'});
        next(error);
    }
};

exports.getSiteStatistics = async (req, res, next) => {
    try {
      const totalMovies = await Movie.countDocuments();
      const totalReviews = await Review.countDocuments();
      res.json({ totalMovies, totalReviews });
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
      
    }
};

