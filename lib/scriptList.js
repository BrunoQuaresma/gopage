const Script = require('./script')
const List = require('./list')

class ScriptList extends List {
  constructor(items, preload = true) {
    super(items, Script)

    if(preload) {
      this.setTop()
      this.setBottom()
    }
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