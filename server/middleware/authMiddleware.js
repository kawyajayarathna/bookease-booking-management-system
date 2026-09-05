import jwt from 'jsonwebtoken'

export const protect = (request, response, next) => {
  const authorization = request.headers.authorization

  if (!authorization?.startsWith('Bearer ')) {
    return response.status(401).json({ success: false, message: 'Authentication token is required' })
  }

  try {
    request.user = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)
    return next()
  } catch (error) {
    return response.status(401).json({ success: false, message: 'Invalid or expired authentication token' })
  }
}

export const requireAdmin = (request, response, next) => {
  if (request.user?.role !== 'admin') {
    return response.status(403).json({ success: false, message: 'Admin access required' })
  }

  return next()
}
