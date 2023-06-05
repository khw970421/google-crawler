const { frontKeyword, keywordQueries } = require('./data/keywordQueries')
const { crawling } = require('./utils/crawling')
const { addFrontString, makeDirectory } = require('./utils/func')

const crawlQuery = addFrontString(frontKeyword, keywordQueries)

const searchLength = 2
const argsIdx = Number(process.argv[2]) * searchLength

crawlQuery.slice(argsIdx, argsIdx + searchLength).forEach((query) => {
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
