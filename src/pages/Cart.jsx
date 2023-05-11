import { useRecoilValue, useRecoilState } from 'recoil';
import {
  CartAtom,
  QuantitySelector,
  TotalPriceSelector,
} from '../recoil/CartAtom';
import styled from 'styled-components';
import CartItem from './../component/CartItem/CartItem';
import { Suspense, useEffect } from 'react';
import Loading from '../component/loading';
function Cart() {
  // 전역 상태 관리 값 불러오기
  const [cartItem, setCartItem] = useRecoilState(CartAtom);
  console.log(cartItem, 'cartItem');
  // 파생 데이터 selector 가져오기1
  const TotalQuantity = useRecoilValue(QuantitySelector);
  // 파생 데이터 selector 가져오기2
  const TotalPrice = useRecoilValue(TotalPriceSelector);

  useEffect(() => {
    if (!cartItem.id) {
      const LocalData = JSON.parse(localStorage.getItem('Cart'));
      if (!LocalData) return;
      console.log(LocalData, 'LocalData');
      setCartItem(LocalData);
    }
  }, [cartItem.id, setCartItem]);

  const preventClose = (e) => {
    e.preventDefault();
    localStorage.setItem('Cart', JSON.stringify(cartItem));

    e.returnValue = '';
  };
  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  });

  return (
    <>
      <Heading>장바구니</Heading>
      <Suspense fallback={<Loading />}>
        <ItemWrapper>
          {cartItem.length ? (
            cartItem.map((e) => <CartItem data={e} key={e.id} />)
          ) : (
            <NoItems>상품이 없습니다</NoItems>
          )}
        </ItemWrapper>
      </Suspense>
      <TotalPriceWrapper>
        <ColumnWrapper>
          <span>총 갯수</span>
          <Heading>{`${TotalQuantity}개`}</Heading>
        </ColumnWrapper>
        <ColumnWrapper>
          <span>총 가격</span>
          <Heading>{`${TotalPrice}원`}</Heading>
        </ColumnWrapper>
      </TotalPriceWrapper>
    </>
  );
}
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Heading = styled.span`
  font-size: 20px;
  font-weight: var(--bold);
`;
const ItemWrapper = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 300px);
  gap: 8px;
  flex-direction: column;
`;
const TotalPriceWrapper = styled.div`
  padding: 16px;
  height: 150px;
  width: 100%;
  max-width: 1024px;
  border: 1px solid var(--line-gray);
  & span {
    text-align: right;
  }
`;
const NoItems = styled.div`
  padding: 8px;
  width: fit-content;
  margin: 0 auto;
  border-radius: 4px;
  text-align: center;
  border: 1px solid var(--line-gray);
`;

export default Cart;
