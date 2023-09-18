import { Router } from 'express'
import { TokentValidation } from '../helpers/jwt/verifyToken'
import { getFavorites } from '../controllers/favorites/getFavorites'
import { postFavorites } from '../controllers/favorites/postFavorites'
import { deleteFavorite } from '../controllers/favorites/deleteFavorites'
const router = Router()
router.get('/', TokentValidation, getFavorites)
router.post('/', TokentValidation, postFavorites)
router.delete('/:id', TokentValidation, deleteFavorite)

export default router
