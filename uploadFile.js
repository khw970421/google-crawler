const { google } = require('googleapis')
const fs = require('fs')
require('dotenv').config()

// url을 통해 얻은거  authcode 질문
const url =
  'https://example.com/?code=4%2F0AbUR2VP6_hLLaTrWw8RujhuCqzrOfC-_MSVaRHS_UEV_Q-rn_UdK50M88T9p1JoWN7gXAA&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive'

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
    const filePath = './다운로드.jpg'
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
}

getToken()

/*
const { google } = require('googleapis')
const fs = require('fs')
const { getQueryImgs } = require('./getCrawl')
const { frontKeyword, keywordQueries } = require('./data/keywordQueries')
const { addFrontString } = require('./utils/func')
require('dotenv').config()

// url을 통해 얻은거  authcode 질문
const url =
  'https://example.com/?code=4%2F0AbUR2VNx5bH2ITTIdzJ5J0RZmnyvrMwDryiu06NBs9taJi_Ka9lz194eOldfXqnfG5lFyg&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive'

const client = new google.auth.OAuth2(
  process.env.CLIENT_SECRET,
  process.env.CLIENT_ID,
  process.env.REDIRECT_URL
)

const crawlQuery = addFrontString(frontKeyword, keywordQueries)

const getToken = () => {
  const authCode = decodeURIComponent(
    url.split('&scope')[0].split('?code=')[1]
  ).slice()
  const func = async () => {
    const { tokens } = await client.getToken(authCode)
    console.log(tokens)
    client.setCredentials(tokens)

    crawlQuery.forEach(async (query) => {
      getQueryImgs(query, client)
    })
  }

  func()
}

getToken()

*/
