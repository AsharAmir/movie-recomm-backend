const Article = require('../models/Article');

exports.createArticle = async (req, res, next) => {
  const { title, content, category, relatedMovies } = req.body;

  try {
    const article = new Article({
      title,
      content,
      category,
      relatedMovies,
      createdBy: req.user._id,
    });

    await article.save();
    res.status(201).json({ message: 'Article created successfully', article });
  } catch (error) {
    next(error);
  }
};

exports.getArticlesByCategory = async (req, res, next) => {
  const { category } = req.query;

  try {
    const articles = await Article.find(category ? { category } : {}).sort({ publishedAt: -1 });
    res.json(articles);
  } catch (error) {
    next(error);
  }
};
