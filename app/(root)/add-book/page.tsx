"use client";
import ImageUploader from "@/components/image-upload/ImageUpload";
import Search from "@/components/search/Search";
import { Separator } from "@/components/ui/separator";

const AddBook = () => {
  return (
    <div className="container mt-20 py-2 items-center justify-center px-32 md:px-52">
      <h1 className="text-2xl font-semibold">Place an ad</h1>
      <p className="text-gunsmoke">
        Find your book in base to add description and details.
      </p>
      <p className="text-gunsmoke">
        You can add description and details manually, if you don&apos;t find
        your book in base.
      </p>
      <Search placeHolder="Search book in base" />

      <Separator />
      <h1 className="text-2xl font-semibold my-4">Book cover</h1>

      <ImageUploader />
    </div>
  );
};
export default AddBook;
