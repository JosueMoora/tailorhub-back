import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import readUsersFile from '../../helpers/users/getUsers'
import saveUsersFile from '../../helpers/users/postUsers'
import { User } from '../../models/User'
import isValidEmail from '../../helpers/users/checkEmail'

export function signup (req: Request, res: Response): Response {
  const { name, email, password } = req.body

  if (name.length === 0) {
    return res.status(401).json({
      msg: 'El nombre es requerido'
    })
  }

  if (email.length === 0 || !isValidEmail(email)) {
    return res.status(401).json({
      msg: 'Se requiere un email valido'
    })
  }

  if (password.length < 4) {
    return res.status(401).json({
      msg: 'La contraseña debe tener 4 o mas digitos'
    })
  }

  const users = readUsersFile()

  const existingUser = users.find((user) => user.email === email)
  if (existingUser != null) {
    return res.status(400).json({ msg: 'El usuario ya existe' })
  }
  const saltRounds = 10
  const hashedPassword = bcrypt.hashSync(password, saltRounds)
  const newUser: User =
  {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword
  }
  users.push(newUser)
  saveUsersFile(users)
  return res.status(200).json({
    name,
    email
  })
}
