const { frontKeyword, keywordQueries } = require('./data/keywordQueries')
const { crawling } = require('./utils/crawling')
const { addFrontString, makeDirectory } = require('./utils/func')

const crawlQuery = addFrontString(frontKeyword, keywordQueries)

const searchLength = 2
const directory = 'img'
const argsIdx = Number(process.argv[2]) * searchLength

makeDirectory(`${directory}`, false)

// 다수의 검색결과를 각각 크롤링 할 때
crawlQuery.slice(argsIdx, argsIdx + searchLength).forEach((query) => {
  makeDirectory(`${directory}/${query}`, false)

  const fs = {
    dir: `./${directory}/${query}`,
    fileNm: `${directory}`,
  }

  const search = {
    url: `https://www.google.com/search?q=${query}&tbm=isch`,
    css: `.rg_i`,
  }

  crawling(fs, search)
})

// 실행 명령어
// node crawl.js {num}
