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
    'https://restaurants-app-josuemoora.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
// Lectura y parseo del body
app.use(express.json({ limit: '1024mb' }))

// It parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ limit: '1024mb', extended: true }))

// Public dir
app.use(express.static('public'))
const PORT = process.env.PORT ?? 8080

app.use(morgan('dev'))

app.use('/api/restaurants', restaurantsRouter)
app.use('/api', usersRouter)
app.use('/api/favorites', favoritesRouter)

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})
