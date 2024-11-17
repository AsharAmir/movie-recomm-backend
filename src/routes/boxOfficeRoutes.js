/**
 * @swagger
 * tags:
 *   name: Box Office
 *   description: Endpoints related to box office details for movies
 */

const express = require('express');
const { getBoxOffice } = require('../controllers/boxOfficeController');

const router = express.Router();

/**
 * @swagger
 * /api/box-office/{movieId}:
 *   get:
 *     summary: Get box office details for a specific movie
 *     tags: [Box Office]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to fetch box office details for
 *     responses:
 *       200:
 *         description: Box office details for the specified movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                 openingWeekendEarnings:
 *                   type: number
 *                   example: 50000000
 *                 totalEarnings:
 *                   type: number
 *                   example: 200000000
 *                 internationalEarnings:
 *                   type: number
 *                   example: 120000000
 *       404:
 *         description: Movie or box office data not found
 */
router.get('/:movieId', getBoxOffice);

module.exports = router;
