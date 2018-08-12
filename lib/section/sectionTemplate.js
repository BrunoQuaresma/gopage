const fs = require('fs-extra')
const mustache = require('mustache')

class SectionTemplate {
  constructor(path, values, name, version) {
    this.path = path
    this.values = values
    this.name = name
    this.version = version

    this.loadContent()
  }

  loadContent() {
    this.content = fs.readFileSync(this.path, 'utf8')
  }

  renderStartLine() {
    return `<!-- Start of ${this.name} v${this.version} -->\n`
  }

  renderEndLine() {
    return `\n<!-- End of ${this.name} v${this.version} -->`
  }

  render() {
    return [
      this.renderStartLine(),
      mustache.render(this.content, this.values),
      this.renderEndLine()
    ].join('')
  }
}

module.exports = SectionTemplate