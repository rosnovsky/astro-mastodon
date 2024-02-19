// How do I turn this into a package with correct types and exports? Is there anything specific to Astro that I need to do?

// I also want to make it Astro-specific. Should it output HTML or should it output an Astro component?

// Where does rehype come into play? Does it, at all?

export const MastodonEmbed = async ({
  url,
  size,
}: MastodonEmbedOptions): Promise<string> => {
  // Validate URL

  // Validate options

  // Build the full URL

  // Fetch the URL
  const response = await fetch(url);
  const data = (await response.json()) as MastodonPost;

  // Use helper function to generate the HTML

  // Return the HTML

  // Handle errors

  return `<a href=${url}>Embed View: ${size ?? "medium"}</a>`;
};
