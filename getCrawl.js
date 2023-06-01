const {
  Builder,
  Browser,
  By,
  Key,
  until,
  Window,
} = require('selenium-webdriver')

const { download } = require('./check')

const crawlQuery = '롤'
const images = []
;(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build()
  try {
    await driver.get(`https://www.google.com/search?q=${crawlQuery}&tbm=isch`)
    // await driver.executeScript(
    //   `window.scrollTo({top:window.innerHeight, left:0})`
    // )

    const scrollCount = 5 // 반복할 스크롤 횟수
    for (let i = 0; i < scrollCount; i++) {
      await driver.executeScript(
        'window.scrollTo(0, document.body.scrollHeight)'
      )
      await driver.sleep(100)
    }

    await driver.wait(until.urlContains('http'), 100)

    let resultElements = await driver.findElements(By.className('rg_i'))

    for (var i = 0; i < resultElements.length; i++) {
      const image = await resultElements[i].getAttribute('src')
      if (image && image.startsWith('https')) {
        images.push(image)
      }
    }
    console.log(images)

    download(images, images, '람머스', function () {
      console.log('done')
    })
  } finally {
    await driver.quit()
  }
})()
