const { makeDirectory } = require('./utils/func')

const dir = process.argv[2] || 'img'
makeDirectory(dir)
