const fs = require('fs-extra')

class Style {
  constructor(data, preload = false) {
    this.data = data

    if(preload) {
      this.setContent()
    }
  }

  render() {
    return `<link rel="stylesheet" href="${this.data.path}"/>`
  }

  setContent() {
    this.content = fs.readFileSync(this.data.path, 'utf8')
  }
}

module.exports = Style