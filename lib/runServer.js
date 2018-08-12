const httpServer = require('node-http-server')

module.exports = (port, root) => {
  httpServer.deploy(
    {
      port: port,
      root: root
    },
    () => {
      const pageUrl = `http://localhost:${port}`

      console.log(`Page running on ${pageUrl}`)
    }
  )
}