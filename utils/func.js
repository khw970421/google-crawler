const fs = require('fs')

const makeDirectory = (directoryNm) => {
  const imgDirectory = fs.existsSync(`./${directoryNm}`)
  if (imgDirectory) fs.rmdirSync(`./${directoryNm}`, { recursive: true })
  fs.mkdirSync(`${directoryNm}`)
}

const addFrontString = (queryies, target) =>
  queryies.map((query) => target.concat(query))

exports.makeDirectory = makeDirectory
exports.addFrontString = addFrontString
