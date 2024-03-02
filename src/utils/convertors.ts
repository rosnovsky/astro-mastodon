import type { EmbedData, MastodonPost } from "../types.d.ts";
import DOMPurify from "isomorphic-dompurify";
import { generateMastodonEmbed } from "../generateMastodonEmbed.js";
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
    emojis,
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
    emojis,
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

/**
 * Function to convert a date string to a human-readable format.
 * @param input - The date string to convert.
 * @returns The date string in a human-readable format.
 */
export const convertDateToLocalString = (input: string): string => {
  try {
    const date = new Date(input).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "UTC",
    });

    return date;
  } catch (error) {
    console.error("Unable to parse date", error);
    return "Invalid Date";
  }
};

/**
 * This function converts custom emojis in a Mastodon post to images.
 * @param content - The content of the Mastodon post.
 * @param emojis - The custom emojis to convert.
 * @returns The content with custom emojis converted to images.
 */
export const convertCustomEmojisToImages = (
  content: string,
  emojis: EmbedData["emojis"],
) => {
  if (!emojis) return content;

  const sanitizedEmojis = emojis.map((emoji: EmbedData["emojis"]) => ({
    ...emoji,
    shortcode: DOMPurify.sanitize(emoji.shortcode),
  }));

  for (const emoji of sanitizedEmojis) {
    content = content.replace(
      new RegExp(`:${emoji.shortcode}:`, "g"),
      `<span class="inline-flex"><img src="${emoji.url}" alt="${emoji.shortcode}" className="inline object-contain h-4 w-4" width="26" /></span>`,
    );
  }

  return content;
};

/**
 * Function to convert a Mastodon post content to safe HTML.
 * @param content - The content of the Mastodon post.
 * @returns The content as safe HTML.
 */
export const convertPostContentToHTML = (content: string) =>
  DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ["a", "b", "i", "em", "strong", "br", "code", "pre"],
    ALLOWED_ATTR: ["href", "rel", "target"],
    ALLOW_ARIA_ATTR: true,
  });

/**
 * Function that converts an API URL to Mastodon post EmbedData.
 * @param {String} url The URL of the Mastodon post to fetch.
 * @returns {Promise<EmbedData | null>} A Promise of embed data for the Mastodon post or `null` if unable to fetch data.
 */
export const convertAPIUrlToEmbedData = async ({
  url,
}: {
  url: string;
}): Promise<EmbedData> => {
  const embedData: EmbedData = await generateMastodonEmbed({ url });
  return embedData;
};
