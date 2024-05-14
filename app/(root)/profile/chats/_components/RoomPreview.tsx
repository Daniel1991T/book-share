import { TRoomChanel } from "@/types";
import Image from "next/image";

type RoomPreviewProps = {
  isActive: boolean;
  roomChanelDetails: TRoomChanel;
};

export default function RoomPreview({
  isActive,
  roomChanelDetails: {
    roomImage,
    userAvatar,
    userFullName,
    bookName,
    lastMessage,
    lastSeen,
  },
}: RoomPreviewProps) {
  return (
    <li className={`${isActive && "bg-como_v-100"} flex w-full`}>
      <div className="relative w-24 h-full p-1">
        <Image
          src={roomImage}
          alt="room-image"
          width={80}
          height={80}
          className="h-full object-cover rounded-lg"
        />
        <div className="flex items-center justify-center size-9 bg-white rounded-full absolute -right-3 bottom-0">
          <Image src={userAvatar} alt="user-avatar" width={30} height={30} />
        </div>
      </div>
      <div className="flex flex-col w-full px-4 justify-between py-2">
        <div className="flex justify-between items-center w-full">
          <p className="font-bold">{userFullName}</p>
          <p className="text-gunsmoke">{lastSeen}</p>
        </div>
        <h2 className="text-como">Ad: {bookName}</h2>
        <p className="text-gunsmoke overflow-hidden text-ellipsis">
          {lastMessage}
        </p>
      </div>
    </li>
  );
}
