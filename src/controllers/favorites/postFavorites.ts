import { Request, Response } from 'express'
import { readUsersFile } from '../../helpers/users/getUsers'
import { User } from '../../models/Users'
import { saveUsersFile } from '../../helpers/users/postUsers'

export function postFavorites (req: Request, res: Response): any {
  try {
    const users = readUsersFile()
    const favorite = req.body.favorite
    const userId = req.body.id

    if (favorite == null || typeof favorite !== 'object' || userId == null || typeof userId !== 'number') {
      return res.status(400).json('Entrada no válida')
    }

    const user = users.find((u: User) => u.id === userId)

    if (user == null) {
      return res.status(404).json('Usuario no encontrado')
    }
    const isRestaurantInFavorites = user.favorite.some((restaurant) => restaurant.id === favorite.id)

    if (isRestaurantInFavorites) {
      return res.status(400).json('El restaurante ya está en la lista de favoritos')
    }
    user.favorite.push(favorite)

    saveUsersFile(users)
    return res.json(user?.favorite)
  } catch (error) {
    console.error('Error al agregar restaurante favorito:', error)
    return res.status(500).json('Error interno del servidor')
  }
}
