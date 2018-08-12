class StylesList {
  constructor(items) {
    this.items = items
  }

  add(item) {
    this.items = this.items.concat(item)
  }
}

module.exports = StylesList