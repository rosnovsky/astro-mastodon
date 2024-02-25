import type { AstroIntegration, AstroIntegrationLogger } from "astro";
import { processMarkdownFiles } from "./utils/processMarkdownFiles.js";
import { remarkMastodonEmbed } from "./remarkPlugin.js";
import fs from "node:fs";

export { remarkMastodonEmbed };

export default function astroMastodon(): AstroIntegration {
  return {
    name: "astro-mastodon",
    hooks: {
      "astro:config:setup": async ({ logger }) => {
        logger.info("Config setup");
        logger.info("Processing markdown files");
        await processMarkdownFiles();
      },
      "astro:server:setup": async ({ logger, server }) => {
        logger.info("Server setup");
        server.watcher.on("change", async (event, file) => {
          if (event.includes(".md") || event.includes(".mdx")) {
            await processMarkdownFiles();

            server.hot.send({
              type: "update",
              updates: [
                {
                  type: "js-update",
                  path: event,
                  acceptedPath: event,
                  timestamp: Date.now(),
                },
                {
                  type: "css-update",
                  path: event,
                  acceptedPath: event,
                  timestamp: Date.now(),
                },
              ],
            });
            server.restart();
          }
        });
      },
      "astro:server:done": async ({ logger }) => {
        logger.info("Server shutting down...");
        logger.info("Cleaning up...");
        fs.unlinkSync(".urls.json");
      },
      "astro:build:setup": async ({ logger }) => {
        logger.info("Build step setup");
        logger.info("Generating and validating Mastodon links...");
        await processMarkdownFiles();
      },
      "astro:build:done": ({ logger }) => {
        logger.info("Build step done");
        fs.unlinkSync(".urls.json");
      },
    },
  };
}
