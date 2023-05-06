import { atom, selector } from 'recoil';
import dummyData from '../model/dummyData';
export const ProductAtom = atom({
  key: 'ProductAtom',
  default: dummyData,
});
export const ProductIdSelector = selector({
  key: 'ProductIdSelector',
  get: ({ get }) => {
    const CurrentItem = get(ProductAtom);
    return CurrentItem.length;
  },
});
