const { makeDirectory } = require('./utils/func')

if (process.argv[2]) makeDirectory(`${process.argv[2]}`)
else makeDirectory(`img`)
