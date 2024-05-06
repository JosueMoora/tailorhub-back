import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import readUsersFile from '../users/getUsers'
import { Payload } from '../../models/Payload'

export const TokentValidation = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.cookies.token
  if (token == null) {
    return res.status(401).json({
      msg: 'The token is required'
    })
  }
  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET ?? 'tokentest') as Payload
    const users = readUsersFile()
    const user = users.find((u) => u.id === id)
    if (user == null) {
      return res.status(401).json({
        msg: 'Token is not valid - user does not exist'
      })
    }
    req.body.id = id
    next()
  } catch (error) {
    return res.status(401).json({
      msg: 'Token is not valid'
    })
  }
}
