# 크롤링

## 기술스택

selenium-webdriver

## 한번의 크롤링 진행

- `node lolCrawl.js`

* 한개의 사이트에서 특정 조건을 가진 (css) 사진의 src를 모아 download

## 여러개의 크롤링 진행

- `node crawl.js {num}`

* 각각을 실행하는데 있어서 크롤링 환경을 무수히 많이 만들경우 정상적으로 동작하지 않았고  
  이를 적당한 크기로 나눠서 반복적으로 실행하는데 매번 변수값을 바꾸는 것이 번거로워
  `process.argv`의 2번째 매개변수를 바꾸면서 실행하며 크롤링을 진행

# google-drive

- 원래 목적은 크롤링한 것들을 google-drive에 저장하는 것을 목적으로 했지만
  google-drive 자체에서 `user rate limit exceeded` 에러가 발생하여 해당 부분은 추가적인 진행 X

# utils 함수들

## crawling.js

- selenium-webdriver를 사용하여 크롤링 수행

## func.js - makeDirectory 함수

- 특정 폴더에 대해 이미 존재하는 폴더를 삭제할 것인지와 삭제하지 않을 것인지에 대한 것을 두번째 매개변수에 의해 분기처리

## download.js

- https와 data로 된 url을 각각 다운로드 될 수 있게 처리
- imgNm이 배열일 때는 해당 배열값을 이름으로 저장  
(가렌.jpg, 애쉬.jpg ... )
- imgNm이 배열이 아닐때는 주어진 idx 이름으로 저장  
(img1.jpg, img2.jpg, img3.jpg...)
