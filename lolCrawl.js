const { keywordQueries } = require('./data/keywordQueries')
const { crawling } = require('./utils/crawling')
const { makeDirectory } = require('./utils/func')
const champions = require('./data/champions.json')
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
