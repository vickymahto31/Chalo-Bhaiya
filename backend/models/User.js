const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentId: { type: String }, // Useful for university verification
  phoneNumber: { type: String, default: '' },
  gender: { type: String, default: '' },
  dob: { type: String, default: '' },
  bookedRides: [{ 
    rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    bookedAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('User', UserSchema);