////////// Dependencies /////////////
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000


////////// Error / Disconnection /////////////
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connect('mongodb://localhost:27017/markets', { useNewUrlParser: true,
useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('connected ot mongoose')
})

////////// Middleware //////////////
app.use(express.json())

////////// Controllers //////////////
const marketsController = require('./controllers/market_routes.js')
app.use('/markets', marketsController)

///////////// Listener ////////////////
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})