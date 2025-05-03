const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  domain: String,
  duration: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', TrackSchema);

