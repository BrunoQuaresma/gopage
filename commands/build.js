const fs = require('fs-extra')
const path = require('path')
const mustache = require('mustache')
const _ = require('lodash')

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
  let dependencies = config
                      .sections
                      .map((section) => {
                        const schema = fs.readJsonSync(section.path)

                        return schema.dependencies
                      })

  dependencies = _.flattenDeep(dependencies).filter(dependencie => dependencie !== undefined)
  dependencies = _.uniqBy(dependencies, d => d.path)

  let styles = dependencies.filter(d => d.type === 'css')
  const jsTop = dependencies.filter(d => d.type === 'js' && !d.bottom)
  const jsBottom = dependencies.filter(d => d.type === 'js' && d.bottom)

  const sectionsStyles = makeSectionStyles(config)
  styles = styles.concat(sectionsStyles)

  content = renderStyles(styles, content)
  content = renderScriptsTop(jsTop, content)
  content = renderScriptsBottom(jsBottom, content)

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
                        .map(style => `<link rel="stylesheet" href="${style.path}"/>`)
                        .join("\n")

  return content.replace('{{css}}', stylesContent)
}

function renderScriptsTop(scripts, content) {
  const scriptsContent = scripts
                        .map(script => `<script src="${script.path}"></script>`)
                        .join("\n")

  return content.replace('{{js:top}}', scriptsContent)
}

function renderScriptsBottom(scripts, content) {
  const scriptsContent = scripts
    .map(script => `<script src="${script.path}"></script>`)
    .join("\n")

  return content.replace('{{js:bottom}}', scriptsContent)
}

function build(configPath) {
  let config = fs.readJsonSync(configPath)
  config = JSON.parse(mustache.render(JSON.stringify(config), config.variables))

  const name = config.name || 'index'
  const wrapper = config.wrapper || path.resolve(__dirname, './../wrapper.html')
  const body = renderBody(config)
  let content = wrap(body, wrapper)
  content = loadDependencies(content, config)

  savePage(name, content)
}

module.exports = build