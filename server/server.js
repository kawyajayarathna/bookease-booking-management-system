import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    success: true,
    message: 'BookEase API is running',
  })
})

app.listen(port, () => {
  console.log(`BookEase API listening on port ${port}`)
})