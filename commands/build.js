const fs = require('fs-extra')
const mustache = require('mustache')
const _ = require('lodash')
const Config = require('./../lib/config')
const DependencyList = require('./../lib/dependencyList')

function renderSection(section) {
  const sectionSchema = fs.readJsonSync(section.path)

  const sectionDir = section
                      .path
                      .split('/')
                      .slice(0, -1)
                      .join('/')

  const template = `${sectionDir}/${sectionSchema.template}`
  const sectionContent = fs.readFileSync(template, 'utf8')
  const startLine = `<!-- Start of ${sectionSchema.name} v${sectionSchema.version} -->\n`
  const endLine = `\n<!-- End of ${sectionSchema.name} v${sectionSchema.version} -->`

  return startLine + mustache.render(sectionContent, section.values) + endLine
}

function renderBody(config) {
  return config
    .values
    .sections
    .map(renderSection)
    .join('')
}

function wrap(body, wrapperPath) {
  return fs
    .readFileSync(wrapperPath, 'utf8')
    .replace('{{body}}', body)
}

function savePage(name, content) {
  fs.outputFileSync(`./build/${name}.html`, content)
}

function loadDependencies(content, config) {
  const dependencies = new DependencyList(config)
  const styles = dependencies.styles()
  const scripts = dependencies.scripts()

  const sectionsStyles = makeSectionStyles(config.values)
  styles.add(sectionsStyles)

  content = renderStyles(styles, content)
  content = renderScriptsTop(scripts.top(), content)
  content = renderScriptsBottom(scripts.bottom(), content)

  return content
}

function makeSectionStyles(config) {
  const content = config
    .sections
    .map(section => {
      const schema = fs.readJsonSync(section.path)

      const sectionDir = section
                          .path
                          .split('/')
                          .slice(0, -1)
                          .join('/')

      if(schema.css) {
        return fs.readFileSync(`${sectionDir}/${schema.css}`, 'utf8')
      }
    })
    .filter(style => style !== undefined)
    .reduce((content, css) => {
      return content + css + "\n"
    }, '')

  fs.outputFileSync(`./build/sections.css`, content)

  return { path: './sections.css' }
}

function renderStyles(styles, content) {
  const stylesContent = styles
                        .items
                        .map(style => `<link rel="stylesheet" href="${style.path}"/>`)
                        .join("\n")

  return content.replace('{{css}}', stylesContent)
}

function renderScriptsTop(scripts, content) {
  const scriptsContent = scripts
                        .items
                        .map(script => `<script src="${script.path}"></script>`)
                        .join("\n")

  return content.replace('{{js:top}}', scriptsContent)
}

function renderScriptsBottom(scripts, content) {
  const scriptsContent = scripts
    .items
    .map(script => `<script src="${script.path}"></script>`)
    .join("\n")

  return content.replace('{{js:bottom}}', scriptsContent)
}

function build(configPath) {
  const config = new Config(configPath)
  const body = renderBody(config)
  let content = wrap(body, config.values.wrapper)
  content = loadDependencies(content, config)

  savePage(config.values.name, content)
}

module.exports = build