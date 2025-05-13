import _ from 'lodash'

export const dummy = (blogs) => {
    return 1
  }
  
export const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }
  
export const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
  
    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
  }  

export const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
  
    const grouped = _.groupBy(blogs, 'author')
  
    const most = _.maxBy(Object.entries(grouped), ([, blogList]) => blogList.length)
  
    return {
      author: most[0],
      blogs: most[1].length
    }
  }

  export const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
  
    const grouped = _.groupBy(blogs, 'author')
  
    const authorLikes = _.map(grouped, (blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes')
    }))
  
    return _.maxBy(authorLikes, 'likes')
  }  