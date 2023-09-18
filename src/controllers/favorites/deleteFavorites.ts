import { Request, Response } from 'express'
import { readUsersFile } from '../../helpers/users/getUsers'
import { User } from '../../models/Users'
import { saveUsersFile } from '../../helpers/users/postUsers'

export const deleteFavorite = (req: Request, res: Response): Response => {
  const { id } = req.params
  const userId = req.body.id
  try {
    const users = readUsersFile()
    const user = users.find((u: User) => u.id === userId)
    if (user == null) {
      return res.status(404).json('Usuario no encontrado')
    }
    user.favorite = user.favorite.filter(res => res.id !== Number(id))
    saveUsersFile(users)
    return res.status(200).json(user?.favorite)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
