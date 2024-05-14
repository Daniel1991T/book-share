import MaxWidthWrapper from "@/components/shared/MaxWithWrapper";
import SearchRoom from "./_components/SearchRoom";
import { ParamsProps, TRoomChanel } from "@/types";
import RoomPreview from "./_components/RoomPreview";

const items: TRoomChanel[] = [
  {
    roomImage:
      "http://res.cloudinary.com/dunmfhbir/image/upload/v1712841100/vyeebliu5kdx4w5rnq2x.jpg",
    userAvatar: "/assets/images/avatarPlaceholder.png",
    userFullName: "John Doe",
    bookName: "Harry Potter",
    lastMessage: "Hello",
    lastSeen: "1 min ago",
  },
  {
    roomImage:
      "http://res.cloudinary.com/dunmfhbir/image/upload/v1712841100/vyeebliu5kdx4w5rnq2x.jpg",
    userAvatar: "/assets/images/avatarPlaceholder.png",
    userFullName: "John Doe",
    bookName: "Harry Potter",
    lastMessage: "Hello",
    lastSeen: "1 min ago",
  },
];

const Chats = ({ params }: ParamsProps) => {
  return (
    <MaxWidthWrapper className="border-2 px-0 flex border-alto rounded-3xl  h-[calc(100vh-12rem)]">
      <div className="w-80 border-r-2">
        <SearchRoom
          placeholder="Search Room"
          route={`/profiles/chat/${params.id}`}
        />
        <ul>
          <RoomPreview isActive roomChanelDetails={items[0]} />
          <RoomPreview isActive={false} roomChanelDetails={items[1]} />
        </ul>
      </div>
      <div className="flex-1 py-4 px-2">chat room</div>
    </MaxWidthWrapper>
  );
};
export default Chats;
