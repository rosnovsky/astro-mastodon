import type { EmbedData, MastodonPost } from "../types.d.ts";

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
    !response.created_at
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
    media_attachments,
    card,
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
    media_attachments,
    card,
  };
};

/**
 * Function to convert a post "mention" in a post to a Mastodon API URL.
 * @param mention - The mention to convert. Mention should be in the format `@username@instance.domain:postId`.
 * @returns The Mastodon API URL for the post or `null` if the mention is invalid.
 */
export const convertMentionToApiUrl = (mention: string): string | null => {
  try {
    const parts = mention.split("@");
    if (parts.length < 3) return null;
    const [instance, postId] = parts[2].split(":");

    const apiUrl = new URL(`/api/v1/statuses/${postId}`, `https://${instance}`);

    return apiUrl.toString();
  } catch (error) {
    return null;
  }
};
