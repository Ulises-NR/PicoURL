import { auth } from "@/auth";
import { IsAuth, NotAuth } from "./components/shortener";
import { Wrapper } from "./components/shortener-wrapper";

const ShortenerPage = async () => {
  const session = await auth();

  return <Wrapper>{!session ? <NotAuth /> : <IsAuth />}</Wrapper>;
};

export default ShortenerPage;
