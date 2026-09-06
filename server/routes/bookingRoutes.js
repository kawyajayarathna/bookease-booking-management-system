import express from 'express'
import { cancelBooking, createBooking, getAllBookings, getBookingById, getMyBookings, updateBookingStatus } from '../controllers/bookingController.js'
import { protect, requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createBooking)
router.get('/', protect, requireAdmin, getAllBookings)
router.get('/my-bookings', protect, getMyBookings)
router.patch('/:id/cancel', protect, cancelBooking)
router.patch('/:id/status', protect, requireAdmin, updateBookingStatus)
router.get('/:id', protect, getBookingById)

export default router
