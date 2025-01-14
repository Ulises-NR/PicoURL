import { connectionToDatabase } from "@/utils/dbConnection";
import UrlTtl from "@/models/urlTtl.model";
import ShortUniqueId from "short-unique-id";

const { randomUUID } = new ShortUniqueId({ length: 6 });

export async function POST(req: Request) {
  let body = await req.json();

  body = { ...body, shortURL: randomUUID() };

  try {
    await connectionToDatabase();

    const url = new UrlTtl(body);

    const savedUrl = await url.save();

    return Response.json(
      {
        status: 201,
        url: savedUrl,
      },
      {
        status: 201,
      }
    );
  } catch (e: any) {
    return Response.json({ status: 500, error: e.message }, { status: 500 });
  }
}
