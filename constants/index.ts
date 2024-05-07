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

export type FollowLink = {
  label: string;
  value: string;
  route: string;
};

export const followTabs: FollowLink[] = [
  {
    label: "Followings",
    value: "followings",
    route: "/profile/followings",
  },
  {
    label: "Followers",
    value: "followers",
    route: "/profile/followers",
  },
];

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

export const profilesLink: ProfileLink[] = [
  {
    imgURL: BookOpenIcon,
    route: "/profiles",
    label: "My Ads",
    value: "ads",
  },
  {
    imgURL: HeartIcon,
    route: "/profiles/wishlist",
    label: "Wishlist",
    value: "wishlist",
  },
  {
    imgURL: Star,
    route: "/profiles/rating",
    label: "My Rating",
    value: "rating",
  },
  {
    imgURL: Users,
    route: "/profiles/followings",
    label: "Following",
    value: "followings",
  },
];
