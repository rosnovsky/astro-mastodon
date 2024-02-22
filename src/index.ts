import { visit } from "unist-util-visit";
import fs from "node:fs";
import { mastodonCard } from "./components/MastodonCard.js";
import { processMDXFiles } from "./utils/processMDXFiles.js";
import "./output.css";

processMDXFiles().catch(console.error);
const urlsData = JSON.parse(fs.readFileSync("temp_urls.json", "utf8"));

export const remarkMastodonEmbed = () => {
  return (tree: any) => {
    visit(tree, "text", (node: any, index: any, parent: any) => {
      // if (node.value.startsWith('@@@')) parent.children.splice(index, 1);
      const data = urlsData.find((item: any) => node.value.includes(item.url));
      if (data) {
        const html = mastodonCard(data.embedData);
        const newNode = {
          type: "html",
          value: html,
        };
        console.log("Children of parent of the Node", parent);
      }
    });
  };
};
