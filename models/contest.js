const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  firstName: {
    type: String
  }, lastName: {
    type: String
  }, age: {
    type: Number
  },
  email: {
    type: String,
    unique:true
  },
  phone: {
    type: String,
    unique:true
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'title'
  }
});

const contest = mongoose.model('contest', contestSchema);

module.exports = { contest }