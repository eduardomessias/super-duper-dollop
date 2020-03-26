const mongoose = require ('mongoose')

const estimative = new mongoose.Schema({
    ref: String,
    approach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'approach'
    },
    accuracy: Number
})

const approach = new mongoose.Schema({
    name: String,
    category: String
})

module.exports = mongoose.model ('estimative', estimative)
module.exports = mongoose.model ('approach', approach)