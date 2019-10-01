const files = require('./parallelize.js')
console.log(files)

module.exports = {
  preset: 'jest-puppeteer',
  testMatch: files,
  setupFilesAfterEnv: ['./setupTests.js'],
  transform: {
    '^.+\\.js$': './jest.transform.js',
  },
}
