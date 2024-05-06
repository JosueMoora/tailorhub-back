import { User } from '../../models/User'
import fs from 'fs'
import path from 'path'
const usersFilePath = path.join(__dirname, '../../data/users.json')
export default function readUsersFile (): User[] {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading the user file:', error)
    return []
  }
}
