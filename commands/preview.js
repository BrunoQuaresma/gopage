const server = require('node-http-server')

function serverReady(server) {
  console.log(`Server on port ${server.config.port} is now up`)
}

function preview() {
  server.deploy(
    {
      port: 8080,
      root: './build'
    },
    serverReady
  )
}

module.exports = preview