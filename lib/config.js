const fs = require('fs-extra')
const mustache = require('mustache')
const path = require('path')
const _ = require('lodash')

class Config {
  constructor(path) {
    this.path = path
    this.load()
  }

  load() {
    this.loadValues()
    this.loadVariables()
    this.applyDefaults()
  }

  loadVariables() {
    this.values = JSON.parse(
      mustache.render(
        JSON.stringify(this.values),
        this.values.variables
      )
    )
  }

  applyDefaults() {
    const defaultName = 'index'
    const defaultWrapper = path.resolve(__dirname, './../wrapper.html')

    this.values.name = this.values.name || defaultName
    this.values.wrapper = this.values.wrapper || defaultWrapper
  }

  loadValues() {
    this.values = fs.readJsonSync(this.path)
  }
}


module.exports = Config