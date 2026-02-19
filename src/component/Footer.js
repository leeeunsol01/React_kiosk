import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import styled from 'styled-components';

const FooterBox = styled.div`
    width: 1032px;
    height: 553px;
    margin: 0 auto;
    border-top: 1px solid #244289;
    background-color: white;
    position: relative;
`;

const Contents = styled(ScrollContainer)`
    width: calc(100% - 48px);
    height: 364px;
    display: flex;
    margin: 30px 24px 40px;
    overflow-x: auto !important; 
    padding-bottom: 20px;
    &::-webkit-scrollbar{
        height: 30px;      
        display: block !important; 
    }
    &::-webkit-scrollbar-thumb{
        background: #FDA2B9;
        border-radius: 20px;
    }
`;

const PrevBtn = styled.button`
    background-color: white;
    width: 375px;
    height: 80px;
    border-radius: 50px;
    font-size: 36px;
    line-height: 80px;
    position: relative;
    &:active{
        background-color: #EEEEEE;
    }
`;

const NextBtn = styled.button`
    width: 637px;
    height: 80px;
    background-color: #BDBDBD;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 36px;
    line-height: 80px;
    position: relative;
    &:active{
        background-color: #FDA2B9;
    }
`;


export default function Footer({children, onPrev, onNext, nextText="결제하기"}) {
  return (
    <FooterBox>
        <Contents vertical={false} hideScrollbars={false}>
            {children}
        </Contents>
        <div style={{display: 'flex', gap: '20px'}}>
            <PrevBtn onClick={onPrev}>
                <img src={process.env.PUBLIC_URL + '/images/link_black.png'} style={{width: '42px', height: '42px', position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)'}} />
                이전 화면
            </PrevBtn>
            <NextBtn onClick={onNext}>
                <img src={process.env.PUBLIC_URL + '/images/link.png'} style={{width: '42px', height: '42px', position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)'}}/>
                {nextText}
            </NextBtn>
        </div>
    </FooterBox>
  )
}
