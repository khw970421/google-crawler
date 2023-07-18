type CrawlSearchTarget = 'css' | 'class' | 'id' | 'tag'

interface CrawlSearch {
  url: string,
  target: CrawlSearchTarget,
  targetData: string
}

interface CrawlFs {
  dir: string,
  fileNm: string | string[]
}

export { CrawlSearch, CrawlFs }
