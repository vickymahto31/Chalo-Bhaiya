const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Ride = require('../models/Ride');

// GET /api/rides
// Fetch all active rides
router.get('/', async (req, res, next) => {
  try {
    const rides = await Ride.find({ 
      departureTime: { $gte: new Date() },
      availableSeats: { $gt: 0 }
    })
    .sort({ departureTime: 1 })
    .populate('creator', 'name phoneNumber'); // Populate contact info

    res.json(rides);
  } catch (err) {
    next(err);
  }
});

// POST /api/rides
// Offer a new ride
router.post('/', auth, async (req, res, next) => {
  try {
    const { pickupLocation, dropoffLocation, departureTime, availableSeats, pricePerSeat, womenOnly } = req.body;

    // ── Input Validation ──
    if (!pickupLocation || !dropoffLocation || !departureTime || !availableSeats || pricePerSeat === undefined) {
      return res.status(400).json({ message: 'All fields (pickup, dropoff, time, seats, price) are required.' });
    }

    if (typeof pickupLocation !== 'string' || pickupLocation.trim().length < 2) {
      return res.status(400).json({ message: 'Pickup location must be at least 2 characters.' });
    }

    if (typeof dropoffLocation !== 'string' || dropoffLocation.trim().length < 2) {
      return res.status(400).json({ message: 'Dropoff location must be at least 2 characters.' });
    }

    const seats = Number(availableSeats);
    const price = Number(pricePerSeat);

    if (!Number.isInteger(seats) || seats < 1 || seats > 4) {
      return res.status(400).json({ message: 'Available seats must be between 1 and 4.' });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({ message: 'Price per seat must be a non-negative number.' });
    }

    const departure = new Date(departureTime);
    if (isNaN(departure.getTime()) || departure <= new Date()) {
      return res.status(400).json({ message: 'Departure time must be a valid future date.' });
    }

    // If a ride is women-only, verify the creator is female
    if (womenOnly) {
      const user = await User.findById(req.user.userId);
      if (user.gender !== 'Female') {
        return res.status(403).json({ message: 'Only female users can create women-only rides.' });
      }
    }

    const newRide = new Ride({
      creator: req.user.userId,
      pickupLocation: pickupLocation.trim(),
      dropoffLocation: dropoffLocation.trim(),
      departureTime: departure,
      availableSeats: seats,
      pricePerSeat: price,
      womenOnly: womenOnly || false
    });

    await newRide.save();
    res.status(201).json(newRide);
  } catch (err) {
    next(err);
  }
});

// POST /api/rides/:id/book
// Book a seat for a ride
router.post('/:id/book', auth, async (req, res, next) => {
  try {
    const rideId = req.params.id;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has already booked this ride
    const alreadyBooked = user.bookedRides.find(r => r.rideId.toString() === rideId);
    if (alreadyBooked) {
      return res.status(400).json({ message: 'You have already booked a seat for this ride' });
    }

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (ride.womenOnly && user.gender !== 'Female') {
      return res.status(403).json({ message: 'These rides are only for women and you cannot book it.' });
    }

    // Add the ride to the user's booked rides history
    user.bookedRides.push({ rideId });
    await user.save();

    res.status(200).json({ 
      message: 'Seat booked successfully', 
      bookedRides: user.bookedRides 
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
