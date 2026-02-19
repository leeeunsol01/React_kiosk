import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { clearCart, clearPoint } from './store';
import Footer from './Footer';
import Modal from './Modal';

const PointBtn = styled.button`
    border: 1px solid #6E6E6E;
    border-radius: 20px;
    background-color: white;
    width: 506px;
    height: 506px;
`;

export default function PayPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const point = useSelector((state) => state.point);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.count), 0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCashModal, setIsCashModal] = useState(false);

    const handlePayCancel = () => {
        dispatch(clearCart());
        dispatch(clearPoint());
        navigate('/')
    };

    const handleCardConfirm = () => {
        setIsModalOpen(false);
        dispatch(clearCart());
        dispatch(clearPoint());
        navigate('/');
    }

    const handleCashConfirm = () => {
        setIsCashModal(false);
        dispatch(clearCart());
        dispatch(clearPoint());
        navigate('/');
    };
  return (
    <div style={{width: '1080px', margin: '40px auto 0', position: 'relative'}}>
      <ul className='navMenuBox'>
            <li>메뉴 선택</li>
            <li>주문 확인</li>
            <li>할인</li>
            <li className='navMenuChk'>결제</li>
        </ul>
        <div style={{fontSize: '36px', fontWeight: '600', borderBottom: '1px solid #244289', paddingBottom: '40px', margin: '0 24px'}}>할인 / 적립 수단을 선택해주세요.</div>
        <div style={{height: '1032px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
            <PointBtn onClick={() => setIsModalOpen(true)}>
                <img src={process.env.PUBLIC_URL + '/images/card.png'} style={{width: '120px', height: '130px'}} />
                <p style={{fontSize: '36px', fontWeight: '500'}}>신용카드 / 삼성페이</p>
            </PointBtn>
            <PointBtn onClick={() => setIsCashModal(true)}>
                <p style={{fontSize: '48px', fontWeight: '500'}}>현금 결제</p>
            </PointBtn>
        </div>
        <Footer onPrev={() => navigate('/discount')} nextText='결제취소' onNext={handlePayCancel}>
            <div style={{width: '100%', height: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                    <div style={{width: '488px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p style={{fontSize: '28px', fontWeight: '500'}}>주문금액</p>
                        <p style={{fontSize: '28px', fontWeight: '500'}}>₩ {totalPrice.toLocaleString()}</p>
                    </div>
                    <p style={{fontSize: '28px', fontWeight: '400', margin: '0 25px'}}>-</p>
                    <div style={{width: '488px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p style={{fontSize: '28px', fontWeight: '500'}}>할인금액</p>
                        <p style={{fontSize: '28px', fontWeight: '500'}}>₩ {point.toLocaleString()}</p>
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <div>
                        <p style={{fontSize: '28px', fontWeight: '500'}}>총 상품금액</p>
                        <p style={{fontSize: '36px', fontWeight: '500', float: 'right'}}>₩ {(totalPrice - point).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </Footer>
        {isModalOpen && (
            <Modal title={'신용카드 / 삼성페이 결제'} confirmText={'확인'} onConfirm={handleCardConfirm}>
                <div>
                    <div style={{backgroundColor: '#EEEEEE', display: 'flex', alignItems: 'center', padding: '30px 40px', borderRadius: '20px', gap: '80px'}}>
                        <p style={{fontSize: '32px', fontWeight: '600'}}>총 결제 금액</p>
                        <p style={{fontSize: '32px', fontWeight: '600'}}>₩ {(totalPrice - point).toLocaleString()}</p>
                    </div>
                    <div style={{textAlign: 'center', fontSize: '40px', marginTop: '40px'}}>결제가 완료되었습니다.</div>
                </div>
            </Modal>
        )}
        {isCashModal && (
            <Modal title={'현금 결제'} confirmText={'확인'} onConfirm={handleCashConfirm}>
                <p style={{fontSize: '40px'}}>카운터에서 결제를 부탁드립니다.</p>
            </Modal>
        )}
    </div>
  )
}
