"use client";

import UrlService from "@/services/url.service";
import { useTransition } from "react";
import { remove } from "@/store/slices/urlSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const RemoveDialog = ({ id, action }) => {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await UrlService.remove(id);

      action(remove(id));
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Remove</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            note.
          </DialogDescription>
        </DialogHeader>

        <Button disabled={isPending} onClick={handleDelete} type="submit">
          Remove note
        </Button>
      </DialogContent>
    </Dialog>
  );
};
