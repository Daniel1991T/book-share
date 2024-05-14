"use client";
import { StreamChat } from "stream-chat";
import { getChannel } from "stream-chat-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getTokenStreamChat } from "../actions/chat.actions";
import { env } from "@/env";

const useChatClient = () => {
  const { isSignedIn, user } = useUser();
  const [client, setClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    if (isSignedIn && user) {
      const client = StreamChat.getInstance(
        // process.env.NEXT_PUBLIC_STREAM_API_KEY!
        env.NEXT_PUBLIC_STREAM_API_KEY
      );

      const connectUser = async () => {
        const token = await getTokenStreamChat();

        await client.connectUser(
          {
            id: user.id.toString(),
            name: user.firstName || "Anonymous",
            image: user.imageUrl || undefined,
          },
          token
        );
      };

      connectUser().catch(console.error);
      setClient(client);
      console.log("client", client);

      return () => {
        client.disconnectUser();
      };
    }
  }, [isSignedIn, user]);

  // Function to create a channel
  const createChannel = async (
    otherUserId: string,
    roomImage: string,
    roomName: string
  ) => {
    if (!client) return null;
    console.log(user!!.id, otherUserId);
    const existingChannel = await getChannel({
      client,
      type: "messaging",
      members: [user!!.id, otherUserId],
    });
    if (existingChannel) {
      existingChannel.updatePartial({
        set: {
          name: roomName,
          roomImage: roomImage,
        },
      });

      return existingChannel;
    }

    const channel = client.channel("messaging", {
      members: [user!!.id, otherUserId],
      roomImage: roomImage,
      name: roomName,
    });

    await channel.create().catch(console.error);
    await channel.watch();
    return channel;
  };

  return { client, createChannel };
};

export default useChatClient;
