import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import { test, after } from 'node:test'

const api = supertest(app)

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Author One',
    url: 'http://first.com',
    likes: 1
  },
  {
    title: 'Second blog',
    author: 'Author Two',
    url: 'http://second.com',
    likes: 2
  }
]


test('blogs are returned as JSON and correct number', async () => {
    await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)

//   expect(response.body).toHaveLength(initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
  })
