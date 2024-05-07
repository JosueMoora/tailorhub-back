/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response } from 'express'
import { readCommentsFile } from '../../helpers/comments/getComments'
import { saveCommentsFile } from '../../helpers/comments/postComments'
import { Comment } from '../../models/Comment'

export const putComment = (req: Request, res: Response): Response => {
  const { id } = req.params
  const { userId, rating, description } = req.body

  const comments: Comment[] = readCommentsFile()

  const index = comments.findIndex((comment) => comment.id === parseInt(id))

  if (index !== -1 && comments[index].userId === userId) {
    comments[index].description = description
    comments[index].rating = rating
    try {
      saveCommentsFile(comments)
      return res.json(comments[index])
    } catch (error) {
      console.error('Error al guardar los comentarios:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    return res.status(404).json({ message: "Comment not found or you don't have permissions to update this Comment" })
  }
}
