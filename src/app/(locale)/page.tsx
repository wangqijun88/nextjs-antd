"use client"
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { get } from "@/request/client";
import './page.css'
const items =  [
      {
          "activityId": 938,
          "activityTitle": "CCtalk创享家|专访俄语教学领域大咖——俄语邦",
          "activityUrl": "https://mp.weixin.qq.com/s/Gl7JpR6uX1rGJF3hSKuuvw",
          "pic": "https://cc.hjfile.cn/cc/img/20240430/2024043008080623660074.jpg"
      },
      {
          "activityId": 916,
          "activityTitle": "关于结算款进度同步及未来规划的公告",
          "activityUrl": "https://www.cctalk.com/faq/100832",
          "pic": "https://cc.hjfile.cn/cc/img/20240403/2024040306471124668985.png"
      }
  ]

type itemInfo={
  activityId:number,
  activityTitle:string,
  activityUrl:string,
  pic:string,
}

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => {
  const [bannerImages, setBannerImages] = useState<itemInfo[]>([])

  useEffect(() => {
    const getBannerImage = async () => {
      try{
        const imageData: any = await get('/api/getbanner')
        setBannerImages(imageData.data.items)
      }catch(err){
        setBannerImages(items)
      }
     
    }
    getBannerImage()
  }, [])

  const onChange = (currentSlide: number) => {
    //console.log('currentSlide:', currentSlide);
  };

  return (
    <div className='page-wrapper'>
      <div className='w-full h-36 bg-white rounded-md mb-3'></div>
      <div className='carousel-wrapper'>
        <Carousel afterChange={onChange} autoplay >
          {
            bannerImages.map((item, idx) => {
              const { pic } = item
              return <div key={idx}>
                <div className="banner-item" style={{ backgroundImage: `url(${pic}?imageView2/2/w/3200)` }}></div>
              </div>
            })
          }
        </Carousel>
      </div>
      <div className='w-full h-36 bg-white rounded-md mb-3'></div>
      <div className='w-full h-36 bg-white rounded-md mb-3'></div>
      <div className='w-full h-36 bg-white rounded-md mb-3'></div>
      <div className='w-full h-36 bg-white rounded-md mb-3'></div>
      <div className='w-full h-36 bg-white rounded-md mb-3'></div>
      <div className='w-full h-36 bg-white rounded-md mb-3'></div>
      <div className='w-full h-36 bg-white rounded-md mb-3'></div>
    </div>
  );
};

export default App;