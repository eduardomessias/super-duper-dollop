const mongoose = require('mongoose')

const document = new mongoose.Schema({
  title: String
}); 

module.exports = mongoose.model('document', document);