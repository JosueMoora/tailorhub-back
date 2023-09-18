import { User } from '../../models/Users'
import fs from 'fs'
import path from 'path'
const usersFilePath = path.join(__dirname, '../../data/users.json')
export function readUsersFile (): User[] {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error al leer el archivo de usuarios:', error)
    return []
  }
}
