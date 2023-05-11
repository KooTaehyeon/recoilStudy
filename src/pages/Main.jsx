import styled from 'styled-components';
import ProductCard from './../component/ProductCard/ProductCard';

import { useRecoilValue } from 'recoil';
import { ProductAtom } from '../recoil/AllProduct';
import { useEffect } from 'react';
function Main() {
  const dummy = useRecoilValue(ProductAtom);
  console.log(dummy);
  useEffect(() => {
    localStorage.removeItem('reCoil');
    localStorage.removeItem('Cart');
  }, []);
  return (
    <ListWrapper>
      {dummy.map((e) => {
        return (
          <li key={e.id}>
            <ProductCard data={e} />
          </li>
        );
      })}
    </ListWrapper>
  );
}
const ListWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

export default Main;
