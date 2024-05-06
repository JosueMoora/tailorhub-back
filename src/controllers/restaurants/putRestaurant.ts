/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response } from 'express'
import { readRestaurantsFile } from '../../helpers/restaurants/getRestaurants'
import { saveRestaurantsFile } from '../../helpers/restaurants/postRestaurants'
import { Restaurant } from '../../models/Restaurant'
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
  cloud_name: 'doeglfqw7',
  api_key: '287639664959755',
  api_secret: 'VLFf11dtzvq2It216w_PHiwctfM'
})

export const putRestaurant = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  const { name, userId, address, description } = req.body

  const restaurants: Restaurant[] = readRestaurantsFile()

  const restaurantToUpdate = restaurants.find((restaurant) => restaurant.id === parseInt(id))

  if (restaurantToUpdate != null && restaurantToUpdate.userId === Number(userId)) {
    if (name) restaurantToUpdate.name = name
    if (address) restaurantToUpdate.address = address
    if (description) restaurantToUpdate.description = description
    try {
      if (req?.file?.path) {
        const result = await cloudinary.uploader.upload(req.file.path)
        // Obtener la URL de la imagen generada por Cloudinary
        const imageUrl = result.secure_url
        if (imageUrl) restaurantToUpdate.image = imageUrl
      }
      saveRestaurantsFile(restaurants)
      return res.json(restaurantToUpdate)
    } catch (error) {
      console.error('Error al guardar los restaurantes:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    return res.status(404).json({ message: "Restaurant not found or you don't have permissions to update this restaurant" })
  }
}
