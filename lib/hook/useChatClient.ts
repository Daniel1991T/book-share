"use client";
import { ChannelSort, DefaultGenerics, StreamChat } from "stream-chat";
import { getChannel } from "stream-chat-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getTokenStreamChat } from "../actions/chat.actions";
import { env } from "@/env";

const useChatClient = () => {
  const { isSignedIn, user } = useUser();
  const [client, setClient] = useState<StreamChat | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn && user) {
      const client = StreamChat.getInstance(
        // process.env.NEXT_PUBLIC_STREAM_API_KEY!
        env.NEXT_PUBLIC_STREAM_API_KEY
      );

      const connectUser = async () => {
        const token = await getTokenStreamChat();
        if (!token) {
          throw new Error("Failed to get token");
        }
        try {
          await client.connectUser(
            {
              id: user.id.toString(),
              name: `${user.firstName}  ${user.lastName}` || "Anonymous",
              image: user.imageUrl || undefined,
            },
            token
          );
        } catch (error) {
          console.error("Failed to connect user", error);
        } finally {
          setIsLoading(false);
        }
      };

      connectUser().catch(console.error);
      setClient(client);

      return () => {
        client.disconnectUser();
      };
    }
  }, [isSignedIn, user]);

  const getChannelList = async (query: string) => {
    if (!client) return null;
    const filter = {
      // members: { $in: [query] },
      // name: { $autocomplete: query },
    };
    const sort: ChannelSort<DefaultGenerics> | undefined = {
      last_message_at: -1,
    };
    const channelList = await getChannel({ client });
    return channelList;
  };

  // Function to create a channel
  const createChannel = async (
    otherUserId: string,
    roomImage: string,
    roomName: string
  ) => {
    if (!client) return null;
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

  return { client, isLoading, createChannel, getChannelList };
};

export default useChatClient;
