import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import restaurantsRouter from './routes/restaurants'
import commentsRouter from './routes/comments'
import usersRouter from './routes/users'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
app.use(cookieParser())
app.use(cors({
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept'
  ],
  credentials: true,
  origin: [
    'http://localhost:3000',
    'https://tailorhub-front.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
const PORT = process.env.PORT ?? 3001

app.use(morgan('dev'))
app.use(express.json())

app.use('/api', usersRouter)
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/comments', commentsRouter)

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})
