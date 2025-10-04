const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

// CREATE: add new inventory item
router.post('/', async (req, res) => {
    try {
        const newItem = new Inventory(req.body); // data from client
        const savedItem = await newItem.save();  // save to MongoDB
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ: get all inventory items
router.get('/', async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ: get one item by id
router.get('/:id', async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE: update an item by id
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );
        if (!updatedItem) return res.status(404).json({ error: "Item not found" });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: remove an item by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: "Item not found" });
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
