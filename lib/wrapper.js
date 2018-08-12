const fs = require('fs-extra')

class Wrapper {
  constructor(path) {
    this.path = path

    this.setContent()
  }

  setContent() {
    this.content = fs.readFileSync(
      this.path,
      'utf8'
    )
  }

  wrap(body) {
    return this.content.replace('{{body}}', body)
  }
}

module.exports = Wrapper