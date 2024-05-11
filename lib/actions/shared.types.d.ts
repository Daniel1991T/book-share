import { TUser } from "@/database/user.model";

export type CreateUserParams = {
  clerkId: string;
  name: string;
  surname: string;
  email: string;
  picture?: string;
  city: string;
  country: string;
  phone: string;
};

export type GetBooksParams = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
};

type FilterBooksParams = {
  sort?: string;
  gender?: string;
  city?: string;
  country?: string;
  price?: number;
};

export type GetListingBooksParams = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: FilterBooksParams;
};

export type ToggleAddWishlistParams = {
  userId: string;
  listingBookId: string;
  path: string;
};

export type ToggleFollowUserParams = {
  followUserId: string;
  path: string;
};

export type UpdateUserParams = {
  clerkId: string;
  updateData: Partial<TUser>;
  path: string;
};

export type ListingBooksByUserIdParams = {
  userId: string;
  page?: number;
  pageSize?: number;
};

export type TReviewModel = {
  authorMongoUserId: Schema.Types.ObjectId;
  forUserClerkId: string;
  comment: string;
  rating: number;
  postedAt: Date;
};

export type TReviewUser = {
  _id: string;
  authorMongoUserId: {
    clerkId: string;
    name: string;
    surname: string;
    picture: string;
  };
  forUserClerkId: string;
  comment: string;
  rating: number;
  postedAt: string;
};
