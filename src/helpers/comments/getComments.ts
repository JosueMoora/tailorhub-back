import fs from 'fs'
import path from 'path'
import { Comment } from '../../models/Comment'
const commentsFilePath = path.join(__dirname, '../../data/comments.json')
export function readCommentsFile (): Comment[] {
  try {
    const data = fs.readFileSync(commentsFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error al leer el archivo de restaurantes:', error)
    return []
  }
}
