/* eslint-disable @next/next/no-img-element */
import DescriptionText from "@/components/DescriptionText";
import UserDetail from "@/components/UserDetail";
import AddToWishlist from "@/components/shared/AddToWishlist";
import { Button } from "@/components/ui/button";
import { TUser } from "@/database/user.model";
import { getListingBookById } from "@/lib/actions/listing.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { ObjectId } from "mongoose";
import Link from "next/link";

const BookPropsText = ({ text, name }: { text: string; name: string }) => {
  return (
    <p className="flex font-inter flex-row items-end space-x-1 text-slate-400 text-sm">
      <span>{name}</span>
      <span className="flex-1 -translate-y-[6px] bg-slate-400 text-ellipsis overflow-hidden h-0.5" />
      <span>{text}</span>
    </p>
  );
};

const ListingBookPage = async ({ params }: ParamsProps) => {
  const { userId: clerkId } = auth();
  const { listingBook } = await getListingBookById(params.id);
  let mongoUser: TUser | null = null;
  if (clerkId) {
    mongoUser = await getUserByClerkId(clerkId);
  }

  if (!mongoUser) return null;
  return (
    <section className="flex mt-16 w-full pt-2 justify-center flex-col items-center">
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <div className="flex w-full flex-col md:flex-row">
          <div className="flex w-1/2 items-center justify-center relative">
            <img
              className="w-2/3 md:w-2/3 h-full m-auto object-cover rounded-xl"
              src={listingBook.book_id.cover_url[0]}
              alt={listingBook.book_id.title}
            />
            <div className="hidden md:flex flex-col absolute top-0 -left-20 space-y-2">
              <img
                className="w-28 object-cover rounded-lg"
                src={listingBook.book_id.cover_url[1]}
                alt={listingBook.book_id.title}
              />
              <img
                className="w-28  object-cover rounded-lg"
                src={listingBook.book_id.cover_url[2]}
                alt={listingBook.book_id.title}
              />
            </div>
          </div>

          <div className="px-2 py-4 w-1/2">
            <h1 className="text-2xl font-semibold">
              {listingBook.book_id.title}
            </h1>
            <p className="text-sm font-medium text-slate-400 gap-2">
              by {listingBook.book_id.author}
            </p>
            <div className="text-lg font-semibold">
              {Number(listingBook.price) > 0 ? (
                <p className="p-4">
                  $ <span>{listingBook.price}</span>
                </p>
              ) : (
                <p className="py-4 text-como">Free</p>
              )}
            </div>
            {listingBook.clerk_id !== clerkId && (
              <div className="flex w-full items-center justify-center gap-2 px-4">
                <Link href="#" className="w-full">
                  <Button className="bg-como w-full rounded-full text-white">
                    contact
                  </Button>
                </Link>

                <AddToWishlist
                  isWishlist={mongoUser?.wishlist.includes(
                    listingBook._id as unknown as ObjectId
                  )}
                  listingBookId={JSON.stringify(listingBook._id)}
                  userId={JSON.stringify(mongoUser?.id)}
                />
              </div>
            )}
            <UserDetail
              clerk_id={listingBook.clerk_id}
              authUserId={JSON.stringify(mongoUser._id)}
            />
          </div>
        </div>
        <div className="space-y-2 w-1/2">
          <DescriptionText text={listingBook.book_id.description} />
          <BookPropsText
            name="Condition"
            text={listingBook.condition.toUpperCase()}
          />
          <BookPropsText name="Author" text={listingBook.book_id.author} />
          <BookPropsText name="Gender" text={listingBook.book_id.gender} />
          <BookPropsText
            name="Publisher"
            text={listingBook.book_id.publisher}
          />
          <BookPropsText
            name="Publication year"
            text={listingBook.book_id.publication_year}
          />
          <BookPropsText name="Language" text={listingBook.book_id.language} />
          <BookPropsText
            name="Print length"
            text={listingBook.book_id.print_length}
          />
        </div>
      </div>
      <div className="flex max-w-4xl">similar book</div>
    </section>
  );
};
export default ListingBookPage;
