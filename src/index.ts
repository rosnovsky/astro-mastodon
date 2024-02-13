export default function mastodonEmbed(
  url: string,
  options?: {
    size?: "small" | "medium" | "large";
  },
): string {
  return `<a href=${url}>Embed View: ${options?.size ?? "medium"}</a>`;
}
