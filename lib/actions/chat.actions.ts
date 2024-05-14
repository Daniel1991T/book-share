"use server";
import { env } from "@/env";
import { auth } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";

export const getTokenStreamChat = async () => {
  const { userId } = auth();
  if (!userId) {
    console.error("User not found");
    throw new Error("User not found");
  }

  const serverClient = StreamChat.getInstance(
    env.NEXT_PUBLIC_STREAM_API_KEY,
    env.STREAM_API_SECRET
  );
  const token = serverClient.createToken(userId);

  return token;
};
