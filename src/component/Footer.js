import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import styled from 'styled-components';

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

export default function Footer({children, onPrev, onNext, nextText="결제하기"}) {
  return (
    <footer className='footer'>
        <Contents vertical={false} hideScrollbars={false}>
            {children}
        </Contents>
        <div style={{display: 'flex', gap: '20px'}}>
            <button className='foPrevBtn' onClick={onPrev}>
                <img src={process.env.PUBLIC_URL + '/images/link_black.png'} style={{width: '42px', height: '42px', position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)'}} />
                이전 화면
            </button>
            <button className='foNextBtn' onClick={onNext}>
                <img src={process.env.PUBLIC_URL + '/images/link.png'} style={{width: '42px', height: '42px', position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)'}}/>
                {nextText}
            </button>
        </div>
    </footer>
  )
}
