import mongoose from 'mongoose'
import Booking from '../models/Booking.js'
import User from '../models/User.js'

const statuses = ['pending', 'confirmed', 'cancelled', 'completed']
const bookingFields = '_id user service date startTime endTime status notes createdAt updatedAt'
const isAdmin = (request) => request.user.role === 'admin'

const validTime = (time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time)
const today = () => { const date = new Date(); date.setHours(0, 0, 0, 0); return date }

export const createBooking = async (request, response) => {
  try {
    const { service, date, startTime, endTime, notes } = request.body
    if (!service || !date || !startTime || !endTime) return response.status(400).json({ success: false, message: 'Service, date, start time, and end time are required' })
    const bookingDate = new Date(date)
    if (Number.isNaN(bookingDate.getTime())) return response.status(400).json({ success: false, message: 'Please provide a valid date' })
    if (bookingDate < today()) return response.status(400).json({ success: false, message: 'Booking date cannot be in the past' })
    if (!validTime(startTime) || !validTime(endTime)) return response.status(400).json({ success: false, message: 'Times must use HH:mm format' })
    if (startTime >= endTime) return response.status(400).json({ success: false, message: 'Start time must be before end time' })
    const booking = await Booking.create({ user: request.user.id, service: service.trim(), date: bookingDate, startTime: startTime.trim(), endTime: endTime.trim(), notes: notes?.trim() })
    return response.status(201).json({ success: true, message: 'Booking created successfully', booking })
  } catch (error) {
    return response.status(500).json({ success: false, message: 'Unable to create booking' })
  }
}

export const getMyBookings = async (request, response) => {
  try { const bookings = await Booking.find({ user: request.user.id }).select(bookingFields).sort({ createdAt: -1 }); return response.json({ success: true, count: bookings.length, bookings }) }
  catch (error) { return response.status(500).json({ success: false, message: 'Unable to fetch bookings' }) }
}

export const getBookingById = async (request, response) => {
  if (!mongoose.isValidObjectId(request.params.id)) return response.status(400).json({ success: false, message: 'Invalid booking ID' })
  try {
    const booking = await Booking.findById(request.params.id).select(bookingFields).populate('user', 'name email')
    if (!booking) return response.status(404).json({ success: false, message: 'Booking not found' })
    if (!isAdmin(request) && booking.user._id.toString() !== request.user.id) return response.status(403).json({ success: false, message: 'You are not authorized to view this booking' })
    return response.json({ success: true, booking })
  } catch (error) { return response.status(500).json({ success: false, message: 'Unable to fetch booking' }) }
}

export const cancelBooking = async (request, response) => {
  if (!mongoose.isValidObjectId(request.params.id)) return response.status(400).json({ success: false, message: 'Invalid booking ID' })
  try {
    const booking = await Booking.findById(request.params.id).select(bookingFields)
    if (!booking) return response.status(404).json({ success: false, message: 'Booking not found' })
    if (isAdmin(request) || booking.user.toString() !== request.user.id) return response.status(403).json({ success: false, message: 'You are not authorized to cancel this booking' })
    if (booking.status === 'completed') return response.status(400).json({ success: false, message: 'Completed bookings cannot be cancelled' })
    if (booking.status === 'cancelled') return response.status(400).json({ success: false, message: 'Booking is already cancelled' })
    booking.status = 'cancelled'; await booking.save()
    return response.json({ success: true, message: 'Booking cancelled successfully', booking })
  } catch (error) { return response.status(500).json({ success: false, message: 'Unable to cancel booking' }) }
}

export const getAllBookings = async (request, response) => {
  try {
    const filter = {}
    if (request.query.status) {
      if (!statuses.includes(request.query.status)) return response.status(400).json({ success: false, message: 'Invalid booking status' })
      filter.status = request.query.status
    }
    if (request.query.search?.trim()) {
      const search = request.query.search.trim()
      const users = await User.find({ $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }).select('_id')
      filter.$or = [{ service: { $regex: search, $options: 'i' } }, { user: { $in: users.map((user) => user._id) } }]
    }
    const bookings = await Booking.find(filter).select(bookingFields).populate('user', 'name email').sort({ createdAt: -1 })
    return response.json({ success: true, count: bookings.length, bookings })
  } catch (error) { return response.status(500).json({ success: false, message: 'Unable to fetch bookings' }) }
}

export const updateBookingStatus = async (request, response) => {
  if (!mongoose.isValidObjectId(request.params.id)) return response.status(400).json({ success: false, message: 'Invalid booking ID' })
  const { status } = request.body
  if (!statuses.includes(status)) return response.status(400).json({ success: false, message: 'Invalid booking status' })
  try {
    const booking = await Booking.findByIdAndUpdate(request.params.id, { status }, { new: true, runValidators: true }).select(bookingFields).populate('user', 'name email')
    if (!booking) return response.status(404).json({ success: false, message: 'Booking not found' })
    return response.json({ success: true, message: 'Booking status updated successfully', booking })
  } catch (error) { return response.status(500).json({ success: false, message: 'Unable to update booking status' }) }
}
