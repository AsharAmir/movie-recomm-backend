/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Endpoints related to news and articles about movies and the film industry
 */

const express = require('express');
const { createArticle, getArticlesByCategory } = require('../controllers/articleController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
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
 *                 example: "The Evolution of Sci-Fi Movies"
 *               content:
 *                 type: string
 *                 example: "Sci-fi movies have come a long way since the 1950s..."
 *               category:
 *                 type: string
 *                 example: "Movies"
 *               relatedMovies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["673621fb0ec0a7465053bfef"]
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Validation error or missing fields
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, createArticle);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get articles by category
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter articles by category (e.g., Movies, Industry)
 *     responses:
 *       200:
 *         description: List of articles
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
 *                   content:
 *                     type: string
 *                   category:
 *                     type: string
 *                     example: "Movies"
 *                   relatedMovies:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                   publishedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No articles found
 */
router.get('/', getArticlesByCategory);

module.exports = router;
