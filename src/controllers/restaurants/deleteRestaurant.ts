import { Request, Response } from 'express'
import { readRestaurantsFile } from '../../helpers/restaurants/getRestaurants'
import { saveRestaurantsFile } from '../../helpers/restaurants/postRestaurants'

export const deleteRestaurant = (req: Request, res: Response): Response => {
  const { id } = req.params
  const userId = req.body.id
  const restaurants = readRestaurantsFile()
  const restaurant = restaurants.find((restaurant) => restaurant.id === parseInt(id))
  if (restaurant?.userId !== userId) {
    return res.status(404).json({ message: 'you cannot eliminate this restaurant, it is not yours' })
  }
  if (restaurant !== null) {
    const newRestaurants = restaurants.filter(res => res.id !== restaurant?.id)
    saveRestaurantsFile(newRestaurants)
    return res.json(restaurant)
  } else {
    return res.status(404).json({ message: 'Restaurant not found' })
  }
}
