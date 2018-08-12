const fs = require('fs-extra')
const SectionList = require('./sectionList')
const Wrapper = require('./wrapper')

class Page {
  constructor(config) {
    this.config = config
    this.content = ''

    this.setSections()
    this.setWrapper()
    this.setDependencies()
  }

  setSections() {
    this.sections = new SectionList(this
                                    .config
                                    .values
                                    .sections)
  }

  setWrapper() {
    this.wrapper = new Wrapper(this.config.values.wrapper)
  }

  setDependencies() {
    this.dependencies = this.sections.dependencies
  }

  render() {
    this.generateSectionStyles()
    this.renderSections()
    this.renderWrapper()
    this.renderDependencies()
  }

  generateSectionStyles() {
    this.sections.styles.mergeAndSave()
  }

  renderSections() {
    this.content = this.sections.render()
  }

  renderWrapper() {
    this.content = this.wrapper.wrap(this.content)
  }

  renderDependencies() {
    this.dependencies.styles.add({ path: './sections.css' })
    this.content = this.content.replace('{{css}}', this.dependencies.styles.render())
    this.content = this.content.replace('{{js:top}}', this.dependencies.scripts.top.render())
    this.content = this.content.replace('{{js:bottom}}', this.dependencies.scripts.bottom.render())
  }

  save() {
    this.render()
    const path = `./build/${this.config.values.name}.html`
    fs.outputFileSync(path, this.content)
  }
}

module.exports = Page