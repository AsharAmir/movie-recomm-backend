const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

//importing routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const upcomingMovieRoutes = require('./routes/upcomingMovieRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

connectDB();

app.use(express.json());


//app routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upcoming', upcomingMovieRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
