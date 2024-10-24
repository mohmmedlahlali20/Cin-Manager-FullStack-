const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuration de Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cinema API Documentation",  // Titre de votre documentation
      version: "1.0.0",                  // Version de l'API
      description: "Documentation de l'API pour Cinema APP nodejs/Express",
    },
    servers: [
      {
        url: "http://localhost:3000", 
        description: "Serveur local",
      },
    ],
  },
  apis: ["./router/*.js"],  
};

const swaggerSpec = swaggerJsdoc(options);


const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = { swaggerDocs };
