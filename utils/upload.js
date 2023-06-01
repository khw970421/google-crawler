const { google } = require('googleapis')

async function uploadImage(client, body) {
  try {
    const drive = google.drive({ version: 'v3', auth: client })
    const filePath = '다운로드.jpg'
    const fileMetadata = {
      name: '파일 이름',
      mimeType: 'image/jpeg',
    }
    const media = {
      mimeType: 'image/jpeg',
      body: body,
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

exports.uploadImage = uploadImage
