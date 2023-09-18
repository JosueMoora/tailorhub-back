import { Request, Response } from 'express'
import { readRestaurantsFile } from '../../helpers/restaurants/getRestaurants'
import { saveRestaurantsFile } from '../../helpers/restaurants/postRestaurants'

export const putRestaurant = (req: Request, res: Response): Response => {
  const { id } = req.params
  const { name, neighborhood, address, image, cuisineType } = req.body
  const restaurants = readRestaurantsFile()
  const restaurantToUpdate = restaurants.find((restaurant) => restaurant.id === parseInt(id))
  if (restaurantToUpdate != null) {
    restaurantToUpdate.name = name
    restaurantToUpdate.neighborhood = neighborhood
    restaurantToUpdate.address = address
    restaurantToUpdate.image = image
    restaurantToUpdate.cuisineType = cuisineType
    saveRestaurantsFile(restaurants)
    return res.json(restaurantToUpdate)
  } else {
    return res.status(404).json({ message: 'Restaurante no encontrado' })
  }
}
