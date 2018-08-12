const _ = require('lodash')
const schemas = require('./schemas')
const StylesList = require('./styleList')
const ScriptList = require('./scriptList')

class DependencyList {
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

  filterByType(type) {
    return this.items.filter(item => item.type === type)
  }

  styles() {
    return new StylesList(this.filterByType('css'))
  }

  scripts() {
    return new ScriptList(this.filterByType('js'))
  }
}

module.exports = DependencyList