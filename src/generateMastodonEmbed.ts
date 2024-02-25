import type { MastodonEmbedOptions, MastodonPost } from "./types.d.ts";
import { convertResponseToData } from "./utils/convertors.js";
import { validateMastodon } from "./utils/validators.js";

/**
 * Function to fetch and generate Mastodon embed data.
 * @param url {string} - The URL of the Mastodon post to fetch.
 * @returns The embed data for the Mastodon post or `null` if the URL is invalid.
 */
export const generateMastodonEmbed = async ({
  url,
}: MastodonEmbedOptions): Promise<any> => {
  if (!url) {
    return null;
  }

  try {
    const validMastodonUrl = await validateMastodon(url);
    if (!validMastodonUrl) {
      console.error("Not a valid Mastodon URL", url);
      return null;
    }

    const response = await fetch(url);
    const data = (await response.json()) as MastodonPost;

    if (!data) {
      console.error("Not a valid Mastodon post", url);
      return null;
    }

    const embedData = convertResponseToData(data);

    return embedData;
  } catch (error) {
    return null;
  }
};
