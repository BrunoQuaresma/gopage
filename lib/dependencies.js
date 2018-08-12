const _ = require('lodash')
const schemas = require('./../lib/schemas')

function uniqByPath(dependencies) {
  return _.uniqBy(dependencies, d => d.path)
}

function schemaDependencies(schemas) {
  return schemas.map(schema => schema.dependencies)
}

function load(config) {
  return _.flow([
    _.flattenDeep,
    _.compact,
    uniqByPath,
    schemaDependencies
  ])(schemas(config))
}

module.exports = {
  load: load
}