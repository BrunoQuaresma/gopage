const runServer = require('./../lib/runServer')

function preview(port, root) {
  runServer(port, root)
}

module.exports = preview