import { useAppDispatch } from "@/store";
import { remove } from "@/store/slices/urlSlice";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RemoveDialog } from "./remove-dialog";
import { UpdateDialog } from "./update-dialog";

export const ShortenerAuthCard = ({ shortenedUrl }) => {
  const dispatch = useAppDispatch();

  return (
    <Card key={shortenedUrl.shortURL}>
      <CardHeader>
        <CardTitle>Shortened URL</CardTitle>
        <CardDescription>{shortenedUrl.originalURL}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          className="block truncate underline"
          href={`/api/redirect/${shortenedUrl.shortURL}`}
        >
          {`http://localhost:3000/api/redirect/${shortenedUrl.shortURL}`}
        </Link>
      </CardContent>
      <CardFooter>
        <div className="w-full grid grid-cols-2 gap-2">
          <RemoveDialog id={shortenedUrl.shortURL} action={dispatch} />
          <UpdateDialog defaultValues={shortenedUrl} action={dispatch} />
        </div>
      </CardFooter>
    </Card>
  );
};

export const ShortenerNonAuthCard = ({ ttl }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shortened URL</CardTitle>
        <CardDescription>{ttl.originalURL}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          className="block truncate underline"
          href={"/api/redirect/" + ttl.shortURL}
        >
          http://localhost:3000/api/redirect/{ttl.shortURL}
        </Link>
      </CardContent>
    </Card>
  );
};
