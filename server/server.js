import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/api/health', (_request, response) => {
  response.json({
    success: true,
    message: 'BookEase API is running',
  })
})

const startServer = async () => {
  await connectDB()

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

startServer()
