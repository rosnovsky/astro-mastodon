import { visit } from "unist-util-visit";
import { convertMentionToApiUrl } from "./utils/convertors.js";
import { Card } from "./components/Card.js";
import { generateMastodonEmbed } from "./generateMastodonEmbed.js";

export const remarkMastodonEmbed = () => {
  const transformer = async (tree: any) => {
    const nodesToProcess: { index: number; parent: any; apiUrl: string }[] = [];

    visit(tree, (node: any, index: any, parent: any) => {
      const regex = /@(.*?)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}):(\d+)/;
      const match = regex.exec(node.value);
      if (!match) return;
      const apiUrl = convertMentionToApiUrl(match[0]);

      if (apiUrl) {
        nodesToProcess.push({ index, parent, apiUrl });
      }
    });

    const getEmbedData = async (apiUrl: string) =>
      await generateMastodonEmbed({ url: apiUrl });

    const processNodes = async ({
      index,
      parent,
      apiUrl,
    }: {
      index: number;
      parent: any;
      apiUrl: string;
    }) => {
      const embedData = await getEmbedData(apiUrl);
      const html = Card(embedData);
      const newNode = {
        type: "html",
        value: html,
      };
      parent.children.splice(index, 1, newNode);
    };

    while (nodesToProcess.length) {
      const node = nodesToProcess.pop();
      if (!node) return;

      await processNodes(node);
    }
  };

  return transformer;
};
