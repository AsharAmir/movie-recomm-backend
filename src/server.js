const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection
require('dotenv').config(); // Load environment variables
// const cors = require('cors');
// const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');

// Importing routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const upcomingMovieRoutes = require('./routes/upcomingMovieRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const articleRoutes = require('./routes/articleRoutes');
const boxOfficeRoutes = require('./routes/boxOfficeRoutes');
const awardRoutes = require('./routes/awardRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const customListRoutes = require('./routes/customListRoutes');

// Error handling middleware
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Validate environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('Missing required environment variables. Ensure MONGO_URI and JWT_SECRET are set.');
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Middleware
// app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
// app.use(morgan('dev')); // Log HTTP requests in development mode

// Root endpoint for health check
app.get('/', (req, res) => {
  res.send('Movie Recommendation System API is running');
});

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upcoming', upcomingMovieRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/lists', customListRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/box-office', boxOfficeRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/discussions', discussionRoutes);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
