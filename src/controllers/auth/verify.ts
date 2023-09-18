import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Payload } from '../../models/Payload'
import { readUsersFile } from '../../helpers/users/getUsers'

export const verify = (req: Request, res: Response): any => {
  const { token } = req.cookies
  if (token == null) {
    return res.status(401).json({ msg: 'The token is required' })
  }
  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET ?? 'tokentest') as Payload
    const users = readUsersFile()
    const user = users.find((u) => u.id === id)
    if (user === undefined) {
      return res.status(401).json({ msg: 'Token is not valid - user does not exist' })
    }
    return res.status(200).json({ name: user.name, username: user.username })
  } catch (error) {
    return res.json(error)
  }
}
