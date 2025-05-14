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
  