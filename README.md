# Movie Recommendation System API

A backend system for browsing, rating, and reviewing movies, featuring personalized recommendations, trending lists, and movie industry updates.

## Features

- **Authentication**: JWT-based user authentication.
- **Movie Management**: Admin controls for adding/updating movies.
- **Reviews and Ratings**: Users can rate and review movies.
- **Recommendations**: Personalized and similar movie suggestions.
- **Custom Lists**: Users can create, share, and follow movie lists.
- **Search and Filter**: Advanced filtering and search.
- **Notifications**: Email alerts for upcoming movies.
- **Community**: Discussion boards for movie discussions.

## Technologies

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Swagger** for API documentation

## Project Structure

```
assignment3
├─ backend
│  ├─ api.http
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ src
│  │  ├─ .env
│  │  ├─ app.js
│  │  ├─ config
│  │  │  ├─ db.js
│  │  │  ├─ jwtConfig.js
│  │  │  └─ swagger.js
│  │  ├─ controllers
│  │  │  ├─ adminController.js
│  │  │  ├─ articleController.js
│  │  │  ├─ authController.js
│  │  │  ├─ awardController.js
│  │  │  ├─ boxOfficeController.js
│  │  │  ├─ customListController.js
│  │  │  ├─ discussionController.js
│  │  │  ├─ movieController.js
│  │  │  ├─ notificationController.js
│  │  │  ├─ recommendationController.js
│  │  │  ├─ reviewController.js
│  │  │  ├─ upcomingController.js
│  │  │  └─ userController.js
│  │  ├─ middlewares
│  │  │  ├─ authMiddleware.js
│  │  │  └─ errorMiddleware.js
│  │  ├─ models
│  │  │  ├─ Article.js
│  │  │  ├─ Award.js
│  │  │  ├─ BoxOffice.js
│  │  │  ├─ CustomList.js
│  │  │  ├─ Discussion.js
│  │  │  ├─ List.js
│  │  │  ├─ Movie.js
│  │  │  ├─ Review.js
│  │  │  ├─ UpcomingMovie.js
│  │  │  └─ User.js
│  │  ├─ routes
│  │  │  ├─ adminRoutes.js
│  │  │  ├─ articleRoutes.js
│  │  │  ├─ authRoutes.js
│  │  │  ├─ awardRoutes.js
│  │  │  ├─ boxOfficeRoutes.js
│  │  │  ├─ customListRoutes.js
│  │  │  ├─ discussionRoutes.js
│  │  │  ├─ movieRoutes.js
│  │  │  ├─ notificationRoutes.js
│  │  │  ├─ recommendationRoutes.js
│  │  │  ├─ reviewRoutes.js
│  │  │  ├─ upcomingMovieRoutes.js
│  │  │  └─ userRoutes.js
│  │  ├─ server.js
│  │  ├─ services
│  │  │  ├─ emailService.js
│  │  │  └─ recommendationService.js
│  │  └─ utils
│  │     ├─ logger.js
│  │     └─ validator.js
│  └─ swagger
│     └─ swagger.json
└─ README.md
```

## Getting Started

### Prerequisites

- **Node.js**, **npm**, and **MongoDB** installed.

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/movie-recommendation-system.git
   cd movie-recommendation-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup environment variables:

   Create a `.env` file in the `src` directory and add the necessary environment variables.

4. Start the server:

   ```bash
   npm start
   ```
