import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

const UserResume = async () => {
  const user = await currentUser();
  if (!user) return <p>No Image URL found</p>;

  const { imageUrl } = user;
  const params = new URLSearchParams();

  params.set("height", "200");
  params.set("width", "200");
  params.set("quality", "100");
  params.set("fit", "crop");

  const imageSrc = `${imageUrl}?${params.toString()}`;

  return (
    <div className="flex">
      <Image
        className="rounded-full"
        width={40}
        height={40}
        src={imageSrc}
        alt="User image"
      />

      <div className="flex flex-col ml-2 justify-center">
        <p className="font-bold">
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};
export default UserResume;
