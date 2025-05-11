const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import config from './utils/config'
import blogsRouter from './controllers/blogs'
dotenv.config()

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
