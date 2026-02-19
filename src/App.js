// import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './component/Header';
import WelcomPage from './component/WelcomPage';
import MainPage from './component/MainPage';
import IceCreamPage from './component/IceCreamPage';
import OrderChkPage from './component/OrderChkPage';
import DiscountPage from './component/DiscountPage';
import PayPage from './component/PayPage';

function App() {
  const isWelcomePage = useLocation().pathname === '/';
  return (
    <div className="App">
      {!isWelcomePage && <Header/>}
      <Routes>
        <Route path='/' element={<WelcomPage />}/>
        <Route path='/main/:categoryName' element={<MainPage />}/>
        <Route path='/iceCream' element={<IceCreamPage />}/>
        <Route path='/orderChk' element={<OrderChkPage />}/>
        <Route path='/discount' element={<DiscountPage />}/>
        <Route path='/pay' element={<PayPage />} />
      </Routes>
    </div>
  );
}

export default App;
