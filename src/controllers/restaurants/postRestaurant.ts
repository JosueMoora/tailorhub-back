import { Request, Response } from 'express'
import { readRestaurantsFile } from '../../helpers/restaurants/getRestaurants'
import { saveRestaurantsFile } from '../../helpers/restaurants/postRestaurants'
import { Restaurant } from '../../models/Restaurants'

export const postRestaurant = (req: Request, res: Response): Response => {
  const { name, neighborhood, address, image, cuisineType } = req.body
  const restaurants = readRestaurantsFile()
  const newRestaurant: Restaurant = { id: restaurants.length + 1, name, neighborhood, address, image, cuisineType }
  restaurants.push(newRestaurant)
  saveRestaurantsFile(restaurants)
  return res.status(201).json(newRestaurant)
}
