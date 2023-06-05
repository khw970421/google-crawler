const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const { download } = require('./download')
const { makeDirectory } = require('./func')

async function crawling(query) {
  const images = []
  const driver = await new Builder().forBrowser(Browser.CHROME).build()

  try {
    await driver.get(`https://www.google.com/search?q=${query}&tbm=isch`)

    const scrollCount = 1 // 반복할 스크롤 횟수
    for (let i = 0; i < scrollCount; i++) {
      await driver.executeScript(
        'window.scrollTo(0, document.body.scrollHeight)'
      )
      await driver.sleep(500)
    }

    await driver.wait(until.urlContains('http'), 100)

    let resultElements = await driver.findElements(By.className('rg_i'))

    for (var i = 0; i < resultElements.length; i++) {
      const image = await resultElements[i].getAttribute('src')
      if (image) {
        images.push(image)
      }
    }

    makeDirectory(`img/${query}`)

    download(images, `img/${query}`, 'img', () => {})
  } finally {
    await driver.quit()
  }
}

exports.crawling = crawling
