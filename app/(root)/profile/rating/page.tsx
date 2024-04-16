import RatingComponent from "@/components/Rating";
import ReviewCard from "@/components/cards/ReviewCard";

export const dynamic = "force-dynamic";

const Rating = async () => {
  return (
    <div className="flex flex-col w-full  items-center max-w-lg mx-auto justify-center">
      <RatingComponent rate={5} />
      <div className="w-full flex-col flex gap-2">
        <h2 className="text-lg font-semibold">Reviews</h2>
        <ReviewCard
          fullName="Tifui Daniel"
          imageAvatar=""
          posteAt="12 Dec 2021"
          review="Nice book"
          reviewRate={4}
        />
      </div>
    </div>
  );
};
export default Rating;
