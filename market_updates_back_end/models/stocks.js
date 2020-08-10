const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency

const stocksSchema = mongoose.Schema({
    symbol: {type: String, required: true},
    open: {type: Currency, default: 0},
    high: {type: Currency, default: 0},
    low: {type: Currency, default: 0},
    price: {type: Currency},
    volume: {type: Number, default: 0},
    latest_trading_day: {type: Date },
    previous_close: {type: Currency},
    change: {type: Number, default: 0},
    change_percent: {type: Number, default: 0},

})

module.exports = mongoose.model('Stocks', stocksSchema)