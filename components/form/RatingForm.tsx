"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RatingSchema } from "@/lib/validations";
import { Textarea } from "../ui/textarea";
import StarRating from "../StarRating";
import { useEffect, useState } from "react";

type RatingFormProps = {
  clerkUserId: string;
  authClerkId: string;
};

export function RatingForm({ clerkUserId }: RatingFormProps) {
  // 1. Define your form.

  const form = useForm<z.infer<typeof RatingSchema>>({
    resolver: zodResolver(RatingSchema),
    defaultValues: {
      comment: "",
      forUserClerkId: clerkUserId,
      rating: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof RatingSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  // ...

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="rating">
                <FormControl>
                  <StarRating rate={field.value} setRate={field.onChange} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="comment">Comment:</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  id="comment"
                  placeholder="Let's your comment here..."
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
