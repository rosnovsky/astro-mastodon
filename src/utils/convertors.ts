import type { EmbedData, MastodonPost } from "../types.d.ts";

/**
 * Function to convert a Mastodon post URL to an API URL.
 * @param url - The URL of the Mastodon post.
 * @returns The API URL for the Mastodon post or `null` if the URL is invalid.
 */
export const convertPostUrlToApiUrl = (url: string): string | null => {
  try {
    const postUrl = new URL(url);
    const instanceUrl = new URL(postUrl.origin);
    const postPart = postUrl.pathname;
    const postParts = postPart.split("/");

    if (postParts.length < 3) return null;

    const postId = postParts.pop();

    if (!postId || !postPart) return null;

    const apiUrl = new URL(`/api/v1/statuses/${postId}`, instanceUrl);
    return apiUrl.toString();
  } catch (error) {
    console.error("Error converting post URL to API URL: ", error);
    return null;
  }
};

/**
 * Function to convert a Mastodon API response to embed data.
 * @param response - The Mastodon API response.
 * @returns The embed data for the Mastodon post or `null` if the response is invalid.
 */
export const convertResponseToData = (
  response: MastodonPost,
): EmbedData | null => {
  if (
    !response.content ||
    !response.url ||
    !response.account ||
    !response.account.url ||
    !response.account.username ||
    !response.account.display_name ||
    !response.account.avatar ||
    !response.created_at ||
    !response.favourites_count ||
    !response.replies_count ||
    !response.reblogs_count
  ) {
    // temporary, until I figure out what items I can do without
    return null;
  }

  const {
    content,
    url,
    created_at,
    favourites_count,
    replies_count,
    reblogs_count,
    account,
  } = response;
  const { url: accountUrl, username, display_name, avatar } = account;

  return {
    content,
    url,
    created_at,
    favourites_count,
    replies_count,
    reblogs_count,
    accountUrl,
    username,
    display_name,
    avatar,
  };
};
