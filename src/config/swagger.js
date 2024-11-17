const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Recommendation System API',
      version: '1.0.0',
      description: 'API documentation for the Movie Recommendation System',
      contact: {
        name: 'Ashhar Amir',
        email: 'ashharamir@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional: specify that this is a JWT token
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply this globally to all endpoints
      },
    ],
  },
  apis: ['./routes/*.js'], // Update path as needed
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
