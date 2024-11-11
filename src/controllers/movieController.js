const Movie = require('../models/Movie');

exports.getAllMovies = async(req, res) => {
    try{
        const movies = await Movie.find();
        res.json(movies);
    }catch(error){
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.getMovieById = async(req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(404).json({message: 'Movie not found'});
        }
        res.json(movie);
    }catch(error){
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.addMovie = async (req, res) => {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(201).json(movie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }); //new true returns the updated movie
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
  
exports.deleteMovie = async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) return res.status(404).json({ error: 'Movie not found' });
      res.json({ message: 'Movie deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};