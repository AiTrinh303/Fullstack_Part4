import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import config from './utils/config.js'
import blogsRouter from './controllers/blogs.js'
import { MONGODB_URI, PORT } from './utils/config.js'


dotenv.config()

const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use('/api/blogs', blogsRouter)

export default app
