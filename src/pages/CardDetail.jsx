import React, { useEffect } from 'react';
import { CardAtom } from '../recoil/CardDetail';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const CardDetail = () => {
  const [Card, setCard] = useRecoilState(CardAtom);

  const navigate = useNavigate();
  useEffect(() => {
    if (!Card.id) {
      const LocalData = JSON.parse(localStorage.getItem('reCoil'));
      console.log(LocalData, 'LocalData');
      setCard(LocalData);
    }
  }, [Card, Card.id, setCard]);

  // 1. custom hook으로 사용할 함수를 하나 생성한다.
  const preventClose = (e) => {
    // 2. 해당 함수 안에 새로운 함수를 생성하는데, 이때 이 함수는 자바스크립트의 이벤트를 감지하게된다.
    e.preventDefault();
    localStorage.setItem('reCoil', JSON.stringify(Card));
    // 2-1. 특정 이벤트에 대한 사용자 에이전트 (브라우저)의 기본 동작이 실행되지 않도록 막는다.
    e.returnValue = '';

    // 2-2. e.preventDefault를 통해서 방지된 이벤트가 제대로 막혔는지 확인할 때 사용한다고 한다.
    // 2-3. 더 이상 쓰이지 않지만, chrome 설정상 필요하다고 하여 추가함.
    // 2-4. returnValue가 true일 경우 이벤트는 그대로 실행되고, false일 경우 실행되지 않는다고 한다.
  };
  console.log(Card, 'card');
  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
      // 4. beforeunload 이벤트는 리소스가 사라지기 전 window 자체에서 발행한다.
      // 4-2. window의 이벤트를 감지하여 beforunload 이벤트 발생 시 preventClose 함수가 실행된다.
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
      // 5. 해당 이벤트 실행 후, beforeunload를 감지하는 것을 제거한다.
    };
  });

  console.log(Card);
  return (
    <>
      <Wrapper>
        <div>{Card.title}</div>
        <div>Price: {Card.price}</div>
        <div dangerouslySetInnerHTML={{ __html: Card.description }}></div>
      </Wrapper>
      <Button onClick={() => navigate(-1)}>뒤로가기</Button>
    </>
  );
};

const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 16px;
  min-height: 300px;
  border: 1px solid var(--line-gray);
  div {
    border-bottom: 1px solid #dcdcdc;
    margin: 10px 0;
    padding: 5px 3px;
    &:first-child {
      font-weight: 700;
    }
    &:last-child {
      border-bottom: none;
      padding: 20px 3px;
    }
  }
`;
const Button = styled.button`
  padding: 8px;
  width: 50%;
  margin: 10px auto;
  color: #fff;
  position: relative;
  background-color: var(--main);
  &:hover {
  }
`;
export default CardDetail;
