const BoxOffice = require('../models/BoxOffice');

exports.getBoxOffice = async (req, res, next) => {
  try {
    const boxOffice = await BoxOffice.findOne({ movie: req.params.movieId }).populate('movie', 'title');
    if (!boxOffice) return res.status(404).json({ message: 'Box office data not found' });
    res.json(boxOffice);
  } catch (error) {
    next(error);
  }
};
