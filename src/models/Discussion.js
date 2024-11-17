const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  relatedMovie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);
