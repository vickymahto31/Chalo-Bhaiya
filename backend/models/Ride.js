const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupLocation: { type: String, required: true }, // e.g., "Marwadi University Gate"
  dropoffLocation: { type: String, required: true }, // e.g., "Rajkot Bus Stand"
  departureTime: { type: Date, required: true },
  availableSeats: { type: Number, default: 3 },
  pricePerSeat: { type: Number, required: true, default: 0 },
  status: { type: String, default: 'Open' }, // Open, Full, Completed
  womenOnly: { type: Boolean, default: false }
});

module.exports = mongoose.model('Ride', RideSchema);