import { Router } from 'express'
import { getRestaurants } from '../controllers/restaurants/getRestaurants'
import { getRestaurant } from '../controllers/restaurants/getRestaurant'
import { postRestaurant } from '../controllers/restaurants/postRestaurant'
import { putRestaurant } from '../controllers/restaurants/putRestaurant'
import { deleteRestaurant } from '../controllers/restaurants/deleteRestaurant'
const router = Router()

router.get('/', getRestaurants)
router.get('/:id', getRestaurant)
router.post('/', postRestaurant)
router.put('/:id', putRestaurant)
router.delete('/:id', deleteRestaurant)

export default router
