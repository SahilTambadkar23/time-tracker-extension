require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const trackingRoutes = require('./routes/tracking');
const cors = require('cors');

db();

app.use(cors());
app.use(express.json());
app.use('/api/track', trackingRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
