type CrawlSearchTarget = 'css' | 'class' | 'id'

interface CrawlSearch {
  url: string,
  target: CrawlSearchTarget,
  targetData: string
}

interface CrawlFs {
  dir: string,
  fileNm: string | string[]
}

export { CrawlSearch, CrawlFs, CrawlSearchTarget }
