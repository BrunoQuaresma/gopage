const httpServer = require('node-http-server')

class Server {
  constructor(port, root) {
    this.port = port
    this.root = root
  }

  run() {
    httpServer.deploy(
      {
        port: this.port,
        root: this.root
      },
      () => {
        const pageUrl = `http://localhost:${this.port}`

        console.log(`Page running on ${pageUrl}`)
      }
    )
  }
}

module.exports = Server