"use client";
import { toggleAddToWishlist } from "@/lib/actions/user.actions";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { usePathname } from "next/navigation";

type AddToWishlistProps = {
  isWishlist: boolean;
  userId?: string;
  listingBookId?: string;
};

const AddToWishlist = ({
  isWishlist,
  userId,
  listingBookId,
}: AddToWishlistProps) => {
  const [isChecked, setIsChecked] = useState(isWishlist);

  const pathname = usePathname();

  const handleSave = async () => {
    await toggleAddToWishlist({
      userId: JSON.parse(userId!),
      listingBookId: JSON.parse(listingBookId!),
      path: pathname,
    });
    setIsChecked(!isChecked);
    return toast({
      title: `Book ${!isWishlist ? "Added to" : "Remove from"} your wishlist!`,
      variant: !isWishlist ? "default" : "destructive",
    });
  };

  return (
    <label
      htmlFor={listingBookId}
      className="block relative cursor-pointer text-xl select-none duration-200 hover:scale-110"
    >
      <input
        id={listingBookId}
        name="heart"
        type="checkbox"
        className="absolute opacity-0 cursor-pointer size-0"
        onChange={handleSave}
      />
      <div
        className={`top-0 left-0 size-5 transition-all duration-100 ${
          isChecked ? "animate-like-effect" : "animate-dislike-effect"
        }`}
      >
        <svg viewBox="0 0 256 256">
          <rect fill="none" height="256" width="256"></rect>
          <path
            d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
            strokeWidth="10px"
            stroke="#558B78"
            fill={isChecked ? "#558B78" : "none"}
          ></path>
        </svg>
      </div>
    </label>
  );
};

export default AddToWishlist;
