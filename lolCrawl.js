const { keywordQueries } = require('./data/keywordQueries')
const { crawling } = require('./utils/crawling')
const { makeDirectory } = require('./utils/func')

const fs = {
  dir: process.argv[2] || 'img',
  fileNm: keywordQueries || 'img',
}

const search = {
  url: `https://www.leagueoflegends.com/ko-kr/champions/`,
  css: `.style__ImageContainer-n3ovyt-1 .cipsic`,
}

makeDirectory(fs.dir)
crawling(fs, search)
