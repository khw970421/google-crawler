const { Builder, Browser, By, until } = require('selenium-webdriver')
const { download } = require('./download')

async function crawling(fs, search) {
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

    let resultElements = await driver.findElements(By.css(search.css))

    for (var i = 0; i < resultElements.length; i++) {
      const image = await resultElements[i].getAttribute('src')

      if (image) {
        images.push(image)
      }
    }
    console.log(fs.dir, fs.fileNm)
    download(images, fs.dir, fs.fileNm, function () {
      // console.log('done')
    })
  } finally {
    await driver.quit()
  }
}

exports.crawling = crawling
