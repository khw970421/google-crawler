const { crawling } = require('./utils/crawling')
const { makeDirectory } = require('./utils/func')

const searchLength = 8
const argsIdx = Number(process.argv[2]) * searchLength

const directory = 'img'
makeDirectory(`${directory}`, false)

const champions_en = require('./data/champions_en.json')
const champions_ko = require('./data/champions_ko.json')
const championsEnNms = Object.keys(champions_en)
const championsKoNms = Object.values(champions_ko).map(
  ({ name }) => `롤 ${name}`
)

const searchChampions = championsEnNms.slice(argsIdx, argsIdx + searchLength)

searchChampions.forEach((EnNm, idx) => {
  const championsKoNm = championsKoNms[argsIdx + idx]
  makeDirectory(`${directory}/${EnNm}`, false)

  const fs = {
    dir: `./${directory}/${EnNm}`,
    fileNm: `${directory}`,
  }

  const search = {
    url: `https://www.google.com/search?q=${championsKoNm}&tbm=isch`,
    css: `.rg_i`,
  }

  crawling(fs, search)
})
