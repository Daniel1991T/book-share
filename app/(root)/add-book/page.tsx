"use client";
import AddBookInputField from "@/components/form/AddBookInputField";
import ImageUploaderInputField from "@/components/image-upload/ImageUpload";
import Search from "@/components/search/Search";
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
import { addBookToDB } from "@/lib/actions/book.actions";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const AddBook = () => {
  const [imageURLs, setImageURLs] = useState<[string, string, string]>([
    "",
    "",
    "",
  ]);
  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      isGenerate: false,
      title: "T-rex",
      author: "Dan",
      condition: ConditionBook.NEW,
      description: "dsasd",
      gender: GenderBook.NONFICTION,
      isFree: BookPrice.FREE,
      language: "Eng",
      price: "20",
      print_length: "525",
      publication_year: "2025",
      publisher: "Art",
      cover_url: ["", "", ""],
    },
  });

  useEffect(() => {
    form.setValue("cover_url", [...imageURLs]);
  }, [imageURLs, form]);
  const onSubmit = async (values: z.infer<typeof BookSchema>) => {
    //
    console.log(values);
    try {
      await addBookToDB(values, "");
    } catch (error) {
      console.log(error);
    }
  };

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
      {JSON.stringify(form.getValues())}

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
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <FormControl>
                  <ToggleGroup
                    id="gender"
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    type="single"
                  >
                    {Object.values(GenderBook).map((value, index) => {
                      return (
                        <ToggleGroupItem
                          id={field.name}
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
                    {...field}
                  >
                    <ToggleGroupItem
                      id="price"
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
            className="w-full bg-como hover:bg-como/90 rounded-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default AddBook;
