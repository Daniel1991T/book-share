import UploadUserImage from "@/components/UploadUserImage";
import UserImageSkeleton from "@/components/UserImageSkeleton";
import { Suspense } from "react";

const EditProfile = () => {
  return (
    <section className="flex w-screen mt-16 p-3 justify-center items-center">
      <div
        className="w-full flex justify-start 
      max-w-4xl mx-auto border rounded-md drop-shadow-lg p-4 border-como"
      >
        <Suspense fallback={<UserImageSkeleton />}>
          <UploadUserImage />
        </Suspense>
      </div>
    </section>
  );
};
export default EditProfile;
