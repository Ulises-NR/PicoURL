"use client";

import UrlService from "@/services/url.service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { urlSchema } from "@/schemas/url.schema";
import { useAppSelector, useAppDispatch } from "@/store";
import { createTtlUrl, resetTtl } from "@/store/slices/ttlSlice";
import { create } from "@/store/slices/urlSlice";
import { useForm } from "react-hook-form";
import { useShortenerOptions } from "@/hooks/use-shortener-options";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShortenerPagination } from "./shortener-pagination";
import { ShortenerAuthCard, ShortenerNonAuthCard } from "./shortener-card";
import { toast } from "sonner";

export const IsAuth = () => {
  const url = useAppSelector((state) => state.url);
  const dispatch = useAppDispatch();
  useShortenerOptions(dispatch);
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      originalURL: "",
    },
  });
  const { handleSubmit, formState, control, reset } = form;

  async function onSubmit(values: z.infer<typeof urlSchema>) {
    try {
      const res = await UrlService.create(values);
      dispatch(create(res));
      reset();
      toast.success("Shortened URL created");
    } catch {
      toast.error("Failed to submit. Try later");
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      </Form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {url &&
          url.urls.map((shortenedUrl) => (
            <ShortenerAuthCard
              shortenedUrl={shortenedUrl}
              key={shortenedUrl._id}
            />
          ))}
      </div>

      <ShortenerPagination currentPage={url.page} totalPages={url.pages} />
    </div>
  );
};

export const NotAuth = () => {
  const ttl = useAppSelector((state) => state.ttl.url);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      originalURL: "",
    },
  });
  const { handleSubmit, formState, control, reset } = form;

  async function onSubmit(values: z.infer<typeof urlSchema>) {
    try {
      const res = await UrlService.ttl(values);
      dispatch(createTtlUrl(res));
      reset();
      toast.success("Shortened URL created");

      setTimeout(() => {
        dispatch(resetTtl());
        toast.info("Url has expired");
      }, 300000);
    } catch {
      toast.error("Failed to submit. Try later");
    }
  }

  if (ttl && Date.now() > ttl.expiresIn) {
    dispatch(resetTtl());
  } else if (ttl) {
    const timeLeft = ttl.expiresIn - Date.now();

    setTimeout(() => {
      dispatch(resetTtl());
    }, timeLeft);
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Alert variant="destructive">
        <AlertDescription>
          As long as you are not registered, your links will only last 5 minutes
        </AlertDescription>
      </Alert>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="originalURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://"
                    disabled={formState.isSubmitting || !!ttl}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {ttl && <ShortenerNonAuthCard ttl={ttl} />}
    </div>
  );
};
