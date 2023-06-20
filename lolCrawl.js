const { keywordQueries } = require('./data/keywordQueries')
const { crawling } = require('./utils/crawling')
const { makeDirectory } = require('./utils/func')

// 알파벳 순서로 적용하기 위해 en url과 en을 가진 json으로 사용
const champions = require('./data/champions_en.json')
const championsArr = Object.keys(champions)

const fs = {
  dir: 'img',
  fileNm: championsArr || 'img',
}

const search = {
  url: `https://www.leagueoflegends.com/en-us/champions/`,
  css: `.style__ImageContainer-n3ovyt-1 .cipsic`,
}

makeDirectory(fs.dir, true)
crawling(fs, search)
