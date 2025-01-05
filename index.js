import express from 'express'
import { PORT, SECRET_TOKEN } from './config.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  const token = req.cookies.acces_token
  req.session = { user: null }
  try {
    const userId = jwt.verify(token, SECRET_TOKEN)
    req.session.user = userId
  } catch {}
  next()
})

app.use('/api', userRoutes)
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.listen(PORT)
console.log(`App listening on port http://localhost:${PORT}`)
