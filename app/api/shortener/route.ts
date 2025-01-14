import { connectionToDatabase } from "@/utils/dbConnection";
import Url from "@/models/url.model";
import ShortUniqueId from "short-unique-id";
import { auth } from "@/auth";

const { randomUUID } = new ShortUniqueId({ length: 6 });

export const GET = auth(async function GET(req) {
  const session = req.auth;
  const searchParams = req.nextUrl.searchParams;
  const options = {
    page: parseInt(searchParams.get("page") as string, 10) || 1,
    limit: parseInt(searchParams.get("limit") as string, 10) || 10,
  };

  try {
    if (!session)
      return Response.json(
        { status: 401, message: "Not authenticated" },
        { status: 401 }
      );

    await connectionToDatabase();

    const urls = await Url.paginate({ user: session.user?.id }, options);

    return Response.json(
      {
        status: 200,
        urls: urls.docs,
        total: urls.totalDocs,
        pages: urls.totalPages,
        page: urls.page,
        limit: urls.limit,
      },
      { status: 200 }
    );
  } catch (e) {
    return Response.json({ status: 500, message: e.message }, { status: 500 });
  }
});

export const POST = auth(async function GET(req) {
  const session = req.auth;
  let body = await req.json();

  try {
    if (!session)
      return Response.json(
        { status: 401, message: "Not authenticated" },
        { status: 401 }
      );

    body = { ...body, shortURL: randomUUID(), user: session.user?.id };

    await connectionToDatabase();

    const url = new Url(body);

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
  } catch (e) {
    return Response.json({ status: 500, message: e.message }, { status: 500 });
  }
});

export const PUT = auth(async function GET(req) {
  const session = req.auth;
  const body = await req.json();

  try {
    if (!session)
      return Response.json(
        { status: 401, message: "Not authenticated" },
        { status: 401 }
      );

    await connectionToDatabase();

    const url = await Url.findOne({
      shortURL: body.shortURL,
      user: session.user?.id,
    });
    if (!url)
      return Response.json(
        { status: 404, message: "Url not found" },
        { status: 404 }
      );

    url.originalURL = body.originalURL;
    const updatedUrl = await url.save();

    return Response.json(
      {
        status: 200,
        url: updatedUrl,
      },
      { status: 200 }
    );
  } catch (e) {
    return Response.json({ status: 500, message: e.message }, { status: 500 });
  }
});

export const DELETE = auth(async function GET(req) {
  const session = req.auth;
  const body = await req.json();

  try {
    if (!session)
      return Response.json(
        { status: 401, message: "Not authenticated" },
        { status: 401 }
      );

    await connectionToDatabase();

    const url = await Url.findOneAndDelete({
      shortURL: body.shortUrl,
      user: session.user?.id,
    });
    if (!url)
      return Response.json(
        {
          status: 404,
          message: "Url not found",
        },
        { status: 404 }
      );

    return new Response(null, { status: 204 });
  } catch (e) {
    return Response.json({ status: 500, message: e.message }, { status: 500 });
  }
});
