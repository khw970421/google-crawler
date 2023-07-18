import { crawling } from './utils/crawling'
import { makeDirectory } from './utils/func'
import champions_en from './data/champions_en.json'
import champions_ko from './data/champions_ko.json'
import { CrawlSearch } from './utils/types'


const searchLength = 8
const argsIdx = Number(process.argv[2]) * searchLength

const directory = 'img'
makeDirectory(`${directory}`, false)


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

  const search: CrawlSearch = {
    url: `https://www.google.com/search?q=${championsKoNm}&tbm=isch`,
    target: 'css',
    targetData: `.rg_i`,
  }

  crawling(fs, search)
})
