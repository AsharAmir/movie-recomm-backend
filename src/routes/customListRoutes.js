/**
 * @swagger
 * tags:
 *   name: Custom Lists
 *   description: Endpoints related to user-created custom movie lists
 */

const express = require('express');
const {
  createList,
  getUserLists,
  followList,
  unfollowList,
  getPublicLists,
} = require('../controllers/customListController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/lists:
 *   post:
 *     summary: Create a new custom list
 *     tags: [Custom Lists]
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
 *                 example: "Top Sci-Fi Movies"
 *               description:
 *                 type: string
 *                 example: "A collection of the best sci-fi movies."
 *               movies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["673621fb0ec0a7465053bfef", "673622010ec0a7465053bff2"]
 *     responses:
 *       201:
 *         description: Custom list created successfully
 *       400:
 *         description: Validation error or missing fields
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, createList);

/**
 * @swagger
 * /api/lists/my-lists:
 *   get:
 *     summary: Get the logged-in user's custom lists
 *     tags: [Custom Lists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's custom lists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   movies:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                   followers:
 *                     type: array
 *                     items:
 *                       type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/my-lists', authMiddleware, getUserLists);

/**
 * @swagger
 * /api/lists/public:
 *   get:
 *     summary: Get public custom lists
 *     tags: [Custom Lists]
 *     responses:
 *       200:
 *         description: List of public custom lists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   movies:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                   followers:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/public', getPublicLists);

/**
 * @swagger
 * /api/lists/{listId}/follow:
 *   post:
 *     summary: Follow a custom list
 *     tags: [Custom Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the custom list to follow
 *     responses:
 *       200:
 *         description: Successfully followed the list
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: List not found
 */
router.post('/:listId/follow', authMiddleware, followList);

/**
 * @swagger
 * /api/lists/{listId}/unfollow:
 *   post:
 *     summary: Unfollow a custom list
 *     tags: [Custom Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the custom list to unfollow
 *     responses:
 *       200:
 *         description: Successfully unfollowed the list
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: List not found
 */
router.post('/:listId/unfollow', authMiddleware, unfollowList);

module.exports = router;
