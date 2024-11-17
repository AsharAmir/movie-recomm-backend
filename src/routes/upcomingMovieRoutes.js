/**
 * @swagger
 * tags:
 *   name: Upcoming Movies
 *   description: Endpoints related to upcoming movies and reminders
 */

const express = require('express');
const {
  subscribeToReminder,
  getUpcomingMovies,
  addUpcomingMovie,
} = require('../controllers/upcomingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/upcoming:
 *   get:
 *     summary: Get a list of all upcoming movies
 *     tags: [Upcoming Movies]
 *     responses:
 *       200:
 *         description: List of upcoming movies
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
 *                   trailerLink:
 *                     type: string
 *                     example: https://youtube.com/example-trailer
 */
router.get('/', getUpcomingMovies);

/**
 * @swagger
 * /api/upcoming/add:
 *   post:
 *     summary: Add a new upcoming movie
 *     tags: [Upcoming Movies]
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
 *                 example: The Next Big Thing
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Action", "Thriller"]
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-12-25
 *               trailerLink:
 *                 type: string
 *                 example: https://youtube.com/example-trailer
 *     responses:
 *       201:
 *         description: Upcoming movie added successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/add', authMiddleware, addUpcomingMovie);

/**
 * @swagger
 * /api/upcoming/{movieId}/subscribe:
 *   post:
 *     summary: Subscribe to reminders for an upcoming movie
 *     tags: [Upcoming Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to subscribe to
 *     responses:
 *       200:
 *         description: Subscription successful
 *       404:
 *         description: Movie not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:movieId/subscribe', authMiddleware, subscribeToReminder);

module.exports = router;
