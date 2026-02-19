import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainImgBox = styled.div`
    width: 1080px;
    height: 1376px;
    position: relative;
    &::before{
        content: '화면을 터치해주세요!';
        color: black;
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        font-size: 64px;
        font-weight: 600;
    }
`;

export default function WelcomPage() {
  return (
    <div style={{width: '1080px', height: '1920px', margin: '0 auto'}}>
      <Link to='/main/아이스크림'>
        <MainImgBox>
            <img src={process.env.PUBLIC_URL + '/images/banner02.png'} style={{width: '100%', height: '100%', display: 'block'}}/>
        </MainImgBox>
        <img src={process.env.PUBLIC_URL + '/images/banner.png'} style={{width: '1080px', height: '544px', display: 'block'}}  />
      </Link>
    </div>
  )
}
