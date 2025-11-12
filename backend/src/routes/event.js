const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { authMiddleware, isEventOwner } = require('../middleware/auth');
const { validateEvent, validateEventId } = require('../middleware/validation');

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('organizer participants');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new event (protected)
router.post('/', authMiddleware, validateEvent, async (req, res) => {
  try {
    const { title, description, date, venue, department, type, registrationLink } = req.body;
    const organizer = req.user.userId;
    const event = new Event({ 
      title, 
      description, 
      date, 
      venue: venue || 'TBA',
      department: department || 'General',
      type: type || 'technical',
      registrationLink: registrationLink || '',
      organizer 
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single event by ID (public)
router.get('/:id', validateEventId, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer participants');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update event (protected - organizer only)
router.put('/:id', authMiddleware, validateEventId, validateEvent, isEventOwner, async (req, res) => {
  try {
    const { title, description, date, venue, department, type, registrationLink } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, venue, department, type, registrationLink },
      { new: true, runValidators: true }
    ).populate('organizer participants');
    
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete event (protected - organizer only)
router.delete('/:id', authMiddleware, validateEventId, isEventOwner, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register for event (protected)
router.post('/:id/register', authMiddleware, validateEventId, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    
    // Check if user is already registered
    if (event.participants.includes(req.user.userId)) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }
    
    event.participants.push(req.user.userId);
    await event.save();
    
    const updatedEvent = await Event.findById(req.params.id).populate('organizer participants');
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel registration (protected)
router.delete('/:id/register', authMiddleware, validateEventId, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    
    // Check if user is registered
    if (!event.participants.includes(req.user.userId)) {
      return res.status(400).json({ error: 'Not registered for this event' });
    }
    
    event.participants = event.participants.filter(
      participantId => participantId.toString() !== req.user.userId
    );
    await event.save();
    
    const updatedEvent = await Event.findById(req.params.id).populate('organizer participants');
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
