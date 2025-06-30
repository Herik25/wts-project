import React, { useEffect, useState } from 'react'

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';


function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className=' mt-[60px]'>
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={isMobile ? 1 : 3}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><Link to='/all-products'><img className=' h-[400px] min-w-full lg:h-[500px] xl:h-[500px]' src='https://images.bewakoof.com/uploads/grid/app/1x1-Banner--3--1707200079.gif' /></Link></SwiperSlide>
      <SwiperSlide><Link to='/all-products'><img className=' h-[400px] min-w-full lg:h-[500px] xl:h-[500px]' src='https://images.bewakoof.com/uploads/grid/app/Feb-1x1-Shirts-3-1707303638.jpg' /></Link></SwiperSlide>
      <SwiperSlide><Link to='/all-products'><img className=' h-[400px] min-w-full lg:h-[500px] xl:h-[500px]' src='https://images.bewakoof.com/uploads/grid/app/Urban-cargo-Joggers-Common-1x1-banner-1707280995.jpg' /></Link></SwiperSlide>
      <SwiperSlide><Link to='/all-products'><img className=' h-[400px] min-w-full lg:h-[500px] xl:h-[500px]' src='https://images.bewakoof.com/uploads/grid/app/BAGGY-JEANS-IK-RM-1x1-Banner-1707301356.gif' /></Link></SwiperSlide>
    </Swiper>
    </div>
  )
}

export default Header