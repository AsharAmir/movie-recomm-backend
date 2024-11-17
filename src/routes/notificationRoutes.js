/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Endpoints related to sending notifications to users
 */

const express = require('express');
const { sendNotification, sendBulkNotifications } = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/notifications/send:
 *   post:
 *     summary: Send a notification to a specific user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 67399cffd350e0a7782ae7b0
 *               subject:
 *                 type: string
 *                 example: "Upcoming Movie Reminder"
 *               message:
 *                 type: string
 *                 example: "Don't miss 'The Action Hero' releasing on February 1, 2024."
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       400:
 *         description: Validation error or missing fields
 *       401:
 *         description: Unauthorized
 */
router.post('/send', authMiddleware, sendNotification);

/**
 * @swagger
 * /api/notifications/send-bulk:
 *   post:
 *     summary: Send bulk notifications to multiple users
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["67399cffd350e0a7782ae7b0", "67399cffd350e0a7782ae7b1"]
 *               subject:
 *                 type: string
 *                 example: "Upcoming Movies Alert"
 *               message:
 *                 type: string
 *                 example: "Check out the latest upcoming movies!"
 *     responses:
 *       200:
 *         description: Bulk notifications sent successfully
 *       400:
 *         description: Validation error or missing fields
 *       401:
 *         description: Unauthorized
 */
router.post('/send-bulk', authMiddleware, sendBulkNotifications);

module.exports = router;
