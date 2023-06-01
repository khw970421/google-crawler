var fs = require('fs')
var request = require('request')

var download = function (urls, fileNames, directoryName, callback) {
  const directory = fs.existsSync(`./img/${directoryName}`)
  if (!directory) fs.mkdirSync(`./img/${directoryName}`)

  urls.forEach((url, idx) => {
    console.log(url)

    request.head(url, function (err, res, body) {
      console.log('content-type:', res.headers['content-type'])
      console.log('content-length:', res.headers['content-length'])

      request(url)
        .pipe(fs.createWriteStream(`./img/${directoryName}/${idx}.png`))
        .on('close', callback)
    })
  })
}

// download(
//   [
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSomBufAxo_YswoUKJUl69YEhZbBUYfoRD9FQ&usqp=CAU',
//   ],
//   ['google1.png'],
//   '람머스',
//   function () {
//     console.log('done')
//   }
// )

exports.download = download
