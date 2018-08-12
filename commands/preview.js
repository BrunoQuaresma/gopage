const Server = require('./../lib/server')

function preview(port, root) {
  const server = new Server(port, root)
  server.run()
}

module.exports = preview