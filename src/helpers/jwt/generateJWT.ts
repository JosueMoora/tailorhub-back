import jwt from 'jsonwebtoken'
export const generateJWT = (id: number): any => {
  const payload = { id }

  const token = jwt.sign(payload, process.env.TOKEN_SECRET ?? 'tokentest', { expiresIn: '4h' })
  return token
}
