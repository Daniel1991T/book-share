import PlainStarRating from "./PlainStarRating";
import RatingStar from "./StarRating";

type RatingComponentProps = {
  rate: number;
};

const RatingComponent = ({ rate }: RatingComponentProps) => {
  return (
    <div className="flex items-center justify-center bg-slate-50 rounded-full py-2 px-4 space-x-3">
      <PlainStarRating uniqueId="rating-component" rate={rate} />
      <p className="mt-1 text-2xl font-bold text-como">{rate}</p>
    </div>
  );
};
export default RatingComponent;
