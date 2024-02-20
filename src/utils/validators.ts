import type { MastodonPost } from "../types.d.ts";
import { convertPostUrlToApiUrl } from "./convertors.js";

export const validateUrl = (url: string): boolean => {
  const sanitized = url.trim();
  try {
    new URL(sanitized);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Function to validate that a URL points to a Mastodon post.
 * @param url - The URL to validate.
 * @returns A promise that resolves to `true` if the URL points to a Mastodon post and `false` otherwise.
 */
export const validateMastodon = async (url: string): Promise<boolean> => {
  if (!url) return false;
  try {
    const apiUrl = convertPostUrlToApiUrl(url);
    if (!apiUrl) return false;

    const response = await fetch(apiUrl);

    const data = await response.json();
    console.log("MastodonPost", (data satisfies MastodonPost) ? true : false);
    return (data satisfies MastodonPost) ? true : false;
  } catch (error) {
    return false;
  }
};
