"use client";

import UrlService from "@/services/url.service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { urlSchema } from "@/schemas/url.schema";
import { update } from "@/store/slices/urlSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const UpdateDialog = ({ defaultValues, action }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      originalURL: defaultValues.originalURL,
    },
  });
  const { handleSubmit, formState, control } = form;

  async function onSubmit(values: z.infer<typeof urlSchema>) {
    try {
      const expectedValues = {
        ...defaultValues,
        originalURL: values.originalURL,
      };
      const { url } = await UrlService.update(expectedValues);
      action(update(url));
      toast.success("Shortened URL updated");
      setOpen(false);
    } catch {
      toast.error("Failed to submit. Try later");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            note.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="originalURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://"
                      disabled={formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={formState.isSubmitting} type="submit">
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
