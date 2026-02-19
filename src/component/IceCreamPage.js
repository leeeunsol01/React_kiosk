// IceCreamPage.js
import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { updateFlavor, removeFlavor, resetFlavor } from './store.js';
import styled from 'styled-components';

import 'swiper/css';
import 'swiper/css/pagination';

import './swiper.css';

import { Pagination } from 'swiper/modules';

import iceCream from './iceCremaData';
import Footer from './Footer';

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

const SidePanel = styled.div`
    width: 243px;
    height: 610px;
    background-color: #EEEEEE;
    border-radius: 34px;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`;

const NavSubMenu = styled(NavLink)`
    width: 243px;
    height: 70px;
    text-decoration: none;
    color: #244289;
    text-align: center;
    line-height: 70px;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    ${props => props.$active && `
        background-color: white;
        border: 2px solid #FDA2B9;
        box-sizing: border-box;
        border-radius: 50px;
    `}
    &:last-child{
        margin-bottom: 0;
    }
`;

const ProductSlid = styled(SwiperSlide)`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 20px;
`;

const PrevBtn = styled.button`
    width: 40px;
    height: 66px;
    position: absolute;
    top: 30%;
    left: 263px;
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
        right: 10px;
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

const FlavorBox = styled.div`
    height: calc(211px - 74px);
    border: 3px dashed #BDBDBD;
    border-radius: 20px;
    padding: 37px 10px;
    display: flex;
    gap: 20px;
`;

const CartDeleteBtn = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    background-color: #FDA2B9;
    border-radius: 50%;
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;


export default function IceCreamPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [swiper, setSwiper] = useState(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const [selectSub, setSelectSub] = useState('전체');
    const subCategorise = useMemo(() => {
        const iceCreams = [...new Set(iceCream.map(item => item.category))];
        return['전체', ...iceCreams];
    }, []);

    const filteredItems = useMemo(() => {
        return iceCream.filter(item => selectSub === '전체' ? true : item.category === selectSub);
    }, [selectSub]);

    const subGroup = [];
    for (let i = 0; i < filteredItems.length; i += 16) {
        subGroup.push(filteredItems.slice(i, i + 16));
    }

    const selectedOption = cart.filter(item => item.category === '아이스크림');
    
    const [activeMenuId, setActiveMenuId] = useState(null);
    const getNextIncompleteId = () => {
        const incompleteItem = selectedOption.find(item => (item.selectedFlavors?.length || 0) < item.flavor);
        return incompleteItem ? incompleteItem.id : null;
    }

    useEffect(() => {
        if(!activeMenuId && selectedOption.length > 0){
            setActiveMenuId(getNextIncompleteId());
        }
    }, [selectedOption, activeMenuId]);

    const handleFlavorClick = (flavor) => {
        let targetId = activeMenuId || getNextIncompleteId();
        if(targetId){
            const targetItem = selectedOption.find(item => item.id === targetId);
            dispatch(updateFlavor({id:targetId, selectedFlavor: flavor}));
            if(targetItem && (targetItem.selectedFlavors?.length || 0) + 1 >= targetItem.flavor){
                setTimeout(() => {
                    const nextId = selectedOption.find(item => item.id !== targetId && (item.selectedFlavors?.length || 0) < item.flavor
                )?.id;
                setActiveMenuId(nextId || null);
                }, 100);
            }
        }
    };

    const handleNext = () => {
        const isAllSelected = selectedOption.every(
            item => (item.selectedFlavors?.length || 0) === item.flavor
        );
        if(isAllSelected){
            navigate('/orderChk');
        }
    }


    return (
        <div style={{width: '1080px', margin: '40px auto 0', position: 'relative'}}>
            <ul style={{width: '1032px', height: '70px', display: 'flex', margin: '0 24px 40px', gap: '20px'}}>
                <NavMenuChk>메뉴 선택</NavMenuChk>
                <NavMenu>주문 확인</NavMenu>
                <NavMenu>할인</NavMenu>
                <NavMenu>결제</NavMenu>
            </ul>
            <div style={{display: 'flex'}}>
                <SidePanel>
                    {subCategorise.map((item, index) => (
                        <NavSubMenu key={index} $active={selectSub === item} onClick={() => setSelectSub(item)}>
                            {item}
                        </NavSubMenu>
                    ))}
                </SidePanel>
                <>
                    <Swiper 
                    key={subGroup}
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
                    className="subSwiper"
                    >
                    {subGroup.map((group, index) => (
                        <ProductSlid key={index}>
                            {group.map((item) => (
                                <div key={item.id} onClick={() => handleFlavorClick(item)}>
                                    <img src={item.img} style={{width: '155px', height: '155px'}} />
                                    <p style={{height: '48px', fontSize: '20px', fontWeight: '600', margin: '10px 0'}}>{item.name}</p>
                                </div>
                            ))}
                        </ProductSlid>
                    ))}
                    </Swiper>
                    {subGroup.length > 1 && (
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
                </>
            </div>

            <Footer onPrev={() => {dispatch(resetFlavor()); navigate('/main/아이스크림');}} nextText={'결제하기'} onNext={handleNext}>
                <div style={{display: 'flex', gap: '20px', paddingTop: '10px'}}>
                    {selectedOption.map((cartItem) => (
                        <>
                            <CartBox key={cartItem.id} $count={cartItem.count}>
                                <img src={cartItem.img} style={{width: '211px', height: '211px', backgroundColor: '#EEEEEE', borderRadius: '20px'}} />
                                <p style={{height: '48px', fontSize: '20px', fontWeight: '600', margin: '10px 0'}}>{cartItem.name}</p>
                                <p style={{fontSize: '20px'}}>₩ {cartItem.price.toLocaleString()}</p>
                            </CartBox>
                            <div style={{height: '313px'}}>
                                <FlavorBox>
                                    {cartItem.selectedFlavors && cartItem.selectedFlavors.length > 0 ? (
                                        cartItem.selectedFlavors.map((flavor, index) => (
                                            <div key={index} style={{width: '112px', textAlign: 'center', position: 'relative'}}>
                                                <CartDeleteBtn onClick={() => dispatch(removeFlavor({cartId: cartItem.id, flavorIndex: index}))}>
                                                    <img src={process.env.PUBLIC_URL + '/images/main_close.png'} style={{width: '20px', height: '20px'}}/>
                                                </CartDeleteBtn>
                                                <img src={flavor.img} style={{width: '112px', height: '112px'}}/>
                                                <p style={{fontSize: '14px', fontWeight: '600'}}>{flavor.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{color: '#FDA2B9', fontSize: '20px', display:'flex', alignItems: 'center', margin: '0 auto'}}>맛을 선택해주세요</div>
                                    )}
                                </FlavorBox>
                                <div style={{display: 'flex'}}>
                                    {Array.from({length: cartItem.flavor}).map((_, i) => (
                                        <div key={i}>
                                            {cartItem.option === '콘' && (
                                                <img src={process.env.PUBLIC_URL + '/images/cone_icon.png'} style={{width: '73px', height: '85px',padding: '0 20px', margin: '15px 10px 0'}} />
                                            )}
                                            {cartItem.option === '컵' && (
                                                <img src={process.env.PUBLIC_URL + '/images/cup.png'} style={{width: '94px', height: '50px', padding: '0 9px', margin: '15px 10px 0'}} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </Footer>
        </div>
    );
}