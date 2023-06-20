const fs = require('fs')
const axios = require('axios')

const lol_url = 'https://ddragon.leagueoflegends.com/cdn/13.12.1/data/'
const en = 'en_US/champion'
const ko = 'ko_KR/champion'

const getLOLChampions = async (lang) => {
  let result
  if (lang === 'ko') result = await axios.get(`${lol_url}${ko}.json`)
  else result = await axios.get(`${lol_url}${en}.json`)
  const filter = filtering(result.data.data)
  console.log(filter)
  fs.writeFileSync(`./data/champions_${lang}.json`, JSON.stringify(filter))
}

const filtering = (objectData) => {
  const obj = {}
  Object.entries(objectData).forEach(([key, value]) => {
    const { id, name, title, image } = value
    obj[key] = {
      id,
      name,
      title,
      image: image.full,
    }
  })
  return obj
}

// JSON 정렬 : JSON 파일 우클릭 - format document with - json 정렬 처리
getLOLChampions('en')
getLOLChampions('ko')
