import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true,
      minlength: [2, 'Service must be at least 2 characters long'],
      maxlength: [100, 'Service cannot exceed 100 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      trim: true,
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
  },
  { timestamps: true },
)

bookingSchema.index({ user: 1, date: 1 })
bookingSchema.index({ date: 1, status: 1 })

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
