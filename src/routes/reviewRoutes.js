/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Endpoints related to movie reviews
 */

const express = require('express');
const {
  addOrUpdateReview,
  getReviewsForMovie,
  getReviewHighlights,
} = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Add or update a review for a movie
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *                 example: 673621fb0ec0a7465053bfef
 *               rating:
 *                 type: number
 *                 example: 4
 *               review:
 *                 type: string
 *                 example: "Great movie with stunning visuals!"
 *     responses:
 *       201:
 *         description: Review added or updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 */
router.post('/', authMiddleware, addOrUpdateReview);

/**
 * @swagger
 * /api/reviews/{movieId}:
 *   get:
 *     summary: Get all reviews for a specific movie
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to fetch reviews for
 *     responses:
 *       200:
 *         description: List of reviews for the specified movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   review:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Movie not found
 */
router.get('/:movieId', getReviewsForMovie);

/**
 * @swagger
 * /api/reviews/{movieId}/highlights:
 *   get:
 *     summary: Get review highlights for a movie
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to fetch review highlights for
 *     responses:
 *       200:
 *         description: Review highlights for the specified movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topReviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       review:
 *                         type: string
 *                       rating:
 *                         type: number
 *                 averageRating:
 *                   type: number
 *                   example: 4.5
 *       404:
 *         description: Movie not found
 */
router.get('/:movieId/highlights', getReviewHighlights);

module.exports = router;
