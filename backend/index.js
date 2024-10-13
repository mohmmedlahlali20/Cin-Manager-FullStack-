const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config(); 
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());










connectDB()
.then(() => {
  console.log('MongoDB Connected...');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});



const authRoutes = require('./router/authRoutes');


app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
