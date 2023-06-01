const { frontKeyword, keywordQueries } = require('./data/keywordQueries')
const { crawling } = require('./utils/crawl')
const { makeDirectory, addFrontString } = require('./utils/func')

makeDirectory('img')

const crawlQuery = addFrontString(frontKeyword, keywordQueries)
crawlQuery.forEach(async (query) => {
  crawling(query)
})
