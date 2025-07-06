"use client";
import React, { useState } from "react";

const RatingBar = ({
  rating = 0,
  maxRating = 5,
  onRatingChange,
  readonly = false,
  size = "md",
  className = "",
  ...props
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    xs: "w-3 h-3 sm:w-4 sm:h-4",
    sm: "w-4 h-4 sm:w-5 sm:h-5",
    md: "w-5 h-5 sm:w-6 sm:h-6",
    lg: "w-6 h-6 sm:w-7 sm:h-7",
    xl: "w-7 h-7 sm:w-8 sm:h-8",
  };

  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div
      className={`flex items-center gap-1 sm:gap-2 ${className}`}
      role="img"
      aria-label={`Rating: ${rating} out of ${maxRating} stars`}
      {...props}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hoverRating || rating);

        return (
          <button
            key={index}
            type="button"
            className={`
              ${sizes[size]}
              transition-all duration-200 ease-in-out
              ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
              rounded-sm
            `}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            aria-label={`Rate ${starValue} star${starValue !== 1 ? "s" : ""}`}
          >
            <svg
              className={`
                w-full h-full
                ${isActive ? "text-yellow-400" : "text-gray-300"}
                transition-colors duration-200
              `}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default RatingBar;
