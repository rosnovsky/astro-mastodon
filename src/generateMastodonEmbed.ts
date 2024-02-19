// How do I turn this into a package with correct types and exports? Is there anything specific to Astro that I need to do?

// I also want to make it Astro-specific. Should it output HTML or should it output an Astro component?

// Where does rehype come into play? Does it, at all?

import { MastodonEmbedOptions, MastodonPost } from "./types.js";
import {
  convertPostUrlToApiUrl,
  convertResponseToData,
} from "./utils/convertors.js";
import { generateEmbedHtml } from "./utils/generateEmbedHtml.js";
import { validateUrl, validateMastodon } from "./utils/validators.js";

const sizeOptions = "small" || "medium" || "large";

/**
 * Function to generate an HTML embed for a Mastodon post.
 * The function returns `null` if the embed cannot be generated so that the caller can fall back to a link to the post (which most likely isn't a Mastodon post, doesn't exist, or is missing required data).
 * @param {MastodonEmbedOptions} options - The options for the Mastodon embed. Options include the URL of the Mastodon post and the size of the embed: `small`, `medium`, or `large`.
 * @returns {Promise<string | null>} - The HTML embed for the Mastodon post or `null` if embed cannot be generated.
 */
export const generateMastodonEmbed = async ({
  url,
  size,
}: MastodonEmbedOptions): Promise<any> => {
  if (!url || typeof url !== "string") {
    return null;
  }

  if (size && !size.includes(sizeOptions)) {
    size = "medium";
  }

  const validUrl = validateUrl(url);
  if (!validUrl) {
    return null;
  }

  try {
    const validMastodonUrl = await validateMastodon(url);
    if (!validMastodonUrl) {
      return null;
    }

    const apiUrl = convertPostUrlToApiUrl(url);
    if (!apiUrl) {
      return null;
    }

    const response = await fetch(apiUrl);
    const data = (await response.json()) as MastodonPost;

    if (!data) {
      return null;
    }

    const embedData = convertResponseToData(data);

    return embedData;
  } catch (error) {
    return null;
  }
};
