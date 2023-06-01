const { google } = require('googleapis')
require('dotenv').config()

const client = new google.auth.OAuth2(
  process.env.CLIENT_SECRET,
  process.env.CLIENT_ID,
  process.env.REDIRECT_URL
)

const SCOPES = ['https://www.googleapis.com/auth/drive'] // 사용할 API에 따라 권한 범위를 설정합니다.

const getAuthUrl = () => {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })

  console.log('Authorize this app by visiting this URL:', authUrl)
}

getAuthUrl()
