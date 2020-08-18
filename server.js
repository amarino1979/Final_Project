////////// Dependencies /////////////
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
//const fetch = require(node-fetch)
const app = express()
const PORT = process.env.PORT || 5000



////////// Error / Disconnection /////////////
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ `YOUR DATABASE NAME`;

mongoose.connect('mongodb://localhost:27017/markets', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
mongoose.connection.once('open', () => {
    console.log('connected to mongoose')
})

////////// Middleware //////////////
app.use(express.json())
app.use(cors())
////////// Controllers //////////////
const marketsController = require('./controllers/market_routes.js')
app.use('/markets', marketsController)

///////////// Listener ////////////////
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})