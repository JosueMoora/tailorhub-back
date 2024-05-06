import { Request, Response } from 'express'
import { generateJWT } from '../../helpers/jwt/generateJWT'
import readUsersFile from '../../helpers/users/getUsers'
import { User } from '../../models/User'
import bcrypt from 'bcrypt'

export async function authenticateUser (req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body
  const users = readUsersFile()

  if (email === '') {
    return res.status(400).json({
      msg: 'el correo es obligatorio'
    })
  }
  if (password === '') {
    return res.status(400).json({
      msg: 'la contraseña es obligatoria'
    })
  }

  const user = users.find((u: User) => u.email === email)
  if (user == null) {
    return res.status(400).json({
      msg: 'Usuario no registrado'
    })
  }
  const validate = bcrypt.compareSync(password, user.password)
  if (!validate) {
    return res.status(401).json({
      msg: 'Contraseña incorrecta'
    })
  }

  const token = await generateJWT(user.id)
  res.cookie('token', token, { secure: true, sameSite: 'lax', maxAge: 1000 * 60 * 60, httpOnly: false })
  return res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  })
}
