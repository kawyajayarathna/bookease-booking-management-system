import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const emailPattern = /^\S+@\S+\.\S+$/

const safeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isBlocked: user.isBlocked,
})

const createToken = (user) => jwt.sign(
  { id: user._id.toString(), role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
)

export const registerUser = async (request, response) => {
  try {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
      return response.status(400).json({ success: false, message: 'Name, email, and password are required' })
    }

    if (!emailPattern.test(email.trim())) {
      return response.status(400).json({ success: false, message: 'Please provide a valid email address' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
      return response.status(409).json({ success: false, message: 'An account with this email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email: normalizedEmail, password: hashedPassword })

    return response.status(201).json({ success: true, user: safeUser(user) })
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).json({ success: false, message: 'An account with this email already exists' })
    }

    return response.status(500).json({ success: false, message: 'Unable to register user' })
  }
}

export const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response.status(400).json({ success: false, message: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() })
    const passwordMatches = user && await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      return response.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    if (user.isBlocked) {
      return response.status(403).json({ success: false, message: 'Your account has been blocked. Please contact an administrator.' })
    }

    return response.json({ success: true, token: createToken(user), user: safeUser(user) })
  } catch (error) {
    return response.status(500).json({ success: false, message: 'Unable to log in' })
  }
}
