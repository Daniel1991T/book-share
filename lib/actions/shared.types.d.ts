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
