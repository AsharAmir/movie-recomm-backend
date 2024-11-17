const Movie = require('../models/Movie');
const UpcomingMovie = require('../models/UpcomingMovie');

exports.getAllMovies = async(req, res, next) => {
    try{
        const movies = await Movie.find();
        res.json(movies);
    }catch(error){
        // res.status(500).json({message: 'Internal server error'});
        next(error);
    }
};

exports.getMovieById = async(req, res, next) => {
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(404).json({message: 'Movie not found'});
        }
        res.json(movie);
    }catch(error){
        // res.status(500).json({message: 'Internal server error'});
        next(error);
    }
};

exports.addMovie = async (req, res, next) => {
    try {
      const movie = new Movie(req.body);
      await movie.save();

      // auto add to upcoming if its in future
      if(new Date(movie.releaseDate) > new Date()){
        const upcomingMovie = new UpcomingMovie({
          title: movie.title,
          releaseDate: movie.releaseDate,
          genres: movie.genre,
          trailerLink: req.body.trailerLink || null,
        });
        await upcomingMovie.save();
      }

      res.status(201).json(movie);
    } catch (error) {
      // res.status(400).json({ error: error.message });
      next(error);
    }
};

exports.updateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // update in existing movies table
    if (new Date(movie.releaseDate) > new Date()) {
      await UpcomingMovie.findOneAndUpdate(
        { title: movie.title },
        { releaseDate: movie.releaseDate, genres: movie.genre, trailerLink: req.body.trailerLink || null },
        { upsert: true, new: true } 
      );
    } else {
      //delete from upcoming if its in the past
      await UpcomingMovie.findOneAndDelete({ title: movie.title });
    }

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    await UpcomingMovie.findOneAndDelete({ title: movie.title });

    res.json({ message: 'Movie deleted' });
  } catch (error) {
    next(error);
  }
};

exports.getTopMoviesOfTheMonth = async (req, res, next) => {
  try {
    const startOfMonth = new Date(new Date().setDate(1)); 
    const movies = await Movie.find({ releaseDate: { $gte: startOfMonth } })
      .sort({ averageRating: -1, popularity: -1 })
      .limit(10);

    res.json(movies);
  } catch (error) {
    next(error);
  }
};

exports.getTopMoviesByGenre = async (req, res, next) => {
  const { genre } = req.query;

  try {
    if (!genre) {
      return res.status(400).json({ message: 'Genre is required' });
    }

    const movies = await Movie.find({ genre: genre })
      .sort({ averageRating: -1, popularity: -1 })
      .limit(10);

    res.json(movies);
  } catch (error) {
    next(error);
  }
};

exports.advancedSearchMovies = async (req, res, next) => {
  const { decade, country, language, keywords } = req.query;

  try {
    const query = {};

    if (decade) {
      const startYear = parseInt(decade);
      query.releaseDate = { $gte: new Date(`${startYear}-01-01`), $lt: new Date(`${startYear + 10}-01-01`) };
    }

    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }

    if (language) {
      query.language = { $regex: language, $options: 'i' };
    }

    if (keywords) {
      query.synopsis = { $regex: keywords, $options: 'i' };
    }

    const movies = await Movie.find(query).sort({ popularity: -1, averageRating: -1 });
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

exports.searchMovies = async (req, res, next) => {
  const { title, genre, director, actor, minRating, maxRating, minYear, maxYear, popularity } = req.query;

  try {
    const query = {};

    // FILTERS
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (genre) {
      query.genre = { $in: genre.split(',') }; 
    }

    if (director) {
      query.director = { $regex: director, $options: 'i' };
    }

    if (actor) {
      query.cast = { $regex: actor, $options: 'i' };
    }

    if (minRating || maxRating) {
      query.averageRating = {};
      if (minRating) query.averageRating.$gte = parseFloat(minRating);
      if (maxRating) query.averageRating.$lte = parseFloat(maxRating);
    }

    if (minYear || maxYear) {
      query.releaseDate = {};
      if (minYear) query.releaseDate.$gte = new Date(`${minYear}-01-01`);
      if (maxYear) query.releaseDate.$lte = new Date(`${maxYear}-12-31`);
    }

    if (popularity) {
      query.popularity = { $gte: parseInt(popularity) };
    }

    const movies = await Movie.find(query).sort({ popularity: -1, averageRating: -1 });

    res.json(movies);
  } catch (error) {
    next(error);
  }
};