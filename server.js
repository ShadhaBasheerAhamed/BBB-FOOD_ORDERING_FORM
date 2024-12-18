const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(
  'mongodb+srv://shadha2021:1ZiE3Oif9KgEEDM2@foodorderform.vwmch.mongodb.net/',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema Definition
const foodSchema = new mongoose.Schema({
    foodId: { type: Number, required: true },
    foodName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
});

const Food = mongoose.model('Food', foodSchema);

// Counter for Food ID
let foodCounter = 1000; // Default
Food.findOne({})
    .sort({ foodId: -1 })
    .then((lastFood) => {
        if (lastFood) foodCounter = lastFood.foodId + 1;
    })
    .catch((err) => console.error('Error initializing foodCounter:', err));

// GET route for the root URL ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST route to save food details
app.post('/submit', async (req, res) => {
    console.log('Request Body:', req.body); // Debug log
    try {
        const foodData = new Food({
            foodId: foodCounter++,
            foodName: req.body.food_name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description
        });

        await foodData.save();
        console.log('Food saved:', foodData);

        res.status(200).json({ message: 'Food saved successfully', foodData });
    } catch (err) {
        console.error('Error saving food:', err);
        res.status(500).json({ error: 'Failed to save food' });
    }
});

// Start Server
app.listen(port, () => {
    console.log('Server running at http://localhost:${port}');
});