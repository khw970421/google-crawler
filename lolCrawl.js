const { frontKeyword, keywordQueries } = require('./data/keywordQueries')
const { crawling } = require('./utils/crawling')
const { makeDirectory } = require('./utils/func')

const crawlUrl = `https://www.leagueoflegends.com/ko-kr/champions/`
const directory = process.argv[2] || 'img'

makeDirectory(directory)
crawling(directory, crawlUrl)
