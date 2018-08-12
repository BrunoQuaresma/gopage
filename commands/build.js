const Config = require('./../lib/config')
const Page = require('./../lib/page')

function build(configPath) {
  const config = new Config(configPath)
  const page = new Page(config)
  page.save()
}

module.exports = build