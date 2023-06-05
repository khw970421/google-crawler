const { frontKeyword, keywordQueries } = require('./data/keywordQueries')
const { crawling } = require('./utils/crawling')
const { addFrontString, makeDirectory } = require('./utils/func')

const crawlQuery = addFrontString(frontKeyword, keywordQueries)

const argsIdx = Number(process.argv[2]) * 2

crawlQuery.slice(argsIdx, argsIdx + 2).forEach((query) => {
  makeDirectory(`img/${query}`)

  const fs = {
    dir: `./img/${query}`,
    fileNm: 'img',
  }

  const search = {
    url: `https://www.google.com/search?q=${query}&tbm=isch`,
    css: `.rg_i`,
  }

  crawling(fs, search)
})
