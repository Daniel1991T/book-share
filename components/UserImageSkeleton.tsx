import { Skeleton } from "./ui/skeleton";

const UserImageSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-3">
        <Skeleton className="rounded-full w-20 h-20" />
        <div className="flex flex-col">
          <p className="ml-4">Profile image</p>
          <div className="flex space-x-1">
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-40 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserImageSkeleton;
