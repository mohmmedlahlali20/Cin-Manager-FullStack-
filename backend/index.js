const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config(); // Charge les variables d'environnement
const app = express();

const port = process.env.PORT || 3000;

// Connexion à la base de données
connectDB()
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
