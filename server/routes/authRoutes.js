import express from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'
import passport from '../config/passport.js'
import { googleCallback } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5176'}/login?oauthError=failed` }), googleCallback)

export default router
