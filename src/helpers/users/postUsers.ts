import { User } from '../../models/Users'
import fs from 'fs'
import path from 'path'
const usersFilePath = path.join(__dirname, '../../data/users.json')
export function saveUsersFile (users: User[]): void {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8')
  } catch (error) {
    return console.error('Error al guardar en el archivo de usuarios:', error)
  }
}
