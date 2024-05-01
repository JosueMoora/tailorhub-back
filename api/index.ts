import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import restaurantsRouter from '../src/routes/restaurants'
import usersRouter from '../src/routes/users'
import favoritesRouter from '../src/routes/favorites'
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
    'https://restaurants-app-josuemoora.vercel.app',
    'https://restaurants-app-drab.vercel.app/login'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
const PORT = process.env.PORT ?? 3001

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/restaurants', restaurantsRouter)
app.use('/api', usersRouter)
app.use('/api/favorites', favoritesRouter)

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})
