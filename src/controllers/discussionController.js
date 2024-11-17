const Discussion = require('../models/Discussion');


exports.createDiscussion = async (req, res, next) => {
  const { topic, relatedMovie } = req.body;

  try {
    const discussion = new Discussion({
      topic,
      relatedMovie,
      createdBy: req.user._id,
    });

    await discussion.save();
    res.status(201).json({ message: 'Discussion created', discussion });
  } catch (error) {
    next(error);
  }
};


exports.addComment = async (req, res, next) => {
  const { text } = req.body;

  try {
    const discussion = await Discussion.findById(req.params.discussionId);
    if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

    discussion.comments.push({ user: req.user._id, text });
    await discussion.save();

    res.json({ message: 'Comment added', discussion });
  } catch (error) {
    next(error);
  }
};
