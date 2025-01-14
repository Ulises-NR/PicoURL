import { connectionToDatabase } from "@/utils/dbConnection";
import Url from "@/models/url.model";
import UrlTtl from "@/models/urlTtl.model";
import { redirect } from "next/navigation";

export async function GET(request: Request, { params }) {
  const shortUrl = (await params).shortUrl;

  try {
    await connectionToDatabase();
  } catch (e: any) {
    return Response.json({ status: 500, error: e.message }, { status: 500 });
  }

  const url = await Url.findOne({
    shortURL: shortUrl,
  });
  if (url) {
    redirect(url.originalURL);
  }

  const ttl = await UrlTtl.findOne({
    shortURL: shortUrl,
  });
  if (ttl) {
    redirect(ttl.originalURL);
  }

  return Response.json(
    {
      status: 404,
      message: "URL no encontrada.",
    },
    { status: 404 }
  );
}
