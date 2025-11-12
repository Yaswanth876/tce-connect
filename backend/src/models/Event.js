const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  venue: { type: String, default: 'TBA' },
  department: { type: String, default: 'General' },
  type: { 
    type: String, 
    enum: ['technical', 'cultural', 'sports'], 
    default: 'technical' 
  },
  registrationLink: { type: String }, // Google Form link for event registration
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
