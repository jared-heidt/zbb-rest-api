const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: 'This field is required'
  },
  artist: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  peak: {
    type: Number,
    required: false
  },
  sales: {
    type: Number,
    required: false
  } ,
  certification: {
      type: String,
      required: false
  },
  image: {
      type: String,
      required: true
  }
});

albumSchema.index({ "$**" : 'text' });
module.exports = mongoose.model('Album', albumSchema);