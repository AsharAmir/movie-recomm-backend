const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        // res.status(500).json({ error: error.message });
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
      const { name, preferences } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name, preferences }, //update name and pref
        { new: true }
      ).select('-password'); //exclude password
      res.json(user);
    } catch (error) {
      // res.status(400).json({ error: error.message });
      next(error);
    }
};
  
exports.getWishlist = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).populate('wishlist');
      res.json(user.wishlist);
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
};