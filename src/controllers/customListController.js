const CustomList = require('../models/CustomList');
const Movie = require('../models/Movie');

exports.createList = async (req, res, next) => {
  const { name, description, movies } = req.body;

  try {
    const list = new CustomList({
      name,
      description,
      movies,
      createdBy: req.user._id,
    });

    await list.save();
    res.status(201).json({ message: 'List created successfully', list });
  } catch (error) {
    next(error);
  }
};


exports.getUserLists = async (req, res, next) => {
  try {
    const lists = await CustomList.find({ createdBy: req.user._id }).populate('movies', 'title genre');
    res.json(lists);
  } catch (error) {
    next(error);
  }
};


exports.followList = async (req, res, next) => {
  const { listId } = req.params;

  try {
    const list = await CustomList.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    if (!list.followers.includes(req.user._id)) {
      list.followers.push(req.user._id);
      await list.save();
    }

    res.json({ message: 'You are now following this list' });
  } catch (error) {
    next(error);
  }
};


exports.unfollowList = async (req, res, next) => {
  const { listId } = req.params;

  try {
    const list = await CustomList.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    list.followers = list.followers.filter((follower) => !follower.equals(req.user._id));
    await list.save();

    res.json({ message: 'You have unfollowed this list' });
  } catch (error) {
    next(error);
  }
};


exports.getPublicLists = async (req, res, next) => {
  try {
    const lists = await CustomList.find()
      .populate('createdBy', 'name')
      .populate('movies', 'title genre')
      .sort({ followers: -1 }); // Sort by popularity

    res.json(lists);
  } catch (error) {
    next(error);
  }
};
