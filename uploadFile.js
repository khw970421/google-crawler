const { google } = require('googleapis')
const fs = require('fs')
require('dotenv').config()

// url을 통해 얻은거  authcode 질문
const url =
  'https://example.com/?code=4%2F0AbUR2VMd2kQXjP_I433tseUpY7aNGLWeY4PA5eUs5JYlH8jzk3UidVqzR2xrtKK444dL3A&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive'

const client = new google.auth.OAuth2(
  process.env.CLIENT_SECRET,
  process.env.CLIENT_ID,
  process.env.REDIRECT_URL
)

const getToken = () => {
  const authCode = decodeURIComponent(
    url.split('&scope')[0].split('?code=')[1]
  ).slice()
  const func = async () => {
    const { tokens } = await client.getToken(authCode)
    console.log(tokens)
    client.setCredentials(tokens)
    uploadImage(client)
  }

  func()
}

async function uploadImage(client) {
  var files = fs.readdirSync('img')
  files.forEach((file) => {
    const f = fs.readdirSync(`img/${file}`)
    f.forEach(async (jpg) => {
      try {
        const drive = google.drive({ version: 'v3', auth: client })
        const filePath = `img/${file}/${jpg}`
        const fileMetadata = {
          name: '파일 이름',
          mimeType: 'image/jpeg',
        }
        const media = {
          mimeType: 'image/jpeg',
          body: fs.createReadStream(filePath),
        }
        const response = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
        })
        console.log('File uploaded:', response.data)
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    })
  })
}

getToken()
