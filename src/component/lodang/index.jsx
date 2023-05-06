import styled from 'styled-components';
const NewLoding = () => {
  const LodingBody = styled.div`
    margin: 0;
    display: flex; /*내부 요소들이 차례로 배치 */
    justify-content: center; /*내부 요소의 좌우 정렬 상태를 가운데로 설정*/
    align-items: center; /*요소는 세로 중앙 배치*/
    height: 100vh; /*웹 크기 변화에 따라 변경되는 반응형 수치*/
  `;
  const LodingBox = styled.div`
    span {
      display: inline-block; /* span 내부요소들을 한줄로 세우기 */
      width: 20px;
      height: 20px;
      background-color: gray;
      border-radius: 50%; /* span을 동그랗게 */
      animation: loading 1s 0s linear infinite;
      /* 이벤트명  반복시간  딜레이시간  이벤트처리부드럽게  이벤트무한반복*/
      &:nth-child(1) {
        /*loading의 자식 중 첫번째 span*/
        /*nth-child : 형제 사이에서의 순서*/
        animation-delay: 0s;
        background-color: red;
      }
      &:nth-child(2) {
        animation-delay: 0.2s;
        background-color: orange;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
        background-color: yellowgreen;
      }
    }
    @keyframes loading {
      /*loading이라는 keyframe 애니메이션*/
      0%,                      /* 0, 50, 100은 구간*/
    100% {
        opacity: 0; /* 안보였다가 */
        transform: scale(
          0.5
        ); /*transform의 scale로 요소를 확대 또는 축소할 수 있음*/
      }
      50% {
        opacity: 1; /* 보였다가 */
        transform: scale(1.2); /* 1.2배 */
      }
    }
  `;
  return (
    <LodingBody>
      <LodingBox>
        <span></span>
        <span></span>
        <span></span>
      </LodingBox>
    </LodingBody>
  );
};
export default NewLoding;
