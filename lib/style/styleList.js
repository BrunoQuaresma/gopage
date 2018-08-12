const fs = require('fs-extra')
const Style = require('./style')
const List = require('./../list')

class StylesList extends List {
  constructor(items) {
    super(items, Style)
  }

  mergeAndSave() {
    const content = this.items.map(i => i.content).join('\n')

    fs.outputFileSync(`./build/sections.css`, content)
  }

  render() {
    return this.items.map(i => i.render()).join('\n')
  }
}

StylesList.Class = Style

module.exports = StylesList