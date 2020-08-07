const express = require('express')
const markets = express.Router()

markets.get('/', (req, res) => {
    res.send('market update!')
})

module.exports = markets