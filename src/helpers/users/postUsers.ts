import { User } from '../../models/User'
import fs from 'fs'
import path from 'path'
const usersFilePath = path.join(__dirname, '../../data/users.json')
export default function saveUsersFile (users: User[]): void {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8')
  } catch (error) {
    return console.error('Error saving to user file:', error)
  }
}
