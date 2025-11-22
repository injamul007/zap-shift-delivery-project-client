import React from "react";
import reviewQuoteImg from "../../../assets/reviewQuote.png";

const ReviewCard = ({ review }) => {
  const {userName,user_photoURL, review: testimonial} = review || {};
  return (
    <div className="max-w-sm bg-base-100 shadow-lg rounded-xl p-6 border border-gray-200">
      {/* Quote Icon */}
      <img src={reviewQuoteImg} alt="" />

      {/* Review Text */}
      <p className="mb-4">{testimonial}</p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-4"></div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary">
          <img src={user_photoURL} alt="" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{userName}</h3>
          <p className="text-sm text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
