import { describe, test } from 'node:test'
import assert from 'node:assert'
import { dummy, totalLikes } from '../utils/list_helper.js'

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const emptyList = []
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    const listWithMultipleBlogs = [
        {
          title: 'Blog 1',
          author: 'Author 1',
          likes: 7
        },
        {
          title: 'Blog 2',
          author: 'Author 2',
          likes: 3
        },
        {
          title: 'Blog 3',
          author: 'Author 3',
          likes: 12
        }
      ]

    test('of empty list is zero', () => {
        const result = totalLikes(emptyList)
        assert.strictEqual(result, 0)
        })
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test ('of a bigger list is calculated right', () => {
        const result = totalLikes(listWithMultipleBlogs)
        assert.strictEqual(result, 22)
      })
  })
