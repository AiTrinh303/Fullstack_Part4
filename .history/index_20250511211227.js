const app = require('./app')
const http = require('http')
const config = require('./utils/config')

import app
 from './app'

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
