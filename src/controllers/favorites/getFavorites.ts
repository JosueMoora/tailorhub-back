import { Request, Response } from 'express'
import { readUsersFile } from '../../helpers/users/getUsers'
import { User } from '../../models/Users'

export function getFavorites (req: Request, res: Response): Response {
  const users = readUsersFile()
  const user = users.find((u: User) => u.id === req.body.id)
  if (user == null) return res.status(404).json('Usuario no encontrado')
  if (user.favorite == null) {
    return res.status(400).json({
      msg: 'you do not have favorites'
    })
  }
  return res.status(200).json({ favorite: user.favorite })
}
