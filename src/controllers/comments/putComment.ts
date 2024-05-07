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

  const commentToUpdate = comments.find((comment) => comment.id === parseInt(id))

  if (commentToUpdate !== undefined && commentToUpdate.userId === userId) {
    commentToUpdate.description = description
    commentToUpdate.rating = Number(rating)

    try {
      saveCommentsFile(comments)
      return res.json(commentToUpdate)
    } catch (error) {
      console.error('Error al guardar los comentarios:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    return res.status(404).json({ message: "Comment not found or you don't have permissions to update this Comment" })
  }
}
