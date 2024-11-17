/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrative endpoints for managing the platform
 */

const express = require('express');
const { getSiteStatistics, moderateReviews } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/admin/statistics:
 *   get:
 *     summary: Get site statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Site statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                   example: 1000
 *                 totalMovies:
 *                   type: number
 *                   example: 500
 *                 totalReviews:
 *                   type: number
 *                   example: 2000
 *                 trendingGenres:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Action", "Comedy"]
 *       401:
 *         description: Unauthorized
 */
router.get('/statistics', authMiddleware, getSiteStatistics);

/**
 * @swagger
 * /api/admin/moderate-reviews:
 *   get:
 *     summary: Get reviews pending moderation
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reviews pending moderation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   movie:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                   review:
 *                     type: string
 *                     example: "This is an inappropriate review."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get('/moderate-reviews', authMiddleware, moderateReviews);

module.exports = router;
