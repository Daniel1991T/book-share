"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import useChatClient from "@/lib/hook/useChatClient";

type ContactProps = {
  otherUserId: string;
  roomImage: string;
  roomName: string;
};

export default function ContactButton({
  otherUserId,
  roomImage,
  roomName,
}: ContactProps) {
  const { createChannel, client } = useChatClient();

  const router = useRouter();

  const handleContact = async () => {
    const channel = await createChannel(otherUserId, roomImage, roomName);
    if (channel) {
      router.push(`/profile/chats?room=${channel.cid}`);
    }
  };
  return (
    <Button
      onClick={handleContact}
      className="bg-como w-full rounded-full text-white"
    >
      contact
    </Button>
  );
}
