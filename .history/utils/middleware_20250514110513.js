import User from '../models/user.js'

export const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      req.token = authorization.replace('Bearer ', '')
    } else {
      req.token = null
    }
    next()
  }

export  const userExtractor = async (request, response, next) => {
    const token = request.token
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (decodedToken.id) {
          const user = await User.findById(decodedToken.id)
          request.user = user
        }
      } catch (error) {
        return response.status(401).json({ error: 'invalid token' })
      }
    } else {
      return response.status(401).json({ error: 'token missing' })
    }
  
    next()
  }