"use client"
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { get } from "@/request/client";
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
  const [bannerImages, setBannerImages] = useState([])

  useEffect(() => {
    const getBannerImage = async () => {
      const imageData: any = await get('/api/getbanner')
      setBannerImages(imageData.data.items)
    }
    getBannerImage()
  }, [])

  const onChange = (currentSlide: number) => {
    //console.log('currentSlide:', currentSlide);
  };

  return (
    <div className='carousel-wrapper'>
      <Carousel afterChange={onChange} autoplay >
        {
          bannerImages.map((item, idx) => {
            const {pic} = item
            return <div key={idx}>
              <div className="banner-item" style={{ backgroundImage: `url(${pic}?imageView2/2/w/3200)` }}></div>
            </div>
          })
        }
      </Carousel>
    </div>
  );
};

export default App;