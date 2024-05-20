"use client"
import React from 'react';
import { Carousel } from 'antd';
import './page.css'


const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log('currentSlide:', currentSlide);
  };
  
  return (
    <div className='carousel-wrapper'>
      <Carousel afterChange={onChange} autoplay arrows>
        <div>
          <div className="banner-item" style={{ backgroundImage: "url(https://cc.hjfile.cn/cc/img/20240430/2024043008080623660074.jpg?imageView2/2/w/3200)" }}></div>
        </div>
        <div>
        <div className="banner-item" style={{ backgroundImage: "url(https://cc.hjfile.cn/cc/img/20240403/2024040306471124668985.png?imageView2/2/w/3200)" }}></div>
        </div>
      </Carousel>
    </div>
  );
};

export default App;