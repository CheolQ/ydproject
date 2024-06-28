// config/codes.js
const Codes = {
    Category: {
      Major: {
        A1: '과자,스낵,쿠키',
        A2: '초콜릿,젤리,캔디,껌',
        A3: '라면,간식',
        A4: '음료,커피'
      },
      Minor: {
        A11: '과자',
        A12: '스낵',
        A13: '쿠키',
        A14: '초콜릿',
        A15: '젤리',
        A16: '캔디',
        A17: '껌',
        A18: '라면',
        A19: '간식',
        A20: '음료',
        A21: '커피'
      }
    },
    Authorization: {
      B1: '관리자',
      B2: '회원'
    },
    FileType: {
      C1: '이미지',
      C2: 'PDF'
    },
    OrderStatus: {
      D1: '결제완료',
      D2: '주문취소요청',
      D3: '주문취소',
      D4: '상품준비중',
      D5: '배송중',
      D6: '배송완료'
    },
    AttachmentType: {
      E1: '공지사항',
      E2: 'QnA',
      E3: '리뷰'
    }
  };
  
  module.exports = Codes;