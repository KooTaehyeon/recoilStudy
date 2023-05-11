import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './component/Layout/DefaultLayout';
import { Suspense, lazy } from 'react';
import Main from './pages/Main';

const Navbar = lazy(() => import('./component/Navigation/Navbar'));
const Cart = lazy(() => import('./pages/Cart'));
const CardPost = lazy(() => import('./pages/CardPost'));
const Loading = lazy(() => import('./component/loading'));
const CardDetail = lazy(() => import('./pages/CardDetail'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<Main />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/post' element={<CardPost />} />
            <Route path='/detail' element={<CardDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
