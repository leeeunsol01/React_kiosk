import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { clearPoint, setPoint } from './store';
import Footer from './Footer';
import Modal from './Modal';

const NavMenu = styled.li`
    width: 243px;
    color: #244289;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    line-height: 70px;
    position: relative;
    &::before{
        content: '';
        position: absolute;
        top: 50%;
        right: -20px;
        transform: translateY(-50%);
        background-image: url(${process.env.PUBLIC_URL + '/images/arrow.png'});
        width: 20px;
        height: 33px;
    }
    &:last-child::before{
        content: none;
    }
`;

const NavMenuChk = styled(NavMenu)`
    background-color: #FDA2B9;
    border-radius: 50px;
    color: white;
`;

const PointBtn = styled.button`
    border: 1px solid #6E6E6E;
    border-radius: 20px;
    background-color: white;
    width: 506px;
    height: 506px;
`;

const NumInput = styled.div`
    width: 408px;
    height: 75px;
    border-bottom: 1px solid #244289;
    padding-bottom: 10px;
    font-size: 52px;
    font-weight: 500;
    margin-bottom: 70px;
    text-align: center;
`;

const NumBtn = styled.button`
    width: 120px;
    height: 120px;
    border: 1px solid #FDA2B9;
    background-color: white;
    border-radius: 50%;
    color: #F8008A;
    font-size: 52px;
    font-weight: 500;
    text-align: center;
    line-height: 120px;
    margin-right: 20px;
    margin-bottom: 40px;
    &:nth-child(3n){
        margin-right: 0;
    }
`;

export default function DiscountPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.count), 0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [num, setNum] = useState('');
    const [isPointModal, setIsPointModal] = useState(false);
    const [userPoint, setUserPoint] = useState(0);
    const [appliedPoint, setAppliedPoint] = useState(0);
    const [isAlertModal, setIsAlertModal] = useState(false);

    const handleNumClick = (valuse) => {
        if(num.length + valuse.length >= 12) return;
        setNum(prev => prev + valuse);
    };

    const handleNumRemove = () => {
        setNum(prev => prev.slice(0, -1));
    };
    
    const formatNum = (string) => {
        if(string.length <= 3) return string;
        if(string.length <= 7) return `${string.slice(0, 3)}-${string.slice(3)}`;
        return `${string.slice(0, 3)}-${string.slice(3, 7)}-${string.slice(7)}`;
    };

    const handleCancel = () => {
        setNum('');
        setIsModalOpen(false);
    }

    const handleConfirm = () => {
        if(num.length !== 11){
            setIsAlertModal(true);
            return;
        }
        const randomPoint = (Math.floor(Math.random() * 7) * 500) + 1000;

        setNum('');
        setIsModalOpen(false);
        setIsPointModal(true);
        setUserPoint(randomPoint)
    };

    const handlUsePoint = () => {
        dispatch(setPoint(userPoint));
        setAppliedPoint(userPoint);
        setIsPointModal(false);
    };

    const handleRemovePoint = () => {
        dispatch(clearPoint());
        setAppliedPoint(0);
        setUserPoint(0);
    }
    
  return (
    <div style={{width: '1080px', margin: '40px auto 0', position: 'relative'}}>
        <ul style={{width: '1032px', height: '70px', display: 'flex', margin: '0 24px 20px', gap: '20px'}}>
            <NavMenu>메뉴 선택</NavMenu>
            <NavMenu>주문 확인</NavMenu>
            <NavMenuChk>할인</NavMenuChk>
            <NavMenu>결제</NavMenu>
        </ul>
        <div style={{fontSize: '36px', fontWeight: '600', borderBottom: '1px solid #244289', paddingBottom: '40px', margin: '0 24px'}}>할인 / 적립 수단을 선택해주세요.</div>
        <div style={{height: '1032px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
            <PointBtn onClick={() => setIsModalOpen(true)}>
                <img src={process.env.PUBLIC_URL + '/images/happy.png'} style={{width: '80px', height: '125px'}} />
                <p style={{fontSize: '36px', fontWeight: '500'}}>해피포인트</p>
            </PointBtn>
            <PointBtn onClick={() => {handleRemovePoint(); navigate('/pay');}}>
                <p style={{fontSize: '36px', fontWeight: '500'}}>포인트 사용안함</p>
            </PointBtn>
        </div>
        <Footer onPrev={() => navigate('/orderChk')} onNext={() => navigate('/pay')}>
            <div style={{width: '100%', height: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                    <p style={{fontSize: '28px', fontWeight: '500'}}>해피포인트</p>
                    <p style={{width: '500px', fontSize: '28px', fontWeight: '500'}}>{appliedPoint.toLocaleString()}P</p>
                    <img src={process.env.PUBLIC_URL + '/images/main_close.png'} onClick={handleRemovePoint} style={{width: '35px', height: '35px'}} />
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <p style={{fontSize: '28px', fontWeight: '500'}}>주문금액 ₩ {totalPrice.toLocaleString()}</p>
                    <p style={{fontSize: '28px', fontWeight: '400', margin: '0 25px'}}>-</p>
                    <p style={{fontSize: '28px', fontWeight: '500'}}>할인금액 ₩ {appliedPoint.toLocaleString()}</p>
                    <p style={{fontSize: '28px', fontWeight: '400', margin: '0 25px'}}>=</p>
                    <div>
                        <p style={{fontSize: '28px', fontWeight: '500'}}>총 상품금액</p>
                        <p style={{fontSize: '36px', fontWeight: '500', float: 'right'}}>₩ {(totalPrice - appliedPoint).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </Footer>
        {isModalOpen && (
            <Modal title={'휴대폰 번호 입력'} cancelText={'취소'} onCancel={handleCancel} confirmText={'확인'} onConfirm={handleConfirm}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <NumInput>
                        {formatNum(num)}
                    </NumInput>
                    <div style={{width: '400px', height: '601px', display: 'flex', flexWrap: 'wrap'}}>
                        {Array.from({length: 9}, (_, i) => (
                            <NumBtn key={i + 1} onClick={() => handleNumClick(String(i + 1))}>
                                {i + 1}
                            </NumBtn>
                        ))}
                        <NumBtn onClick={() => handleNumClick('010')}>010</NumBtn>
                        <NumBtn onClick={() => handleNumClick('0')}>0</NumBtn>
                        <NumBtn onClick={handleNumRemove}>
                            <img src={process.env.PUBLIC_URL + '/images/numback.png'} style={{width: '63px', height: '40px'}}/>
                        </NumBtn>
                    </div>
                </div>
            </Modal>
        )}
        {isPointModal && (
            <Modal title={'포인트'} confirmText={'사용'} onConfirm={handlUsePoint}>
                <div style={{textAlign: 'center'}}>
                    <p style={{fontSize: '40px'}}>해피포인트</p>
                    <p style={{fontSize: '40px'}}>{userPoint.toLocaleString()}P가 있습니다.</p>
                </div>
            </Modal>
        )}
        {isAlertModal && (
            <Modal title={'알림'} confirmText={'확인'} onConfirm={() => setIsAlertModal(false)}>
                <div style={{textAlign: 'center'}}>
                    <p style={{fontSize: '40px'}}>휴대폰 번호를</p>
                    <p style={{fontSize: '40px'}}>11자리로 입력해주세요.</p>
                </div>
            </Modal>
        )}
    </div>
  )
}
