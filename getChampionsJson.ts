import fs from 'fs'
import axios from 'axios'
import { RawChampions, Champions } from './utils/types/lol'

const lol_url = 'https://ddragon.leagueoflegends.com/cdn/13.12.1/data/'
const en = 'en_US/champion'
const ko = 'ko_KR/champion'

const getLOLChampions = async (lang: string) => {
  let result
  if (lang === 'ko') result = await axios.get(`${lol_url}${ko}.json`)
  else result = await axios.get(`${lol_url}${en}.json`)
  const filter = filtering(result.data.data)
  fs.writeFileSync(`./data/champions_${lang}.json`, JSON.stringify(filter))
}

const filtering = (objectData: RawChampions) => {
  const obj = {} as Champions
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
