const mongoose = require('mongoose')

const listItemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: String,
    amount: Number
})

const ListItem = mongoose.model('ListItem', listItemSchema)

module.exports = { ListItem }