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

export const postRestaurant = async (req: Request, res: Response): Promise<Response> => {
  const restaurants = readRestaurantsFile()
  try {
    const { id, name, address, description } = req.body
    const result = await cloudinary.uploader.upload(req.file?.path as any)

    // Obtener la URL de la imagen generada por Cloudinary
    const imageUrl = result.secure_url

    // Crear el objeto del restaurante con la URL de la imagen
    const newRestaurant: Restaurant = {
      id: restaurants.length + 1,
      userId: Number(id),
      name,
      address,
      image: imageUrl,
      description
    }

    // Guardar el restaurante en la lista de restaurantes
    restaurants.push(newRestaurant)
    saveRestaurantsFile(restaurants)

    // Devolver la respuesta con el restaurante creado
    return res.status(201).json(newRestaurant)
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el restaurante:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
