const express = require('express')
const app = express()
const PORT = 3000





const marketsController = require('./controllers/market_routes.js')
app.use('/markets', marketsController)

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})