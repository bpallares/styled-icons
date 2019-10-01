const path = require('path')
const fg = require('fast-glob')

const {JOB_COUNT = 1, JOB_INDEX = 0} = process.env

function getFiles() {
  const allFiles = fg.sync('tests/**/*.test.js', {cwd: __dirname})
  const filesPerJob = Math.ceil(allFiles.length / JOB_COUNT)
  const startIndex = filesPerJob * JOB_INDEX
  return allFiles.slice(startIndex, startIndex + filesPerJob)
}

const files = getFiles()

module.exports = files.map(file => path.join('**', file))
