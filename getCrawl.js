const {
  Builder,
  Browser,
  By,
  Key,
  until,
  Window,
} = require('selenium-webdriver')
const fs = require('fs')

const { keywordQueries } = require('./data/keywordQueries')
const { download } = require('./download')
const { makeDirectory, addFrontString } = require('./utils/func')

const crawlQuery = addFrontString(keywordQueries, '롤 ')

async function example(query) {
  const images = []
  const driver = await new Builder().forBrowser(Browser.CHROME).build()

  try {
    await driver.get(`https://www.google.com/search?q=${query}&tbm=isch`)

    const scrollCount = 2 // 반복할 스크롤 횟수
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
      if (image && image.startsWith('https')) {
        images.push(image)
      }
    }

    download(images, images, query, function () {
      console.log('done')
    })
  } finally {
    await driver.quit()
  }
}

makeDirectory('img')

crawlQuery.forEach(async (query) => {
  example(query)
})
