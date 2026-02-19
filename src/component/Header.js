import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from './store';
import styled from 'styled-components';

const CircleBox = styled.div`
    width: 70px;
    height: 70px;
    background-color: #FDA2B9;
    border-radius: 50%;
    margin-right: 20px;
    display: flex; 
    align-items: center;
    justify-content: center;
`;

const CloseBtn = styled(Link)`
    width: 70px;
    height: 70px;
    background-color: #FDA2B9;
    border-radius: 50%;
    display: flex;   
    align-items: center;
    justify-content: center;
`;

export default function Header() {
  const location = useLocation();
  const isMain = location.pathname.startsWith('/main');
  const dispatch = useDispatch();
  return (
    <div style={{width: '1080px', margin: '0 auto'}}>
      <header style={{width: '1080px', height: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        {isMain && (
          <>
            <img src={process.env.PUBLIC_URL + '/images/h_logo.png'} style={{width: '70px', height: '81px', paddingLeft: '24px'}}/>
            <div style={{display: 'flex', paddingRight: '24px'}}>
                <CircleBox>
                    <p style={{color: '#25438A', fontSize: '32px', fontWeight: '600'}}>KR</p>
                </CircleBox>
                <CloseBtn to='/' onClick={() => dispatch(clearCart())}>
                    <img src={process.env.PUBLIC_URL + '/images/main_close.png'} style={{width: '35px', height: '35px'}} />
                </CloseBtn>
            </div>
          </>
        )}
        {!isMain && (
          <Link to='/' onClick={() => dispatch(clearCart())} style={{textAlign: 'center', textDecoration: 'none', color: 'black', marginLeft: '24px'}}>
            <img src={process.env.PUBLIC_URL + '/images/home.png'} style={{width: '50px', height: '50px'}} />
            <p style={{fontSize: '20px'}}>처음으로</p>
          </Link>
        )}
      </header>    
    </div>
  )
}
