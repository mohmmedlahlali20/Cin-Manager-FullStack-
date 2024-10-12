const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config(); 
const app = express();

const port = process.env.PORT || 3000;
const authRoutes = require('./router/authRoutes');

connectDB()
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());




app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
