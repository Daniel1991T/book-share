import UserDetail from "@/components/UserDetail";
import { getUserClerkId } from "@/lib/actions/user.actions";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

const UserProp = async ({ params }: ParamsProps) => {
  const { id: mongoUser } = params;
  const { userId: clerkId } = await auth();
  if (!clerkId) return <div>loading...</div>;
  const mongoUserOfClerkId = await getUserClerkId(mongoUser);
  const mongoAuthUser = await getUserClerkId(clerkId);
  return (
    <>
      <UserDetail
        authUserId={mongoAuthUser._id}
        clerk_id={mongoUserOfClerkId}
      />
    </>
  );
};
export default UserProp;
