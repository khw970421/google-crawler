import { Builder, Browser, By, until } from 'selenium-webdriver'
import { download } from './download'
import { CrawlFs, CrawlSearch } from './types/index'

async function crawling(fs: CrawlFs, search: CrawlSearch) {
  const images = []
  const driver = await new Builder().forBrowser(Browser.CHROME).build()

  try {
    await driver.get(search.url)

    const scrollCount = 1 // 반복할 스크롤 횟수
    for (let i = 0; i < scrollCount; i++) {
      await driver.executeScript(
        'window.scrollTo(0, document.body.scrollHeight)'
      )
      await driver.sleep(500)
    }

    await driver.wait(until.urlContains('http'), 100)

    let resultElements = await driver.findElements(findCase(search))

    for (var i = 0; i < resultElements.length; i++) {
      const image = await resultElements[i].getAttribute('src')

      if (image) {
        images.push(image)
      }
    }
    download(images, fs.dir, fs.fileNm, function () {
      // console.log('done')
    })
  } finally {
    await driver.quit()
  }
}

const findCase = ({ target, targetData }: Pick<CrawlSearch, "target" | "targetData">) => {
  let result
  // @deprecated "By.tagName" Use {@link By.css() By.css(tagName)} instead.
  switch (target) {
    case 'css':
      result = By.css(targetData)
      break

    case 'class':
      result = By.className(targetData)
      break
    case 'id':
      result = By.id(targetData)
      break
  }
  return result
}

export { crawling }
