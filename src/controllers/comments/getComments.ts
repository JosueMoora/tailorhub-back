import { Response, Request } from 'express'
import { readCommentsFile } from '../../helpers/comments/getComments'
import { Comment } from '../../models/Comment'
import { User } from '../../models/User'
import readUsersFile from '../../helpers/users/getUsers'

export const getComments = (req: Request, res: Response): Response => {
  const { id } = req.params
  const comments: Comment[] = readCommentsFile()
  const users: User[] = readUsersFile()
  const restaurantComments = comments.filter(comment => comment.restaurantId === parseInt(id))

  const commentsWithUsernames = restaurantComments.map(comment => {
    const user = users.find(user => user.id === comment.userId)
    if (user !== null) {
      return {
        ...comment,
        user: user?.name
      }
    }
    return comment
  })

  return res.json({ comments: commentsWithUsernames })
}
