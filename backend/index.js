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

app.use(cors());





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
const favoriRoutes = require('./router/favorisRouters')
const reservationRoutes = require('./router/reservtionRoutes')
const raitingRoutes = require('./router/ratingRouter')

app.use('/api/auth', authRoutes);
app.use('/api/salle' , salleRoutes);
app.use('/api/film', filmRoutes);
app.use('/api/seance' , seanceRoutes)
app.use('/api/favoris' , favoriRoutes)
app.use('/api/reservtion' , reservationRoutes)

app.use('/api/rating', raitingRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
