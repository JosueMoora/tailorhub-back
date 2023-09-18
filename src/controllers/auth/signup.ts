import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { readUsersFile } from '../../helpers/users/getUsers'
import { User } from '../../models/Users'
import { saveUsersFile } from '../../helpers/users/postUsers'

export function signup (req: Request, res: Response): any {
  const { name, username, password, favorite } = req.body
  const users = readUsersFile()
  if (users.some((user: User) => user.username === username)) {
    res.status(400).json('El usuario ya existe')
  } else {
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    const newUser: User = { id: users.length + 1, name, username, password: hashedPassword, favorite }
    users.push(newUser)
    saveUsersFile(users)
    res.status(201).json('Usuario creado con exito')
  }
}
