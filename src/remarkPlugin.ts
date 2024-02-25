import { visit } from "unist-util-visit";
import fs from "node:fs";
import { mastodonCard } from "./components/MastodonCard.js";
import "./output.css";
import { convertMentionToApiUrl } from "./utils/convertors.js";

export const remarkMastodonEmbed = () => {
  const urlsFile = fs.readFileSync(".urls.json", "utf8");
  if (!urlsFile) {
    throw new Error(
      "No .urls.json file found. Please run `processMarkdownFiles` before running this plugin.",
    );
  }
  const urlsData = JSON.parse(fs.readFileSync(".urls.json", "utf8"));

  // TODO: Add correct types below
  return (tree: any) => {
    visit(tree, (node: any, index: any, parent: any) => {
      const regex = /@(.*?)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}):(\d+)/;
      const match = regex.exec(node.value);
      if (!match) return;
      const data = urlsData.find(
        (item: any) => item.url === convertMentionToApiUrl(match[0]),
      );
      if (data) {
        if (!data.embedData) return node;
        const html = mastodonCard(data.embedData);
        const newNode = {
          type: "html",
          value: html,
        };
        parent.children.splice(index, 1, newNode);
      }
    });
  };
};
