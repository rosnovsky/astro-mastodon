import { mastodonEmbed } from "../mastodonEmbed.js";
import fs from "node:fs";
import fg from "fast-glob";
import { convertMentionToApiUrl } from "./convertors.js";

/**
 * Processes markdown files, extracts all Mastodon mentions (`@username@instance.domain:postId`), fetches embed data for each mention, and then writes the extracted URLs and their embed data to a JSON file.
 * @returns {Promise<void>}
 */
export const processMarkdownFiles = async (): Promise<void> => {
  let urls: any = [];
  const paths = await fg(["src/content/**/*.md", "src/content/**/*.mdx"]);

  if (paths.length === 0) {
    console.error("No markdown or MDX files found");
    return;
  }

  paths.forEach((path) => {
    const content = fs.readFileSync(path, "utf8");
    if (!content) {
      console.error("No content found in", path);
      return;
    }

    const regex = /@(.*?)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}):(\d+)/;
    let match = regex.exec(content);

    if (match !== null) {
      urls.push({ url: convertMentionToApiUrl(match[0]) });
    }
  });

  fs.writeFileSync(".urls.json", JSON.stringify(urls, null, 2));

  const urlsToFetch = JSON.parse(fs.readFileSync(".urls.json", "utf8"));
  for (let item of urlsToFetch) {
    const data = await mastodonEmbed({ url: item.url });
    item.embedData = data;
  }
  fs.writeFileSync(".urls.json", JSON.stringify(urlsToFetch, null, 2));
};
