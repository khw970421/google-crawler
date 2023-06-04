const { frontKeyword, keywordQueries } = require('./data/keywordQueries')
const { crawling } = require('./utils/crawl')
const { addFrontString } = require('./utils/func')

// const crawlQuery = addFrontString(frontKeyword, keywordQueries)

// const argsIdx = Number(process.argv[2]) * 11

// crawlQuery.slice(argsIdx, argsIdx + 11).forEach((query) => {
//   crawling(query)
// })

crawling()
