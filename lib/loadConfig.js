const fs = require('fs-extra')
const mustache = require('mustache')

function applyVariables(config) {
  return JSON.parse(
    mustache.render(
      JSON.stringify(config),
      config.variables
    )
  )
}

module.exports = (path) => {
  let config = fs.readJsonSync(path)

  return applyVariables(config)
}