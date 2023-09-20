import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { readUsersFile } from '../../helpers/users/getUsers'
import { User } from '../../models/Users'
import { saveUsersFile } from '../../helpers/users/postUsers'

export function signup (req: Request, res: Response): any {
  const { name, username, password, favorite } = req.body
  if (name.length === 0) {
    return res.status(400).json({
      msg: 'name is required'
    })
  }
  if (username.length < 4) {
    return res.status(400).json({
      msg: 'username must be 4 characters or more'
    })
  }
  if (password.length < 5) {
    return res.status(400).json({
      msg: 'password must be 5 characters or more'
    })
  }
  const users = readUsersFile()
  if (users.some((user: User) => user.username === username)) {
    return res.status(400).json({ msg: 'The user already exists' })
  } else {
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    const newUser: User = { id: users.length + 1, name, username, password: hashedPassword, favorite }
    users.push(newUser)
    saveUsersFile(users)
    return res.status(200).json('User successfully created')
  }
}
