import React from "react";

const PlainStarRating = ({
  rate,
  uniqueId: uniqueName,
}: {
  rate: number;
  uniqueId: string;
}) => {
  return (
    <div
      className={`flex flex-row-reverse justify-end space-x-reverse space-x-1 rating-not-changeable`}
    >
      {[...Array(5)].map((_, i) => {
        const ratingValue = 5 - i;
        return (
          <React.Fragment key={ratingValue}>
            <input
              type="radio"
              name="rate"
              id={`star-${uniqueName}${ratingValue}`}
              value={ratingValue}
              defaultChecked={rate === ratingValue}
              className="form-radio h-5 w-5"
            />
            <label
              htmlFor={`star-${uniqueName}${ratingValue}`}
              className={`text-3xl ${
                rate >= ratingValue ? "!text-[#ffa723]" : "text-gray-300"
              }`}
              title={`${ratingValue} stars`}
            ></label>
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default PlainStarRating;
