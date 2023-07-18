import fs from 'fs'
import request from 'request'
import { getFileImageNm } from './func'

var download = function (urls: string[], targetFolder: string, imgNm: string | string[], callback: () => void) {
  urls.forEach((url, idx) => {
    if (url.startsWith('https')) {
      request.head(url, function (err, res, body) {
        request(url)
          .pipe(
            fs.createWriteStream(
              `./${targetFolder}/${getFileImageNm(imgNm, idx)}.png`
            )
          )
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
        `./${targetFolder}/${getFileImageNm(imgNm, idx)}.jpg`,
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

export { download }
