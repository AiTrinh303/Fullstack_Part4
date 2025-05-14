import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import { test, after, beforeEach } from 'node:test'

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

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Note(initialBlogs[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
  })

test('blogs are returned as JSON and correct number', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
  })
