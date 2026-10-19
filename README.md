# 운정고 세미콜론 NFC 도장판

브라우저 `localStorage`에 완료 기록을 저장하는 정적 웹사이트입니다.

## NFC 태그에 기록할 주소

배포 주소 뒤에 다음 경로를 붙여 NFC 태그에 기록합니다.

- 수화 인식 장갑: `?stamp=sgn`
- 좀비 서바이벌: `?stamp=zom`
- 핸드트래킹 비행: `?stamp=fly`
- 알고리즘 디펜스: `?stamp=alg`
- 무드등: `?stamp=led`

## 이미지 교체

현재 체험 이미지는 CSS 임시 그래픽입니다. `dist/index.html`의 각 `.revealed-face` 안을 실제 이미지 태그로 교체하면 됩니다.

