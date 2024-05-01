import { Request, Response } from 'express'
import { generateJWT } from '../../helpers/jwt/generateJWT'
import { readUsersFile } from '../../helpers/users/getUsers'
import { User } from '../../models/Users'
import bcrypt from 'bcrypt'

export async function authenticateUser (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  const { username, password } = req.body
  const users = readUsersFile()

  const user = users.find((u: User) => u.username === username)
  if ((user == null)) {
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
  res.cookie('token', token, { sameSite: 'none', maxAge: 1000 * 60 * 60 })
  return res.status(200).json('acceso exitoso')
}
