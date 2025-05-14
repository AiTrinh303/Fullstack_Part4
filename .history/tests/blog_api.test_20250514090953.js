import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import { test, after, beforeEach } from 'node:test'
import Blog from '../models/blog.js'
import assert from 'node:assert'

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
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('blogs are returned as JSON and correct number', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert(response.body).toHaveLength(initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
  })
