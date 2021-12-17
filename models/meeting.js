const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema({
  ud1: {
    type: String,
    required: true
  },
  ud2: {
    type: String,
    required: true
  },
  meetingDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Meeting', meetingSchema)