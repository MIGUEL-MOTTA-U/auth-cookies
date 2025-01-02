// server.js
import { PORT } from './config.js'
import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello there!')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
