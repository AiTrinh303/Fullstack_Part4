import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import blogsRouter from './controllers/blogs.js'
import { MONGODB_URI } from './utils/config.js'

dotenv.config()

const app = express()

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())  
app.use(express.json())
app.use('/api/blogs', blogsRouter)

export default app
