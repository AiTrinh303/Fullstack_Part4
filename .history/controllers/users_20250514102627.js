import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user.js'

const usersRouter = express.Router()

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    if (!username || username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' })
    }
  
    if (!password || password.length < 3) {
      return res.status(400).json({ error: 'Password must be at least 3 characters long' })
    }
  
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'Username must be unique' })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  })
  

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  res.json(users)
})

export default usersRouter
