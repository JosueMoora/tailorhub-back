/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getRestaurants } from '../controllers/restaurants/getRestaurants'
import { getRestaurant } from '../controllers/restaurants/getRestaurant'
import { postRestaurant } from '../controllers/restaurants/postRestaurant'
import { putRestaurant } from '../controllers/restaurants/putRestaurant'
import { deleteRestaurant } from '../controllers/restaurants/deleteRestaurant'
import { TokentValidation } from '../helpers/jwt/verifyToken'
import { getMyRestaurants } from '../controllers/restaurants/getMyRestaurants'
import { upload } from '../libs/Storage'
const router = Router()

router.get('/', getRestaurants)
router.get('/:id', getRestaurant)
router.get('/myrestaurants/:id', TokentValidation, getMyRestaurants)
router.post('/', TokentValidation, upload.single('image'), postRestaurant)
router.put('/:id', TokentValidation, upload.single('image'), putRestaurant)
router.delete('/:id', TokentValidation, deleteRestaurant)

export default router
