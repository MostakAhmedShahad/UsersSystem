const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  dateofbirth: {
    type: Date,
    required: true
  },
  city: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  email: {
    type: String,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
