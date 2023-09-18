import { Router } from 'express'
import { authenticateUser } from '../controllers/auth/login'
import { signup } from '../controllers/auth/signup'
import { logout } from '../controllers/auth/logout'
import { verify } from '../controllers/auth/verify'
const router = Router()

router.post('/login', authenticateUser)
router.post('/sign-up', signup)
router.get('/log-out', logout)
router.get('/verify', verify)

export default router
