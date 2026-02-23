# 🍨 베스킨 라빈스31 키오스크
일상에서 자주 접하는 키오스크를 직접 제작해보고자 베스킨 라빈스31을 선정하여 키오스크를 리뉴얼했습니다.

## 🛠️ 기술스택
- React
- Redux Toolkit
- React Router
- Styled-components

## 📌 주요기능
- 상품 클릭 시 장바구니에 수량이 자동 갱신
- 아이스크림 카테고리 선택(콘/컵)에 따라 맛 선택 페이지에서 선택한 아이템이 장바구니에 아이콘으로 표시
- 포인트 확인: 휴대폰 번호 입력 시 랜덤한 포인트 발급
- 포인트 사용 시 총 상품 금액에서 해당 포인트만큼 자동 차감

## 📦 컴포넌트 구조
<pre> ```
baskin_robbins/
  ├── src/
    ├── component/            # 재사용 가능한 컴포넌트
      ├── data.js             # 모든 상품의 데이터
      ├── DiscountPage.js     # 할인 페이지
      ├── Footer.js           # Footer 기본 틀
      ├── Header.js           # 공용 Header
      ├── IceCreamPage.js     # 아이스크림 카테고리 맛 선택 페이지
      ├── IceCreamData.js     # 아이스크림 맛 데이터
      ├── MainPage.js         # 메인 페이지
      ├── Modal.js            # 모달 기본 틀
      ├── OrderChkPage.js     # 상품 확인 페이지
      ├── PayPage.js          # 결제 페이지
      ├── store.js            # 장바구니 상태관리
      ├── swiper.css          # swiper 스타일
      └── WelcomePage.js      # 처음 보여지는 페이지
    ```
</pre>
