const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const path = require('path');
const dotenv = require('dotenv');


dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));





connectDB()
.then(() => {
  console.log('MongoDB Connected...');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const authRoutes = require('./router/authRoutes');
const salleRoutes = require('./router/salleRoutes');
const filmRoutes = require('./router/filmRouters')
const seanceRoutes = require('./router/seanceRoutes')

app.use('/api/auth', authRoutes);
app.use('/api/salle' , salleRoutes);
app.use('/api/film', filmRoutes);
app.use('/api/seance' , seanceRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
