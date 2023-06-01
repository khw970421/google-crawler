const {
  Builder,
  Browser,
  By,
  Key,
  until,
  Window,
} = require('selenium-webdriver')
const fs = require('fs')
const { crawlQueries } = require('./crawlQuery')
const { download } = require('./check')

const addFrontString = (queryies, target) =>
  queryies.map((query) => target.concat(query))

const crawlQuery = addFrontString(crawlQueries, '롤 ')

const images = []
async function example(query) {
  let driver = await new Builder().forBrowser(Browser.CHROME).build()

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

fs.rmdirSync('./img', { recursive: true })

crawlQuery.forEach(async (query) => {
  example(query)
})
