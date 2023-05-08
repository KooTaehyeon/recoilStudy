import React, { useEffect } from 'react';
import { CardAtom } from '../recoil/CardDetail';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const CardDetail = () => {
  const Card = useRecoilValue(CardAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!Card.id) {
      navigate('/');
    }
  });

  console.log(Card);
  return (
    <Wrapper>
      <div>제목{Card.title}</div>
      <div>가격:{Card.price}</div>
      <div>내용{Card.description}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 16px;
  height: 100%;
  border: 1px solid var(--line-gray);
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
export default CardDetail;
