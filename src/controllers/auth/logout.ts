import { Request, Response } from 'express'

export function logout (req: Request, res: Response): Response {
  const token = req.cookies.token
  try {
    if (token === undefined) {
      return res.send('no token')
    } else {
      res.cookie('token', null, { secure: true, sameSite: 'lax', maxAge: 0 })
      return res.status(200).json('Sesión cerrada exitosamente')
    }
  } catch (error) {
    return res.status(400).json('Invalid Token')
  }
}
