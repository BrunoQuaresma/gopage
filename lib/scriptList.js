const Script = require('./script')

class ScriptList {
  constructor(items, preload = true) {
    this.setItems(items)

    if(preload) {
      this.setTop()
      this.setBottom()
    }
  }

  setItems(items) {
    this.items = items.map(item => new Script(item))
  }

  setTop() {
    const topItems = this.items.filter(i => !i.isBottom())
    
    this.top = new ScriptList(topItems, false)
  }

  setBottom() {
    const bottomItems = this.items.filter(i => i.isBottom())

    this.bottom = new ScriptList(bottomItems, false)
  }

  render() {
    return this.items.map(i => i.render()).join('\n')
  }
}

module.exports = ScriptList