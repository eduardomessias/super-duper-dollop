const mongoose = require ('mongoose')

const estimative = new mongoose.Schema({
    summary: String,
    method: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'method'
    }
})

const method = new mongoose.Schema({
    name: String,
    
})

module.exports = mongoose.model ('estimative', estimative)