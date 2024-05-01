/* eslint-disable prefer-promise-reject-errors */
import jwt from 'jsonwebtoken'
export const generateJWT = (id: number): any => {
  // const payload = { id }

  // const token = jwt.sign(payload, process.env.TOKEN_SECRET ?? 'tokentest', { expiresIn: '4h' })
  // return token

  return new Promise((resolve, reject) => {
    const payload = { id }

    jwt.sign(payload, process.env.TOKEN_SECRET ?? 'tokentest', {
      expiresIn: '7d'
    }, (err, token) => {
      if (err != null) {
        console.log(err)
        reject('No se pudo generar el token')
      } else {
        resolve(token)
      }
    })
  })
}
