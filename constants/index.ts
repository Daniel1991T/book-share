import {
  BookOpenIcon,
  HeartIcon,
  LucideIcon,
  MessageSquareIcon,
  Star,
  Users,
} from "lucide-react";

export type ProfileLink = {
  imgURL: LucideIcon;
  route: string;
  label: string;
  value: string;
};

export const profileLinks: ProfileLink[] = [
  {
    imgURL: BookOpenIcon,
    route: "/profile",
    label: "My Ads",
    value: "ads",
  },
  {
    imgURL: HeartIcon,
    route: "/profile/wishlist",
    label: "Wishlist",
    value: "wishlist",
  },
  {
    imgURL: MessageSquareIcon,
    route: "/profile/chats",
    label: "Chats",
    value: "chats",
  },
  {
    imgURL: Star,
    route: "/profile/rating",
    label: "My Rating",
    value: "rating",
  },
  {
    imgURL: Users,
    route: "/profile/followings",
    label: "Following",
    value: "followings",
  },
];