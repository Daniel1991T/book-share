"use client";
import React from "react";

type StarRatingProps = {
  rate: number;
  setRate: (rate: number) => void;
};

const StarRating = ({ rate, setRate }: StarRatingProps) => {
  return (
    <div className="rating flex flex-row-reverse justify-end space-x-reverse space-x-1">
      {[...Array(5)].map((_, i) => {
        const ratingValue = 5 - i;
        return (
          <React.Fragment key={ratingValue}>
            <input
              type="radio"
              name="rate"
              id={`star${ratingValue}`}
              value={ratingValue}
              checked={rate === ratingValue}
              onChange={() => {
                console.log(ratingValue);
                setRate(ratingValue);
              }}
              className="form-radio h-5 w-5"
            />
            <label
              htmlFor={`star${ratingValue}`}
              className="text-3xl cursor-pointer"
              title={`${ratingValue} stars`}
            ></label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StarRating;
