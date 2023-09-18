import { Request, Response } from 'express'
import { readRestaurantsFile } from '../../helpers/restaurants/getRestaurants'

export const getRestaurant = (req: Request, res: Response): Response => {
  const restaurants = readRestaurantsFile()
  const { id } = req.params
  const restaurant = restaurants.find((restaurant) => restaurant.id === parseInt(id))
  return res.status(200).json(restaurant)
}
