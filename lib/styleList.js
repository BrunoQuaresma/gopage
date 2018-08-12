const Style = require('./style')

class StylesList {
  constructor(items) {
    this.setItems(items)
  }

  setItems(items) {
    this.items = items.map(item => new Style(item))
  }

  add(item) {
    this.items = this.items.concat(new Style(item))
  }

  render() {
    return this.items.map(i => i.render()).join('\n')
  }
}

module.exports = StylesList