import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './component/Layout/DefaultLayout';
import { Suspense, lazy } from 'react';
import Loading from './component/lodang';
import CartPost from './pages/CartPost';
const Main = lazy(() => import('./pages/Main'));
const Navbar = lazy(() => import('./component/Navigation/Navbar'));
const Cart = lazy(() => import('./pages/Cart'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<Main />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/post' element={<CartPost />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
