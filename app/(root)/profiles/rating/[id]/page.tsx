import ReviewCard from "@/components/cards/ReviewCard";
import MaxWidthWrapper from "@/components/shared/MaxWithWrapper";
import NoResult from "@/components/shared/NoResult";
import { getReviewOfUserClerkId } from "@/lib/actions/rating.actions";
import { ParamsProps } from "@/types";

export default async function RatingPage({ params }: ParamsProps) {
  const reviews = await getReviewOfUserClerkId(params.id);
  console.log("review", reviews);
  return (
    <MaxWidthWrapper>
      <div className="space-y-4 max-w-2xl mx-auto  md:px-0">
        {reviews.length === 0 && (
          <NoResult
            title="No Reviews yet!"
            description="Welcome to our Book Reviews Corner! Here, you can discover what readers are saying about the books shared by our users. If there are no reviews for a particular book yet, don't fret—new reviews are always on the horizon. Keep exploring and sharing your literary experiences!"
          />
        )}
        {reviews.map((review, index) => (
          <ReviewCard key={review._id + index} reviewItem={review} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
