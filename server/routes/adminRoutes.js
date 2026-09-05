import express from 'express'
import { getAdminDashboard } from '../controllers/adminController.js'
import { protect, requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/dashboard', protect, requireAdmin, getAdminDashboard)

export default router
