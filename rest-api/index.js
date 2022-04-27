const express = require('express');
const app = express();

const cors = require('cors');
const coordRoutes = require('./routes/Coord');

const PORT = process.env.PORT || 8080;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:user123@cluster1.gle5k.mongodb.net/location', () => console.log('connected to db'));

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v/coord', coordRoutes);

app.get('/', (req, res) => {
    res.send('Base route');
});
app.get('/api/v', (req, res) => {
    res.send('Welcome to API');
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));