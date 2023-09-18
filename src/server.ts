import dotenv from 'dotenv'
import express from 'express'
import restaurantsRouter from './routes/restaurants'
import usersRouter from './routes/users'
import favoritesRouter from './routes/favorites'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
app.use(cookieParser())
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})
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
