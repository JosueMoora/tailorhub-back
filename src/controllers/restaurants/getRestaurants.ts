import { Request, Response } from 'express'
import { readRestaurantsFile } from '../../helpers/restaurants/getRestaurants'

export const getRestaurants = (_req: Request, res: Response): Response => {
  const restaurants = readRestaurantsFile()
  return res.status(200).send(restaurants)
}
