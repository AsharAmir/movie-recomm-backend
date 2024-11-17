/**
 * @swagger
 * tags:
 *   name: Discussions
 *   description: Endpoints related to user discussions and comments on movies
 */

const express = require('express');
const { createDiscussion, addComment } = require('../controllers/discussionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/discussions:
 *   post:
 *     summary: Create a new discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 example: "Best Sci-Fi Movies of the Year"
 *               relatedMovie:
 *                 type: string
 *                 example: "673621fb0ec0a7465053bfef"
 *     responses:
 *       201:
 *         description: Discussion created successfully
 *       400:
 *         description: Validation error or missing fields
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, createDiscussion);

/**
 * @swagger
 * /api/discussions/{discussionId}/comment:
 *   post:
 *     summary: Add a comment to a discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the discussion to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "I totally agree, this movie was amazing!"
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Validation error or missing fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Discussion not found
 */
router.post('/:discussionId/comment', authMiddleware, addComment);

module.exports = router;
