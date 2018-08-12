const _ = require('lodash')
const schemas = require('./../lib/schemas')

class Dependencies {
  constructor(config) {
    this.load(config)
  }

  load(config) {
    this.items = _.flow([
      _.flattenDeep,
      _.compact,
      this.uniqByPath,
      this.schemaDependencies
    ])(schemas(config))
  }

  uniqByPath(dependencies) {
    return _.uniqBy(dependencies, d => d.path)
  }

  schemaDependencies(schemas) {
    return schemas.map(schema => schema.dependencies)
  }
}

module.exports = Dependencies