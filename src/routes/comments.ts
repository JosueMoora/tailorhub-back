import { Router } from 'express'
import { TokentValidation } from '../helpers/jwt/verifyToken'
import { getComments } from '../controllers/comments/getComments'
import { postComment } from '../controllers/comments/postComment'
import { putComment } from '../controllers/comments/putComment'
import { deleteComment } from '../controllers/comments/deleteComment'
const router = Router()

router.get('/:id', getComments)
router.post('/', TokentValidation, postComment)
router.put('/:id', TokentValidation, putComment)
router.delete('/:id', TokentValidation, deleteComment)

export default router
