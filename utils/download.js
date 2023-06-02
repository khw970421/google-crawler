var fs = require('fs')
var request = require('request')

var download = function (urls, fileNames, directoryName, callback) {
  const directory = fs.existsSync(`./img/${directoryName}`)
  if (!directory) fs.mkdirSync(`./img/${directoryName}`)

  urls.forEach((url, idx) => {
    if (url.startsWith('https')) {
      request.head(url, function (err, res, body) {
        request(url)
          .pipe(fs.createWriteStream(`./img/${directoryName}/${idx}.jpg`))
          .on('close', callback)
      })
    } else {
      const imageParts = url.split(';base64,')
      const mimeType = imageParts[0].split(':')[1]
      const imageData = imageParts[1]

      // Base64 디코딩
      const decodedImage = Buffer.from(imageData, 'base64')

      // 이미지 파일로 저장
      fs.writeFile(
        `./img/${directoryName}/${idx}.jpg`,
        decodedImage,
        { encoding: 'base64' },
        (err) => {
          if (err) {
            // console.error('이미지 저장 실패:', err)
          } else {
            // console.log('이미지 저장 성공!')
          }
        }
      )
    }
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
