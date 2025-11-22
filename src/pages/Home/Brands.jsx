import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazonImg from "../../assets/brands/amazon.png";
import amazonVictorImg from "../../assets/brands/amazon_vector.png";
import casioImg from "../../assets/brands/casio.png";
import moonstarImg from "../../assets/brands/moonstar.png";
import ranstadImg from "../../assets/brands/randstad.png";
import starImg from "../../assets/brands/star.png";
import startProple from "../../assets/brands/start_people.png";
import { Autoplay } from 'swiper/modules';

const brandLogos = [amazonImg,amazonVictorImg,casioImg,moonstarImg,ranstadImg,starImg,startProple];

const Brands = () => {
  return (
    <div className="py-22">
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {
          brandLogos.map((logo,idx) => <SwiperSlide key={idx}><img src={logo} /></SwiperSlide>)
        }
      </Swiper>
    </div>
  );
};

export default Brands;
