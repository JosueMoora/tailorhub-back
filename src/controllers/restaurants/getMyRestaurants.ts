/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response } from 'express'
import { readRestaurantsFile } from '../../helpers/restaurants/getRestaurants'
import { readCommentsFile } from '../../helpers/comments/getComments'

export const getMyRestaurants = (req: Request, res: Response): Response => {
  const { id } = req.params
  const restaurants = readRestaurantsFile()
  const comments = readCommentsFile()
  const myRestaurants = restaurants.filter(res => res.userId === Number(id))
  // objeto para almacenar la suma de ratings por restaurante y la cantidad de comentarios
  const ratingsSumMap: { [key: string]: number } = {}
  const commentsCountMap: { [key: string]: number } = {}

  // Calcula la suma de ratings y cuenta los comentarios para cada restaurante
  comments.forEach(comment => {
    const restaurantId = comment.restaurantId.toString()
    ratingsSumMap[restaurantId] = (ratingsSumMap[restaurantId] || 0) + comment.rating
    commentsCountMap[restaurantId] = (commentsCountMap[restaurantId] || 0) + 1
  })

  const restaurantsWithRating = myRestaurants.map(restaurant => {
    const restaurantId = restaurant.id.toString()
    const ratingsSum = ratingsSumMap[restaurantId] || 0
    const commentsCount = commentsCountMap[restaurantId] || 1 // Si no hay comentarios, se asume 1 para evitar división por cero
    const ratingAverage = ratingsSum / commentsCount
    return {
      ...restaurant,
      rating: ratingAverage,
      comentarios: commentsCountMap[restaurant.id.toString()] || 0
    }
  })
  return res.status(200).json({ restaurants: restaurantsWithRating })
}
