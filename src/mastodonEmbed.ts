import type { EmbedData } from "./types.js";
import { generateMastodonEmbed } from "./generateMastodonEmbed.js";
import "./output.css";

export const mastodonEmbed = async ({ url }: { url: string }) => {
  const embedData: EmbedData = await generateMastodonEmbed({ url });
  return embedData;
};
