// How do I turn this into a package with correct types and exports? Is there anything specific to Astro that I need to do?

// I also want to make it Astro-specific. Should it output HTML or should it output an Astro component?

// Where does rehype come into play? Does it, at all?

import { MastodonEmbedOptions, MastodonPost } from "./types";
import {
  convertPostUrlToApiUrl,
  convertResponseToData,
} from "./utils/convertors";
import { generateEmbedHtml } from "./utils/generateEmbedHtml";
import { validateUrl, validateMastodon } from "./utils/validators";

const sizeOptions = "small" || "medium" || "large";

export const MastodonEmbed = async ({
  url,
  size,
}: MastodonEmbedOptions): Promise<string | null> => {
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

  const validMastodonUrl = await validateMastodon(url);

  if (!validMastodonUrl) {
    return null;
  }

  const apiUrl = convertPostUrlToApiUrl(url);

  if (!apiUrl) {
    return null;
  }

  try {
    const response = await fetch(apiUrl);
    const data = (await response.json()) as MastodonPost;

    if (!data) {
      return null;
    }

    const embedData = convertResponseToData(data);
    const html = generateEmbedHtml(embedData);

    return html;
  } catch (error) {
    console.error(error);
    return null;
  }
};
