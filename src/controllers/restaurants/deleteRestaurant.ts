import { Request, Response } from 'express'
import { readRestaurantsFile } from '../../helpers/restaurants/getRestaurants'
import { saveRestaurantsFile } from '../../helpers/restaurants/postRestaurants'

export const deleteRestaurant = (req: Request, res: Response): Response => {
  const { id } = req.params
  const restaurants = readRestaurantsFile()
  const index = restaurants.findIndex((restaurant) => restaurant.id === parseInt(id))
  if (index !== -1) {
    restaurants.splice(index, 1)
    saveRestaurantsFile(restaurants)
    return res.json({ message: 'Restaurante eliminado correctamente' })
  } else {
    return res.status(404).json({ message: 'Restaurante no encontrado' })
  }
}
