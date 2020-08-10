const express = require('express')
const markets = express.Router()
const Stocks = require('../models/stocks.js')

markets.get('/', (req, res) => {
    res.send('market update!')
})

// Create Route
markets.post('/', async (req, res) => {
    Stocks.create(req.body, (error, createdStock) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdStock)
    })
})


module.exports = markets