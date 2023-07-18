import { crawling } from './utils/crawling'
import { makeDirectory } from './utils/func'

// en의 경우 K'SANTE가 id로는 Ksante로 KAI'SA인 Kaisa보다 사진에서 우선되기에
// 한국 기준으로 한국어 정렬 후 ko에서 크롤링 진행

import champions from './data/champions_ko.json'
import { CrawlSearch } from './utils/types'

// 이름으로 오름차순 정렬 후 영어로 된 id를 반환
const championsArr = Object.values(champions)
  .sort((a, b) => (a.name < b.name ? -1 : 1))
  .map((champion) => champion.id)

const fs = {
  dir: 'img',
  fileNm: championsArr || 'img',
}

const search: CrawlSearch = {
  url: `https://www.leagueoflegends.com/ko-kr/champions/`,
  target: 'css',
  targetData: `.style__ImageContainer-n3ovyt-1 .cipsic`,
}

makeDirectory(fs.dir, true)
crawling(fs, search)
