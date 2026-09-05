import express from 'express'
import { getUserById, getUsers } from '../controllers/userController.js'
import { protect, requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, requireAdmin)
router.get('/', getUsers)
router.get('/:id', getUserById)

export default router
