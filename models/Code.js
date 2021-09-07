const mongoose = require('mongoose')

const codeSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Code', codeSchema)