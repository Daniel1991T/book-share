"use client";
import AddBookInputField from "@/components/form/AddBookInputField";
import ImageUploaderInputField from "@/components/image-upload/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  BookPrice,
  BookSchema,
  ConditionBook,
  GenderBook,
} from "@/lib/validations";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { addBookToDB, getBookById } from "@/lib/actions/book.actions";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import SearchBook from "@/components/search/SearchBook";
import { useRouter, useSearchParams } from "next/navigation";
import { removeKeysFromQuery } from "@/lib/utils";
import { set } from "mongoose";
import Image from "next/image";

const AddBook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      isGenerate: false,
      title: "",
      author: "",
      condition: ConditionBook.NEW,
      description: "",
      gender: GenderBook.NONFICTION,
      isFree: BookPrice.FREE,
      language: "",
      price: "",
      print_length: "",
      publication_year: "",
      publisher: "",
      cover_url: ["", "", ""],
    },
  });
  const [imageURLs, setImageURLs] = useState<[string, string, string]>([
    form.getValues().cover_url[0] || "",
    form.getValues().cover_url[1] || "",
    form.getValues().cover_url[2] || "",
  ]);

  useEffect(() => {
    form.setValue("cover_url", [...imageURLs]);
  }, [imageURLs, form]);

  const bookIdSearchParams = searchParams.get("book_id");

  useEffect(() => {
    console.log("book_id ->>", bookIdSearchParams);

    const fetchBook = async () => {
      try {
        const { book } = await getBookById(bookIdSearchParams!);
        if (book) {
          console.log("book ->>", book);
          form.setValue("isGenerate", true);
          form.setValue("title", book.title);
          form.setValue("author", book.author);
          form.setValue("cover_url", [...book.cover_url]);
          setImageURLs([...book.cover_url]);
          form.setValue("publisher", book.publisher);
          form.setValue("description", book.description);
          form.setValue("gender", book.gender);
          form.setValue("language", book.language);
          form.setValue("print_length", book.print_length);
          form.setValue("publication_year", book.publication_year);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (bookIdSearchParams) {
      fetchBook();
    }
  }, [bookIdSearchParams, form]);

  const onSubmit = async (values: z.infer<typeof BookSchema>) => {
    //
    setIsLoading(true);
    try {
      await addBookToDB(values, bookIdSearchParams);
      const removedUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keyToRemove: ["book_id"],
      });
      router.push(removedUrl, { scroll: false });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-20 py-2 items-center justify-center max-w-2xl">
      <h1 className="text-2xl font-semibold">Place an ad</h1>
      <p className="text-gunsmoke">
        Find your book in base to add description and details.
      </p>
      <p className="text-gunsmoke">
        You can add description and details manually, if you don&apos;t find
        your book in base.
      </p>
      <SearchBook />

      <Separator />
      <h1 className="text-2xl font-semibold my-4">Book cover</h1>

      <ImageUploaderInputField
        imageURLs={imageURLs}
        setImageURLs={setImageURLs}
      />

      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-4 w-full"
        >
          <AddBookInputField
            form={form}
            name="title"
            placeholder="Title"
            typeInput="text"
            label="Title"
          />
          {/*  Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={form.getValues("isGenerate")}
                    {...field}
                    id="description"
                    placeholder="Description"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AddBookInputField
            form={form}
            name="author"
            placeholder="Author"
            typeInput="text"
            label="Author"
          />
          {/* TODO: Gender Toggle */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Gender</FormLabel>
                <FormControl>
                  <ToggleGroup
                    disabled={form.getValues("isGenerate")}
                    id={field.name}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    type="single"
                    className="flex flex-wrap justify-start"
                    {...field}
                  >
                    {Object.values(GenderBook).map((value, index) => {
                      return (
                        <ToggleGroupItem
                          id={`${field.name}-${value}`}
                          name="gender"
                          key={index}
                          className="border-2 data-[state=on]:border-como"
                          value={value}
                        >
                          {value}
                        </ToggleGroupItem>
                      );
                    })}
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AddBookInputField
            form={form}
            name="publisher"
            placeholder="Publisher"
            typeInput="text"
            label="Publisher"
          />
          <AddBookInputField
            form={form}
            name="publication_year"
            placeholder="2000"
            typeInput="number"
            label="Publication Year"
          />
          <AddBookInputField
            form={form}
            name="language"
            placeholder="English"
            typeInput="text"
            label="language"
          />
          <AddBookInputField
            form={form}
            name="print_length"
            placeholder="500"
            typeInput="number"
            label="Print length"
          />
          {/* condition */}
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>
                <FormControl>
                  <ToggleGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    type="single"
                    disabled={form.getValues("isGenerate")}
                    className="flex justify-start"
                    {...field}
                  >
                    <ToggleGroupItem
                      className="border-2 data-[state=on]:border-como"
                      value={ConditionBook.NEW}
                    >
                      {ConditionBook.NEW}
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="border-2 data-[state=on]:border-como"
                      value={ConditionBook.USED}
                    >
                      {ConditionBook.USED}
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price component */}
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Price</FormLabel>
                <FormControl>
                  <ToggleGroup
                    id={field.name}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    type="single"
                    className="flex justify-start"
                    {...field}
                  >
                    <ToggleGroupItem
                      id="free"
                      className="border-2 w-40 data-[state=on]:bg-como data-[state=on]:text-white"
                      value={BookPrice.FREE}
                    >
                      {BookPrice.FREE}
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      id="price"
                      className="border-2 data-[state=on]:bg-como data-[state=on]:text-white"
                      value={BookPrice.PRICE}
                    >
                      {BookPrice.PRICE}
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <div>
                {form.getValues("isFree") !== "free" && (
                  <FormItem>
                    <FormControl>
                      <Input
                        id={field.name}
                        type="number"
                        className="rounded-full"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              </div>
            )}
          />

          <Button
            disabled={isLoading}
            className="w-full bg-como hover:bg-como/90 rounded-full"
            type="submit"
          >
            {!isLoading ? (
              [<span key="1">Submit</span>]
            ) : (
              <div className="flex justify-center">
                <Image
                  src="../assets/icons/spinner.svg"
                  alt="spinner"
                  width={40}
                  height={40}
                  className="object-contain stroke-slate-50 fill-slate-50"
                />
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default AddBook;
