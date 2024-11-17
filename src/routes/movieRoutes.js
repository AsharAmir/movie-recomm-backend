/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Endpoints related to movie operations
 */

const express = require('express');
const {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  advancedSearchMovies,
  getTopMoviesOfTheMonth,
  getTopMoviesByGenre,
} = require('../controllers/movieController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     summary: Search for movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of movies matching criteria
 */
router.get('/search', searchMovies);

/**
 * @swagger
 * /api/movies/advanced-search:
 *   get:
 *     summary: Perform advanced search for movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: decade
 *         schema:
 *           type: number
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Advanced search results
 */
router.get('/advanced-search', advancedSearchMovies);

/**
 * @swagger
 * /api/movies/top-of-the-month:
 *   get:
 *     summary: Get top movies of the month
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Top movies
 */
router.get('/top-of-the-month', getTopMoviesOfTheMonth);

/**
 * @swagger
 * /api/movies/top-by-genre:
 *   get:
 *     summary: Get top 10 movies by genre
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Top movies by genre
 */
router.get('/top-by-genre', getTopMoviesByGenre);


/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   genre:
 *                     type: array
 *                     items:
 *                       type: string
 *                   releaseDate:
 *                     type: string
 *                     format: date
 */
router.get('/', getAllMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie data
 *       404:
 *         description: Movie not found
 */
router.get('/:id', getMovieById);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               synopsis:
 *                 type: string
 *               director:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, addMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, deleteMovie);


module.exports = router;
