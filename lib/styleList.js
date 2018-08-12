const fs = require('fs-extra')
const Style = require('./style')

class StylesList {
  constructor(items) {
    this.setItems(items)
  }

  setItems(items) {
    this.items = items.map(item => {
      if(item instanceof Style) {
        return item
      }

      return new Style(item)
    })
  }

  add(item) {
    this.items = this.items.concat(new Style(item))
  }

  mergeAndSave() {
    const content = this.items.map(i => i.content).join('\n')

    fs.outputFileSync(`./build/sections.css`, content)
  }

  render() {
    return this.items.map(i => i.render()).join('\n')
  }
}

module.exports = StylesList