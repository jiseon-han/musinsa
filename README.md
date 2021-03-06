# Musinsa

무신사 FE 과제인 characters list 무한 스크롤 UI 구현입니다.

# 프로젝트 실행 방법

npm으로 실행 시

```
npm install
npm start
```

yarn으로 실행 시

```
yarn install
yarn start
```
프로젝트 실행 후
`http://localhost:3000/characters`에서 구현 결과를 확인할 수 있습니다.

# 사용하는 Library 및 Framework

### React.js

- 실무에서 주로 사용하였고, create-react-app으로 간편하게 프로젝트를 구성하였습니다.

### react-router

- react 프로젝트에서 페이지의 이동 관리를 위한 라우팅 라이브러리 입니다.
- 과제의 URL에서 page를 받아올 때 사용합니다.

### Styled-Components

- javascript에서 css를 사용할 수 있도록 도와주는 스타일링 프레임워크 입니다.
- 컴포넌트 형식으로 스타일을 줄 수 있어 스타일의 재사용성 및 사이드 이펙트 해결을 위해 사용 했습니다.

### antd-mobile

- 인기있는 UI Framework인 ant design의 모바일 버전으로 간편하게 공통된 UI 스타일 제공하며 infinity Scroll 기능을 제공합니다.

# 결과 화면
|![filter_reset_delete](https://user-images.githubusercontent.com/19835829/147664037-ebd3fddb-cf9e-4215-abfe-5cf7146fc590.gif)|![infinity_scroll](https://user-images.githubusercontent.com/19835829/147664357-6e6c9696-8831-45e1-882a-32b3413d3543.gif)|
|:------:|:---:|
|필터 및 삭제, 초기화|무한 스크롤|
