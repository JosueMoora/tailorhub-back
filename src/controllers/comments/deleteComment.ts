import { Request, Response } from 'express'
import { readCommentsFile } from '../../helpers/comments/getComments'
import { Comment } from '../../models/Comment'
import { saveCommentsFile } from '../../helpers/comments/postComments'

export const deleteComment = (req: Request, res: Response): Response => {
  const { id } = req.params
  const { id: userId } = req.body
  const comments: Comment[] = readCommentsFile()
  const comment = comments.find(comment => comment.id === parseInt(id))
  if (comment !== undefined && comment.userId === parseInt(userId)) {
    const newComments = comments.filter(c => c.id !== comment.id)
    saveCommentsFile(newComments)
    return res.status(200).json(comment)
  } else {
    return res.status(404).json({ message: 'Comment not found or you do not have permission to delete it' })
  }
}
