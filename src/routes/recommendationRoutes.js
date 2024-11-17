/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Endpoints related to personalized and general movie recommendations
 */

const express = require('express');
const {
  getRecommendations,
  getSimilarTitles,
  getTrendingMovies,
  getTopRatedMovies,
} = require('../controllers/recommendationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/recommendations/personalized:
 *   get:
 *     summary: Get personalized movie recommendations for the logged-in user
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of personalized movie recommendations
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
 *                   director:
 *                     type: string
 *                   averageRating:
 *                     type: number
 *                     example: 4.5
 *       401:
 *         description: Unauthorized
 */
router.get('/personalized', authMiddleware, getRecommendations);

/**
 * @swagger
 * /api/recommendations/{movieId}/similar:
 *   get:
 *     summary: Get similar titles to a specific movie
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to find similar titles for
 *     responses:
 *       200:
 *         description: List of similar movies
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
 *       404:
 *         description: Movie not found
 */
router.get('/:movieId/similar', getSimilarTitles);

/**
 * @swagger
 * /api/recommendations/trending:
 *   get:
 *     summary: Get a list of trending movies
 *     tags: [Recommendations]
 *     responses:
 *       200:
 *         description: List of trending movies
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
 *                   averageRating:
 *                     type: number
 *                     example: 4.7
 */
router.get('/trending', getTrendingMovies);

/**
 * @swagger
 * /api/recommendations/top-rated:
 *   get:
 *     summary: Get a list of top-rated movies
 *     tags: [Recommendations]
 *     responses:
 *       200:
 *         description: List of top-rated movies
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
 *                   averageRating:
 *                     type: number
 *                     example: 4.9
 */
router.get('/top-rated', getTopRatedMovies);

module.exports = router;
