const { sendEmail } = require('../services/emailService');
const User = require('../models/User'); 


exports.sendNotification = async (req, res, next) => {
  const { userId, subject, message } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await sendEmail(user.email, subject, message);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    next(error);
  }
};


exports.sendBulkNotifications = async (req, res, next) => {
  const { subject, message } = req.body;

  try {
    const users = await User.find(); 
    for (const user of users) {
      await sendEmail(user.email, subject, message);
    }

    res.status(200).json({ message: 'Bulk notifications have been sent successfully' });
  } catch (error) {
    next(error);
  }
};
