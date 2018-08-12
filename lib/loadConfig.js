const fs = require('fs-extra')
const mustache = require('mustache')
const path = require('path')
const _ = require('lodash')

function applyVariables(config) {
  return JSON.parse(
    mustache.render(
      JSON.stringify(config),
      config.variables
    )
  )
}

function applyDefaults(config) {
  const defaultName = 'index'
  const defaultWrapper = path.resolve(__dirname, './../wrapper.html')

  config.name = config.name || defaultName
  config.wrapper = config.wrapper ||  defaultWrapper

  return config
}

module.exports = (path) => {
  let config = fs.readJsonSync(path)

  return _.flow([
    applyVariables,
    applyDefaults
  ])(config)
}