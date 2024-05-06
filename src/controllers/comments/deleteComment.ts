import { Request, Response } from 'express'
import { readCommentsFile } from '../../helpers/comments/getComments'
import { Comment } from '../../models/Comment'
import { saveCommentsFile } from '../../helpers/comments/postComments'

export const deleteComment = (req: Request, res: Response): Response => {
  const { id } = req.params
  const { id: userId } = req.body
  const comments: Comment[] = readCommentsFile()
  const index = comments.findIndex(comment => comment.id === parseInt(id))
  const deletedComment = comments[index]
  if (index !== -1 && comments[index].userId === parseInt(userId)) {
    comments.splice(index, 1)
    saveCommentsFile(comments)
    return res.status(200).json(deletedComment)
  } else {
    return res.status(404).json({ message: 'Comment not found or you do not have permission to delete it' })
  }
}
