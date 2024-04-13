import EditProfileForm from "@/components/EditProfileForm";
import UploadUserImage from "@/components/UploadUserImage";
import UserImageSkeleton from "@/components/UserImageSkeleton";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { Suspense } from "react";

const EditProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const mongoUser = await getUserByClerkId(userId);
  return (
    <section className="flex w-screen mt-16 p-3 justify-center items-center">
      <div
        className="w-full flex flex-col justify-start 
      max-w-4xl mx-auto border rounded-md drop-shadow-lg p-4 md:p-10 border-como"
      >
        <Suspense fallback={<UserImageSkeleton />}>
          <UploadUserImage />
        </Suspense>
        <EditProfileForm clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </section>
  );
};
export default EditProfile;
