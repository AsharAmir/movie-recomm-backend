const User = require('../models/User');
const bycrypt = require('bcryptjs');
const {generateToken} = require('../config/jwtConfig');

exports.register = async (req, res) => {
    const{name, email, password} = req.body;
    try{
        const user = new User({name, email, password});
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid login credentials');
      }
      res.json({ token: generateToken(user._id), user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };