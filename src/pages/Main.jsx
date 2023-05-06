import styled from 'styled-components';
import ProductCard from './../component/ProductCard/ProductCard';

import { useRecoilValue } from 'recoil';
import { ProductAtom } from '../recoil/AllProduct';
function Main() {
  const dummy = useRecoilValue(ProductAtom);
  console.log(dummy);
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
