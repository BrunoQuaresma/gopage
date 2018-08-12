class ScriptList {
  constructor(items) {
    this.items = items
  }

  top() {
    const topItems = this.items.filter(i => !i.bottom)
    
    return new ScriptList(topItems)
  }

  bottom() {
    const bottomItems = this.items.filter(i => i.bottom)

    return new ScriptList(bottomItems)
  }
}

module.exports = ScriptList