import RatingComponent from "@/components/Rating";
import ReviewCard from "@/components/cards/ReviewCard";
import NoResult from "@/components/shared/NoResult";
import { getReviewOfUserClerkId } from "@/lib/actions/rating.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Rating = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const reviews = await getReviewOfUserClerkId(userId);
  return (
    <div className="flex flex-col w-full  items-center max-w-lg mx-auto justify-center">
      <RatingComponent rate={5} />
      <div className="w-full flex-col flex gap-2">
        <h2 className="text-lg font-semibold">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={review._id + index} reviewItem={review} />
          ))
        ) : (
          <NoResult
            title="No Reviews yet!"
            description="Welcome to our Book Reviews Corner! Here, you can discover what readers are saying about the books shared by our users. If there are no reviews for a particular book yet, don't fret—new reviews are always on the horizon. Keep exploring and sharing your literary experiences!"
          />
        )}
      </div>
    </div>
  );
};
export default Rating;
