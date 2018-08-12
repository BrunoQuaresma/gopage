class List {
  constructor(items, itemClass) {
    this.itemClass = itemClass
    this.setItems(items)
  }

  setItems(items) {
    this.items = items.map(item => {
      if (item instanceof this.itemClass) {
        return item
      }

      return new this.itemClass(item)
    })
  }

  add(item) {
    let newItem = item

    if(!(item instanceof this.itemClass)) {
      newItem = new this.itemClass(item)
    }

    this.items = this.items.concat(newItem)
  }
}

module.exports = List