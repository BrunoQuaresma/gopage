const server = require('./../lib/server')

function preview(port, root) {
  server.run(port, root)
}

module.exports = preview