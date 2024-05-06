/* eslint-disable prefer-promise-reject-errors */
import jwt from 'jsonwebtoken'
export const generateJWT = (id: number): any => {
  return new Promise((resolve, reject) => {
    const payload = { id }

    jwt.sign(payload, process.env.TOKEN_SECRET ?? 'fdsjfdsjfsd54353', {
      expiresIn: '7d'
    }, (err, token) => {
      if (err != null) {
        console.log(err)
        reject('Could not generate token')
      } else {
        resolve(token)
      }
    })
  })
}
