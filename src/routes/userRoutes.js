/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints related to user operations
 */

const express = require('express');
const { getProfile, updateProfile, getWishlist } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 67399cffd350e0a7782ae7b0
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 preferences:
 *                   type: object
 *                   properties:
 *                     genres:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Action", "Thriller"]
 *                     favoriteActors:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Actor A", "Actor B"]
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe Updated
 *               preferences:
 *                 type: object
 *                 properties:
 *                   genres:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Drama", "Science Fiction"]
 *                   favoriteActors:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Actor X", "Actor Y"]
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/profile', authMiddleware, updateProfile);

/**
 * @swagger
 * /api/users/wishlist:
 *   get:
 *     summary: Get the logged-in user's wishlist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 673621fb0ec0a7465053bfef
 *                   title:
 *                     type: string
 *                     example: The Action Hero
 *                   genre:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Action", "Adventure"]
 *       401:
 *         description: Unauthorized
 */
router.get('/wishlist', authMiddleware, getWishlist);

module.exports = router;
