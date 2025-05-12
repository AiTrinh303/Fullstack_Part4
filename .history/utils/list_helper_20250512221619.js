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