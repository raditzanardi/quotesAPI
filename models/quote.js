const mongoose = require('mongoose')

const quoteSchema = mongoose.Schema({
    quote : {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('quote', quoteSchema)