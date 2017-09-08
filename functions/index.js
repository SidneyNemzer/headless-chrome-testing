const functions = require('firebase-functions')
const puppeteer = require('puppeteer')

exports.chrome = functions.https.onRequest((req, res) => {
  return puppeteer.launch()
    .then(browser =>
      browser.newPage()
    )
    .then(page => {
      return page.goto('https://example.com')
        .then(() => {
          page.evaluate(() => ({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
          }))
        })
        .then(dimensions =>
          res.send(dimensions)
        )
    })
})
