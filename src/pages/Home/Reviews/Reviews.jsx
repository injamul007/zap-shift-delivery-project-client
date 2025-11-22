import React, { Suspense, use } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import customersTopImg from "../../../assets/customer-top.png";

const Reviews = ({ reviewsData }) => {
  const reviews = use(reviewsData);

  return (
    <>
      <div>
        <img className="mx-auto" src={customersTopImg} alt="" />
        <h2 className="text-3xl text-center font-bold my-6">
          What our customers are sayings
        </h2>
        <p className="text-center max-w-3xl mx-auto mb-6 text-gray-500 font-semibold">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div className="mb-22">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={true}
          modules={[Autoplay, EffectCoverflow]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Reviews;
