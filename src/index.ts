import { visit } from "unist-util-visit";
import fs from "node:fs";
import { mastodonCard } from "./components/MastodonCard.js";
import { processMarkdownFiles } from "./utils/processMarkdownFiles.js";
import "./output.css";
import { convertMentionToApiUrl } from "./utils/convertors.js";

// TODO: Move this to pre-build hook (Astro? Vite? Rollup?)
processMarkdownFiles().catch(console.error);

export const remarkMastodonEmbed = () => {
  const urlsFile = fs.readFileSync(".urls.json", "utf8");
  if (!urlsFile) {
    throw new Error(
      "No .urls.json file found. Please run `processMarkdownFiles` before running this plugin.",
    );
  }
  const urlsData = JSON.parse(fs.readFileSync(".urls.json", "utf8"));

  return (tree: any) => {
    visit(tree, (node: any, index: any, parent: any) => {
      const regex = /@(.*?)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}):(\d+)/;
      const match = regex.exec(node.value);
      if (!match) return;
      const data = urlsData.find(
        (item: any) => item.url === convertMentionToApiUrl(match[0]),
      );
      if (data) {
        const html = mastodonCard(data.embedData);
        const newNode = {
          type: "html",
          value: html,
        };
        parent.children.splice(index, 1, newNode);
      }
    });
    // TODO: add this to Astro post-build hook
    // fs.unlinkSync(".urls.json");
  };
};
