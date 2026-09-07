import mongoose from 'mongoose'
import User from '../models/User.js'

const publicUserFields = '_id name email role isBlocked createdAt updatedAt'

export const getUsers = async (request, response) => {
  try {
    const search = request.query.search?.trim()
    const filter = search ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] } : {}
    const users = await User.find(filter).select(publicUserFields).sort({ createdAt: -1 })
    return response.json({ success: true, count: users.length, users })
  } catch (error) {
    return response.status(500).json({ success: false, message: 'Unable to fetch users' })
  }
}

export const getUserById = async (request, response) => {
  if (!mongoose.isValidObjectId(request.params.id)) {
    return response.status(400).json({ success: false, message: 'Invalid user ID' })
  }

  try {
    const user = await User.findById(request.params.id).select(publicUserFields)
    if (!user) return response.status(404).json({ success: false, message: 'User not found' })
    return response.json({ success: true, user })
  } catch (error) {
    return response.status(500).json({ success: false, message: 'Unable to fetch user details' })
  }
}

export const toggleUserBlockStatus = async (request, response) => {
  const { id } = request.params

  if (!mongoose.isValidObjectId(id)) {
    return response.status(400).json({ success: false, message: 'Invalid user ID' })
  }

  if (request.user.id === id) {
    return response.status(400).json({ success: false, message: 'Administrators cannot change their own block status' })
  }

  try {
    const user = await User.findById(id)

    if (!user) return response.status(404).json({ success: false, message: 'User not found' })
    if (user.role === 'admin') {
      return response.status(403).json({ success: false, message: 'Administrator accounts cannot be blocked or unblocked' })
    }

    user.isBlocked = !user.isBlocked
    await user.save()

    return response.json({
      success: true,
      message: user.isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
      },
    })
  } catch (error) {
    return response.status(500).json({ success: false, message: 'Unable to update user status' })
  }
}
