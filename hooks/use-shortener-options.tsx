"use client";

import UrlService from "@/services/url.service";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchShortedUrls } from "@/store/slices/urlSlice";

export const useShortenerOptions = (dispatch) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const { page, limit } = {
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
    };

    async function fetchUrls() {
      const res = await UrlService.getUrls({ page, limit });
      delete res.status;

      dispatch(fetchShortedUrls(res));
    }

    fetchUrls();
  }, [searchParams, dispatch]);
};
