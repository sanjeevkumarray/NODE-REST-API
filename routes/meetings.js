const express = require('express')
const router = express.Router()
const Meeting = require('../models/meeting')

// Getting all
router.get('/', async (req, res) => {
  try {
    const meetings = await Meeting.find()
    res.json(meetings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getMeeting, (req, res) => {
  res.json(res.meeting)
})

// Creating one
router.post('/', async (req, res) => {
  const meeting = new Meeting({
    ud1: req.body.ud1,
    ud2: req.body.ud2,
    meetingDate: req.body.meetingDate
  
  })
  try {
    const newMeeting = await meeting.save()
    res.status(201).json(newMeeting)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getMeeting, async (req, res) => {
  if (req.body.name != null) {
    res.meeting.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedMeeting = await res.meeting.save()
    res.json(updatedMeeting)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getMeeting, async (req, res) => {
  try {
    await res.meeting.remove()
    res.json({ message: 'Deleted Meetings' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getMeeting(req, res, next) {
  let meeting
  try {
    meeting = await User.findById(req.params.id)
    if (meeting == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.meeting = meeting
  next()
}

module.exports = router