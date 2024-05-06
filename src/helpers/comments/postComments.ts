import fs from 'fs'
import path from 'path'
import { Comment } from '../../models/Comment'
const commentsFilePath = path.join(__dirname, '../../data/Comments.json')

export function saveCommentsFile (data: Comment[]): void {
  try {
    fs.writeFileSync(commentsFilePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.error('Error when saving in the Commentaries file:', error)
  }
}
