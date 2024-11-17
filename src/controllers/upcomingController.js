const UpcomingMovie = require('../models/UpcomingMovie');
const { sendEmail } = require('../services/emailService');

exports.subscribeToReminder = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await UpcomingMovie.findById(movieId);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    if (!movie.reminderSubscribers.includes(req.user._id)) {
      movie.reminderSubscribers.push(req.user._id);
      await movie.save();

      res.status(200).json({ message: 'Successfully subscribed to reminders' });
    } else {
      res.status(400).json({ error: 'Already subscribed' });
    }
  } catch (error) {
    next(error);
  }
};

exports.getUpcomingMovies = async (req, res, next) => {
  try {
    const movies = await UpcomingMovie.find().sort('releaseDate');
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

exports.addUpcomingMovie = async (req, res, next) => {
    try {
      const { title, releaseDate, genres, trailerLink } = req.body;
      const upcomingMovie = new UpcomingMovie({ title, releaseDate, genres, trailerLink });
      await upcomingMovie.save();
      res.status(201).json(upcomingMovie);
    } catch (error) {
      next(error);
    }
  };
