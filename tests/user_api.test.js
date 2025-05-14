import mongoose from 'mongoose'
import supertest from 'supertest'
import bcrypt from 'bcrypt'
import app from '../app.js'
import User from '../models/user.js'
import { beforeEach, after, test } from 'node:test'
import assert from 'node:assert'

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('validpass', 10)
  const user = new User({ username: 'existinguser', passwordHash })

  await user.save()
})

test('creation fails with short username', async () => {
  const result = await api
    .post('/api/users')
    .send({ username: 'ab', password: 'validpass' })
    .expect(400)

  assert.match(result.body.error, /username/i)
})

test('creation fails with short password', async () => {
  const result = await api
    .post('/api/users')
    .send({ username: 'validuser', password: 'pw' })
    .expect(400)

  assert.match(result.body.error, /password/i)
})

test('creation fails if username already exists', async () => {
  const result = await api
    .post('/api/users')
    .send({ username: 'existinguser', password: 'validpass' })
    .expect(400)

  assert.match(result.body.error, /unique/i)
})

test('creation fails if username or password is missing', async () => {
  const result = await api
    .post('/api/users')
    .send({ name: 'Missing fields' }) // No username or password
    .expect(400)

  assert.match(result.body.error, /username|password/i)
})

after(async () => {
  await mongoose.connection.close()
})
