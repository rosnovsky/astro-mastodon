import type { MastodonPost } from "../types.d.ts";

/**
 * Function to validate that a URL points to a Mastodon post.
 * @param url - The URL to validate.
 * @returns A promise that resolves to `true` if the URL points to a Mastodon post and `false` otherwise.
 */
export const validateMastodon = async (url: string): Promise<boolean> => {
  if (!url) return false;
  try {
    const response = await fetch(url);

    const data = await response.json();

    return (data satisfies MastodonPost) ? true : false;
  } catch (error) {
    return false;
  }
};
