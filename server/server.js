import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import passport, { configurePassport } from './config/passport.js'

dotenv.config()
configurePassport()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/users', userRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/contact', contactRoutes)

app.get('/api/health', (_request, response) => {
  response.json({
    success: true,
    message: 'KVAudio API is running',
  })
})

const startServer = async () => {
  await connectDB()

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

startServer()
