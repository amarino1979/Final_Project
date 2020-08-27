const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency

const stocksSchema = mongoose.Schema({
    name: {type: String},
    symbol: {type: String, required: true},
})

module.exports = mongoose.model('Stocks', stocksSchema)