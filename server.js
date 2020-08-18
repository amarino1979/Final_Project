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

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/markets';

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
mongoose.connection.once('open', () => {
    console.log('connected to mongoose')
})

////////// Middleware //////////////
app.use(express.json())

const allowedURLs = ['http://localhost:5000', 'https://market-updates-front.herokuapp.com'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedURLs.indexOf(origin) >= 0) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
////////// Controllers //////////////
const marketsController = require('./controllers/market_routes.js')
app.use('/markets', marketsController)

///////////// Listener ////////////////
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})