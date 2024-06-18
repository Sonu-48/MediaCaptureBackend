const mongoose = require('mongoose');

// create a file Schema
const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now },
  url: String,
});

// Create a collection
const File = mongoose.model('File', fileSchema);

module.exports = File;
