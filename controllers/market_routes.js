const express = require('express')
const markets = express.Router()
const Stocks = require('../models/stocks.js')

markets.get('/market', (req, res) => {
    console.log('ENV:', process.env)
    const api_keys = {
        firstKey: process.env.REACT_APP_MARKET_FRONT_END_API_KEY,
        secondKey: process.env.REACT_APP_SECOND_API_KEY
    }
    res.send(api_keys)
})

// Create Route
markets.post('/newStock', async (req, res) => {
    // console.log(req)
    Stocks.create(req.body, (error, createdStock) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdStock)
    })
})
// Index Route
markets.get('/stocks', (req, res) => {
    Stocks.find({}, (err, foundStocks) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundStocks)
    })
})

// Delete Route
markets.delete('/:id', (req, res) => {
    Stocks.findByIdAndRemove(req.params.id, (err, deletedStock) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(deletedStock)
    })
})

// Update Route
markets.put('/:id', (req, res) => {
    Stocks.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedStock) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.send(200).json({updatedStock})
    })
})

module.exports = markets