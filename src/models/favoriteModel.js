const mongoose = require('mongoose')

const favSchema = new mongoose.Schema({
    byUser: {type: mongoose.Types.ObjectId, ref: "users"},
    byProduct: {type: mongoose.Types.ObjectId, ref: 'products'},
    createdDate: {type: Date, default: Date.now}
})

const favoriteModel = new mongoose.model('favorites', favSchema)
module.exports = favoriteModel