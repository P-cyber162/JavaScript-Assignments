const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const inventoryRoutes = require('./routes/inventoryRoutes');

dotenv.config(); // load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // allows JSON body parsing

// Routes
app.use('/api/inventory', inventoryRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));
