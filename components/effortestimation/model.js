const mongoose = require ('mongoose')

const effortestimation = new mongoose.Schema({
  ref: String,
  approach: String,
  category: String,
  accuracy: Number
})

module.exports = mongoose.model ('effortestimation', effortestimation)