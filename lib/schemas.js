const fs = require('fs-extra')

module.exports = (config) => {
  return config
          .sections
          .map((section) => fs.readJsonSync(section.path))
}