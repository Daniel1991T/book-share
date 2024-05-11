import ReviewCard from "@/components/cards/ReviewCard";
import MaxWidthWrapper from "@/components/shared/MaxWithWrapper";
import { getReviewOfUserClerkId } from "@/lib/actions/rating.actions";
import { ParamsProps } from "@/types";

export default async function RatingPage({ params }: ParamsProps) {
  const reviews = await getReviewOfUserClerkId(params.id);
  console.log("review", reviews);
  return (
    <MaxWidthWrapper>
      <div className="space-y-4 max-w-2xl mx-auto  md:px-0">
        {reviews.map((review, index) => (
          <ReviewCard key={review._id + index} reviewItem={review} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
