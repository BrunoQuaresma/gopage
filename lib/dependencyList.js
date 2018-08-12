const _ = require('lodash')
const StylesList = require('./styleList')
const ScriptList = require('./scriptList')

class DependencyList {
  constructor(items) {
    this.items = items

    this.setStyles()
    this.setScripts()
  }

  filterByType(type) {
    return this.items.filter(item => item.type === type)
  }

  setStyles() {
    this.styles = new StylesList(this.filterByType('css'))
  }

  setScripts() {
    this.scripts = new ScriptList(this.filterByType('js'))
  }
}

module.exports = DependencyList