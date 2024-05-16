"use client";
import MaxWidthWrapper from "@/components/shared/MaxWithWrapper";
import { SearchParamsProps } from "@/types";
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
} from "stream-chat-react";
import { useAuth } from "@clerk/nextjs";
import useChatClient from "@/lib/hook/useChatClient";
import RoomPreview from "./_components/RoomPreview";
import DrawerChanel from "./_components/DrawerChanel";

const Chats = ({ searchParams }: SearchParamsProps) => {
  const { userId } = useAuth();
  console.log("params", searchParams.room);

  const filters = searchParams.room
    ? {
        type: "messaging",
        members: { $in: [userId!] },
        cid: { $eq: searchParams.room ?? "" },
      }
    : { type: "messaging", members: { $in: [userId!] } };

  const { client, isLoading } = useChatClient();

  if (isLoading) return <div>Loading...</div>;

  if (!client) return <div>no client</div>;

  return (
    <Chat client={client}>
      <MaxWidthWrapper className="border-2 px-0 flex border-alto rounded-3xl flex-col md:flex-row  h-[calc(100vh-12rem)]">
        <div className="w-fit border-r-2 h-full overflow-hidden hidden md:flex rounded-l-3xl">
          {/* <SearchRoom
            placeholder="Search Room"
            route={`/profiles/chat/${params.id}`}
          /> */}
          <ChannelList
            showChannelSearch
            filters={filters}
            sort={{ last_message_at: -1 }}
            options={{ state: true, presence: true, limit: 10 }}
            Preview={RoomPreview}
          />
        </div>
        <div className="flex-1 py-4 px-2 flex flex-col overflow-hidden">
          <Channel>
            <div className="flex flex-col w-full overflow-hidden">
              <MessageList />
              <MessageInput noFiles />
            </div>
          </Channel>
        </div>
      </MaxWidthWrapper>
      <div className="md:hidden w-full">
        <DrawerChanel>
          <ChannelList
            showChannelSearch
            filters={filters}
            sort={{ last_message_at: -1 }}
            options={{ state: true, presence: true, limit: 10 }}
            Preview={RoomPreview}
          />
        </DrawerChanel>
      </div>
    </Chat>
  );
};
export default Chats;
