import React from 'react'
import { useState, useMemo } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearCart, deleteItem, setOption } from './store.js';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './swiper.css';

import { Pagination } from 'swiper/modules';

import menu from './data';
import Footer from './Footer.js';
import Modal from './Modal.js';

const MenuTab = styled(NavLink)`
    width: 157px;
    height: 70px;
    color: #244289;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    &.active{
        background-color: #FDA2B9;
        color: white;
        border-radius: 50px;
    }
`;

const MainSlide = styled(SwiperSlide)`
    width: 905px;
    height: 1016px;
    display: grid !important;;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 20px;
`;

const PrevBtn = styled.button`
    width: 40px;
    height: 66px;
    position: absolute;
    top: 30%;
    left: 0;
    transform: translateY(-30%);
    border: none;
    background-color: transparent;
`;

const NextBtn = styled.button`
    width: 40px;
    height: 66px;
    position: absolute;
    top: 30%;
    right: 0;
    transform: translateY(-30%);
    border: none;
    background-color: transparent;
`;

const CartBox = styled.div`
    position: relative;
    width: 211px;
    text-align: center;
    &::before{
        content: '${props => props.$count}';
        position: absolute;
        top: 10px;
        left: 10px;
        width: 45px;
        height: 45px;
        background-color: white;
        border-radius: 50%;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        line-height: 45px;
    }
`;

const CartDeleteBtn = styled.button`
    width: 45px;
    height: 45px;
    border: none;
    background-color: #FDA2B9;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    right: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ConeCupBtn = styled.button`
    background-color: white;
    width: 271px;
    height: 271px;
    border-radius: 50px;
`;

export default function MainPage() {
    const {categoryName} = useParams();
    const [swiper, setSwiper] = useState(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertModal, setIsAlertModal] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    
    const categories = [...new Set(menu.map(menu => menu.category))];
    const currentCategory = categoryName || '아이스크림';
    const filteredItems = menu.filter(item => item.category === currentCategory);
    
    const mainGroup = useMemo(() => {
        const groups =[];
        for(let i = 0; i<filteredItems.length; i += 12){
            groups.push(filteredItems.slice(i, i + 12));
        }
        return groups;
    },[filteredItems]);

    const handleNext = () => {
        if(cart.length === 0){
            setIsAlertModal(true);
            return;
        }

        const coneCupIds = [1, 2, 3, 4];
        const conCupChk = cart.some(item => coneCupIds.includes(item.id) && !item.option);
        const iceCreamChk = cart.some(item => item.category === '아이스크림');
        if(conCupChk){
            setIsModalOpen(true);
        }else if(iceCreamChk){
            navigate('/iceCream');
        }else{
            navigate('/orderChk');
        }
    }

    const handleOption = (selectedOption) => {
        dispatch(setOption(selectedOption));
        setIsModalOpen(false);
        navigate('/iceCream');
    }


  return (
    <div style={{width: '1080px', margin: '40px auto 0', position: 'relative'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {categories.map((category, index) => (
                <MenuTab key={index} to={`/main/${category}`}>
                    {category.split(' ').map((word, i) => (
                        <>
                            {word}
                            <br />
                        </>
                    ))}
                </MenuTab>
            ))}
        </div>
        <>
            <Swiper 
            key={currentCategory}
            onSwiper={(s) => {
                setSwiper(s);
                setIsBeginning(s.isBeginning);
                setIsEnd(s.isEnd);
            }}
            onSlideChange={(s) => {
                setIsBeginning(s.isBeginning);
                setIsEnd(s.isEnd);
            }}
            allowTouchMove={false}
            pagination={true} 
            modules={[Pagination]} 
            className="mainSwiper"
            >
            {mainGroup.map((group, index) => (
                <MainSlide key={index}>
                    {group.map((item) => (
                        <div key={item.id} onClick={() => dispatch(addItem(item))}>
                            <img src={item.img} style={{width: '211px', height: '211px'}} />
                            <p style={{height: '48px', fontSize: '20px', fontWeight: '600', margin: '10px 0'}}>{item.name}</p>
                            <p style={{fontSize: '20px'}}>₩ {item.price.toLocaleString()}</p>
                        </div>
                    ))}
                </MainSlide>
            ))}
            </Swiper>
        </>
        {mainGroup.length > 1 && (
            <div>
                {!isBeginning && (
                    <PrevBtn onClick={()=> swiper?.slidePrev()}>
                        <img src={process.env.PUBLIC_URL + '/images/prev.png'} alt="" />
                    </PrevBtn>
                )}
                {!isEnd && (
                    <NextBtn onClick={()=> swiper?.slideNext()}>
                        <img src={process.env.PUBLIC_URL + '/images/next.png'} alt="" />
                    </NextBtn>
                )}
            </div>
        )}
        <Footer onPrev={() => {dispatch(clearCart()); navigate('/');}} onNext={handleNext}>
            {cart.length === 0 ? (
                <div style={{margin: '0 auto', lineHeight: '364px'}}>
                    <p style={{fontSize: '36px', fontWeight: '600', color: '#FDA2B9'}}>상품을 선택해주세요.</p>
                </div>
            ) : (
                <div style={{display: 'flex', gap: '20px', paddingTop: '10px'}}>
                    {cart.map((cartItem) => (
                        <CartBox key={cartItem.id} $count={cartItem.count}>
                            <CartDeleteBtn onClick={() => dispatch(deleteItem(cartItem.id))}>
                                <img src={process.env.PUBLIC_URL + '/images/main_close.png'} style={{width: '20px', height: '20px'}}/>
                            </CartDeleteBtn>
                            <img src={cartItem.img} style={{width: '211px', height: '211px', backgroundColor: '#EEEEEE', borderRadius: '20px'}} />
                            <p style={{height: '48px', fontSize: '20px', fontWeight: '600', margin: '10px 0'}}>{cartItem.name}</p>
                            <p style={{fontSize: '20px'}}>₩ {cartItem.price.toLocaleString()}</p>
                        </CartBox>
                    ))}
                </div>
            )}
        </Footer>
        {isModalOpen && (
            <Modal title={'콘 / 컵 선택'} confirmText={'취소'} onConfirm={() => setIsModalOpen(false)}>
                <ConeCupBtn onClick={() => handleOption('콘')} style={{marginRight: '20px'}}>
                    <div style={{width: '100%', height: '93px'}}>
                        <img src={process.env.PUBLIC_URL + '/images/cone_icon.png'} style={{width: '80px', height: '93px'}}/>
                    </div>
                    <p style={{fontSize: '36px', marginTop: '10px'}}>콘</p>
                </ConeCupBtn>
                <ConeCupBtn onClick={() => handleOption('컵')}>
                    <div style={{width: '100%', height: '93px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src={process.env.PUBLIC_URL + '/images/cup.png'} style={{width: '100px', height: '53px'}}/>
                    </div>
                    <p style={{fontSize: '36px', marginTop: '10px'}}>컵</p>
                </ConeCupBtn>
            </Modal>
        )}
        {isAlertModal && (
            <Modal title={'알림'} confirmText={'확인'} onConfirm={() => setIsAlertModal(false)}>
                <p style={{fontSize: '40px'}}>상품을 선택해주세요.</p>
            </Modal>
        )}
    </div>
  )
}
