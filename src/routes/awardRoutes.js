/**
 * @swagger
 * tags:
 *   name: Awards
 *   description: Endpoints related to awards and nominations for movies or actors
 */

const express = require('express');
const { getAwards } = require('../controllers/awardController');

const router = express.Router();

/**
 * @swagger
 * /api/awards:
 *   get:
 *     summary: Get a list of awards and nominations
 *     tags: [Awards]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *         description: Filter awards by year
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter awards by category (e.g., Best Picture)
 *       - in: query
 *         name: recipient
 *         schema:
 *           type: string
 *         description: Filter awards by recipient name (e.g., movie or actor name)
 *     responses:
 *       200:
 *         description: List of awards and nominations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   recipient:
 *                     type: string
 *                     example: "The Action Hero"
 *                   awardTitle:
 *                     type: string
 *                     example: "Best Picture"
 *                   organization:
 *                     type: string
 *                     example: "Oscars"
 *                   year:
 *                     type: number
 *                     example: 2024
 *                   category:
 *                     type: string
 *                     example: "Drama"
 *       404:
 *         description: No awards found
 */
router.get('/', getAwards);

module.exports = router;
