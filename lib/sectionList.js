const _ = require('lodash')
const Section = require('./section')
const DependencyList = require('./dependencyList')

class SectionList {
  constructor(sections) {
    this.setItems(sections)
    this.setDependencies()
  }

  setItems(sections) {
    this.items = sections.map(section => new Section(section))
  }

  setDependencies() {
    const dependencies = _.flow([
      _.flattenDeep,
      _.compact,
      (dependencies) => _.uniqBy(dependencies, d => d.path)
    ])(this.items.map(i => i.dependencies))

    this.dependencies = new DependencyList(dependencies)
  }

  render() {
    return this.items.map(i => i.render()).join('\n')
  }
}

module.exports = SectionList