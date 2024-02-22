import { mastodonEmbed } from "../mastodonEmbed.js";
import fs from "node:fs";
import fg from "fast-glob";

export const processMDXFiles = async () => {
  let urls: any = [];
  const paths = await fg(["**/*.mdx"], { dot: true });

  paths.forEach((path) => {
    const content = fs.readFileSync(path, "utf8");
    const regex = /@@@(https:\/\/[^\s]+)/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      urls.push({ url: match[1] });
    }
  });

  fs.writeFileSync("temp_urls.json", JSON.stringify(urls, null, 2));

  const urlsToFetch = JSON.parse(fs.readFileSync("temp_urls.json", "utf8"));
  for (let item of urlsToFetch) {
    const data = await mastodonEmbed({ url: item.url }); // Implement this
    item.embedData = data;
  }
  fs.writeFileSync("temp_urls.json", JSON.stringify(urlsToFetch, null, 2));
};

processMDXFiles().catch(console.error);
