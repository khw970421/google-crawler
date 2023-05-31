const { google } = require('googleapis')
const fs = require('fs')
require('dotenv').config()

// url을 통해 얻은거  authcode 질문
const url =
  'https://example.com/?code=4%2F0AbUR2VOF7oBkURLlzKOGw2NhtkSQjdt_3axZ3CDRv-MDvRYFtgPl9nqiqhrk8XiwC3MEnA&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive'

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
  try {
    const drive = google.drive({ version: 'v3', auth: client })
    const filePath = '다운로드.jpg'
    const fileMetadata = {
      name: '파일 이름',
      // mimeType: '이미지 MIME 타입',
    }
    const media = {
      // mimeType: '이미지 MIME 타입',
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
}

getToken()
