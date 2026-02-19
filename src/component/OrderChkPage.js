import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, deleteItem, subCount } from './store';
import styled from 'styled-components';

import Footer from './Footer';

const OrderContainer = styled.div`
  width: 1080px; 
  height: 972px; 
  margin: 0 auto 20px;
  overflow-y : auto;
  padding-bottom: 20px;
  &::-webkit-scrollbar{
      width: 20px;    
      display: block !important; 
  }
  &::-webkit-scrollbar-thumb{
      background: #FDA2B9;
      border-radius: 20px;
  }
`;

const OrderBox = styled.div`
  width: 992px;
  margin: 20px auto 0;
  border-bottom: 1px solid #BDBDBD;
  padding-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CountBtn = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid #BDBDBD;
  background-color: white;
  font-size: 30px;
  text-align: center;
  line-height: 50px;
`;

const CountNum = styled.div`
  width: 70px;
  height: 50px;
  font-size: 24px;
  font-weight: 400;
  border-top: 1px solid #BDBDBD;
  border-bottom: 1px solid #BDBDBD;
  box-sizing: border-box;
  text-align: center;
  line-height: 50px;
`;


export default function OrderChkPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.count), 0);
  return (
    <div style={{width: '1080px', margin: '40px auto 0', position: 'relative'}}>
      <ul className='navMenuBox' style={{width: '1032px', height: '70px', display: 'flex', margin: '0 24px 20px', gap: '20px'}}>
          <li>메뉴 선택</li>
          <li className='navMenuChk'>주문 확인</li>
          <li>할인</li>
          <li>결제</li>
      </ul>
      <div style={{fontSize: '36px', fontWeight: '600', borderBottom: '1px solid #244289', paddingBottom: '40px', margin: '0 24px 20px'}}>주문 내용을 확인해주세요.</div>
      <OrderContainer>
        {cart.map((item, index) => (
          <OrderBox key={index}>
            <img src={item.img} style={{width: '170px', height: '170px'}}/>
            <div style={{width: '513px'}}>
              <p style={{fontSize: '28px', fontWeight: '600'}}>{item.name}</p>
                {item.selectedFlavors && item.selectedFlavors.length > 0 && (
                  <div style={{display: 'flex',flexWrap: 'wrap', gap: '10px', marginTop: '20px'}}>
                    {item.selectedFlavors.map((flavor, index) => (
                      <div key={index} style={{padding: '10px 15px', border: '1px solid #BDBDBD', borderRadius: '50px', fontSize: '20px'}}>
                          {flavor.name}
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <div style={{width: '279px'}}>
              <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <CountBtn onClick={() => dispatch(subCount(item.id))}>-</CountBtn>
                  <CountNum>{item.count}</CountNum>
                  <CountBtn onClick={() => dispatch(addCount(item.id))}>+</CountBtn>
                </div>
                <img src={process.env.PUBLIC_URL + '/images/main_close.png'} onClick={() => dispatch(deleteItem(item.id))} style={{width: '35px', height: '35px'}} />
              </div>
              <p style={{fontSize: '32px', fontWeight: '600', textAlign: 'end', transform: 'translateY(40px)'}}>₩ {item.price.toLocaleString()}</p>
            </div>
          </OrderBox>
        ))}
      </OrderContainer>
      <Footer onPrev={() => navigate('/main/아이스크림')} nextText={"카드결제 / 일반결제"} onNext={() => navigate('/discount')}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <p style={{fontSize: '28px', fontWeight: '500'}}>주문금액 ₩ {totalPrice.toLocaleString()}</p>
          <p style={{fontSize: '28px', fontWeight: '400', margin: '0 25px'}}>-</p>
          <p style={{fontSize: '28px', fontWeight: '500'}}>할인금액 ₩ 0</p>
          <p style={{fontSize: '28px', fontWeight: '400', margin: '0 25px'}}>=</p>
          <div>
            <p style={{fontSize: '28px', fontWeight: '500'}}>총 상품금액</p>
            <p style={{fontSize: '36px', fontWeight: '500', float: 'right'}}>₩ {totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </Footer>
    </div>
  )
}
