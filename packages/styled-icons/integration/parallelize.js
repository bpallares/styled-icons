const path = require('path')
const fg = require('fast-glob')

const {ICON_PACK} = process.env

function getFiles() {
  if (ICON_PACK) {
    return [`tests/${ICON_PACK}.test.js`]
  }

  const allFiles = fg.sync('tests/**/*.test.js', {cwd: __dirname})
  return allFiles
}

const files = getFiles()

module.exports = files.map(file => path.join('**', file))
