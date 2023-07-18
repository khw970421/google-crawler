import fs from 'fs'

const makeDirectory = (directoryNm: string, isDuplicatedDirRemove: boolean) => {
  const imgDirectory = fs.existsSync(`./${directoryNm}`)

  // 폴더가 있으면서 이를 삭제하고 새로 생성
  if (imgDirectory && isDuplicatedDirRemove) {
    fs.rmSync(`./${directoryNm}`, { recursive: true })
    fs.mkdirSync(`${directoryNm}`)
  }
  // 폴더가 없을 때 새로 생성
  else if (!imgDirectory) {
    fs.mkdirSync(`${directoryNm}`)
  }
  // 폴더가 있으면서 이미 존재하는 폴더를 제거하고 싶지않으면 따로 수행 X
}

const getFileImageNm = (imgNm: string | string[], idx: number) => {
  return imgNm instanceof Array ? `${imgNm[idx]}` : `${imgNm}${idx}`
}

export { makeDirectory, getFileImageNm }
