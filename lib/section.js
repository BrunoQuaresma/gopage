const fs = require('fs-extra')
const SectionTemplate = require('./sectionTemplate')
const Style = require('./style')

class Section {
  constructor(data) {
    this.data = data
    this.loadSchema()
    this.setDir()
    this.setTemplate()
    this.setStyle()
    this.setDependencies()
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

  setStyle() {
    if(this.schema.css) {
      this.style = new Style({
        path: `${this.dir}/${this.schema.css}`
      }, true)
    }
  }

  setDependencies() {
    this.dependencies = this.schema.dependencies
  }

  render() {
    return this.template.render()
  }
}

module.exports = Section