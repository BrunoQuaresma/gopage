const fs = require('fs-extra')
const SectionTemplate = require('./sectionTemplate')

class Section {
  constructor(data) {
    this.data = data
    this.loadSchema()
    this.setDir()
    this.setTemplate()
  }

  loadSchema() {
    this.schema = fs.readJsonSync(this.data.path)
  }

  setDir() {
    this.dir = this
                .data
                .path
                .split('/')
                .slice(0, -1)
                .join('/')
  }

  setTemplate() {
    const path = `${this.dir}/${this.schema.template}`
    this.template = new SectionTemplate(
                          path,
                          this.data.values,
                          this.schema.name,
                          this.schema.version
                        )
  }

  render() {
    return this.template.render()
  }
}

module.exports = Section