import { Request, Response } from 'express'
import { saveCommentsFile } from '../../helpers/comments/postComments'
import { readCommentsFile } from '../../helpers/comments/getComments'
import { Comment } from '../../models/Comment'

export const postComment = (req: Request, res: Response): Response => {
  const { id, restaurantId, description, rating } = req.body
  const comments = readCommentsFile()
  const newComment: Comment = {
    id: comments.length + 1,
    userId: Number(id),
    restaurantId: Number(restaurantId),
    rating: rating(rating),
    description
  }
  comments.push(newComment)
  saveCommentsFile(comments)
  return res.status(201).json(newComment)
}
