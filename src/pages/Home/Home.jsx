import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import OurService from './OurService';
import Brands from './Brands';
import SupportRelated from './SupportRelated';
import MerchantInfo from './MerchantInfo';
import Reviews from './Reviews/Reviews';
import FAQSection from './FAQSection';


const reviewsData = fetch('/reviews.json').then(res=>res.json())

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurService></OurService>
      <Brands></Brands>
      <SupportRelated></SupportRelated>
      <MerchantInfo></MerchantInfo>
      <Reviews reviewsData={reviewsData}></Reviews>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;