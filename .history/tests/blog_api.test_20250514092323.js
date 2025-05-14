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

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
  
    for (const blog of response.body) {
      assert.ok(blog.id, 'id field is missing')
      assert.strictEqual(typeof blog.id, 'string')
      assert.strictEqual(blog._id, undefined)
      assert.strictEqual(blog.__v, undefined)
    }
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New blog post',
      author: 'New Author',
      url: 'http://newblog.com',
      likes: 5,
    }
  
    const blogsAtStart = await api.get('/api/blogs')
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await api.get('/api/blogs')
    const titles = blogsAtEnd.body.map(b => b.title)
  
    // Length should increase
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1)
  
    // The new blog should be in the list
    assert.ok(titles.includes(newBlog.title))
  })
  
  

after(async () => {
    await mongoose.connection.close()
  })
