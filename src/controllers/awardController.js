const Award = require('../models/Award');

exports.getAwards = async (req, res, next) => {
  const { year, category } = req.query;

  try {
    const query = {};
    if (year) query.year = year;
    if (category) query.category = category;

    const awards = await Award.find(query);
    res.json(awards);
  } catch (error) {
    next(error);
  }
};
