import { FILTER_URL_PARAMS } from "@/constants/filter";
import { formUrlQuery, timeAgo } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Circle } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import {
  ChannelPreviewUIComponentProps,
  DefaultStreamChatGenerics,
} from "stream-chat-react";

export default function RoomPreview<
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
>(props: ChannelPreviewUIComponentProps<DefaultStreamChatGenerics>) {
  const {
    active,
    channel,
    displayImage,
    displayTitle,
    latestMessage,
    onSelect: customOnSelectChannel,
    setActiveChannel,
    watchers,
  } = props;
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const otherUser = Object.values(channel?.state?.members ?? {}).filter(
    (val) => val.user_id !== user?.id
  )[0];

  const channelPreviewButton = useRef<HTMLButtonElement | null>(null);

  const handleUpdateParams = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: FILTER_URL_PARAMS.DRAWER,
      value: "false",
    });
    router.push(newUrl, { scroll: false });
  };

  const onSelectChannel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (customOnSelectChannel) {
      customOnSelectChannel(e);
    } else if (setActiveChannel) {
      setActiveChannel(channel, watchers);
    }
    if (channelPreviewButton?.current) {
      channelPreviewButton.current.blur();
    }
    handleUpdateParams();
  };

  return (
    <button
      aria-label={`Select Channel: ${displayTitle || ""}`}
      aria-selected={active}
      role="option"
      data-testid="channel-preview-button"
      onClick={onSelectChannel}
      ref={channelPreviewButton}
      className={`flex w-full ${active && "bg-como_v-100"}`}
    >
      <div className="relative w-24 h-full p-1">
        <Image
          src={(channel?.data?.roomImage as string) ?? displayImage}
          alt="room-image"
          width={80}
          height={80}
          className="h-full object-cover rounded-lg"
        />
        <div
          className={`flex items-center justify-center size-9  rounded-full absolute -right-3 bottom-0 ${
            otherUser.user?.online ? "bg-green-400" : "bg-gray-400"
          }`}
        >
          <Image
            src={
              otherUser.user?.image ?? "/assets/images/avatarPlaceholder.png"
            }
            alt="user-avatar"
            width={30}
            height={30}
            className="object-cover rounded-full size-8"
          />
        </div>
      </div>
      <div className="flex flex-col w-full px-4 items-start justify-between !h-full py-2">
        <div className="flex justify-between items-center w-full">
          <p className="font-bold">{otherUser.user?.name}</p>
          {!otherUser.user?.online ? (
            <p className="text-gunsmoke">
              {timeAgo(otherUser.user?.last_active ?? "")}
            </p>
          ) : (
            <div className="text-green-400 gap-2 flex items-center justify-center">
              <div>
                <Circle className="text-green-400 fill-green-400 size-3 translate-y-[2px]" />
              </div>
              <p>online</p>
            </div>
          )}
        </div>

        <h2 className="text-como">Ad: {displayTitle}</h2>
        <p className="text-gunsmoke overflow-hidden text-ellipsis">
          {latestMessage}
        </p>
      </div>
    </button>
  );
}
