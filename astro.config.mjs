import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import { remarkMastodonEmbed } from "astro-mastodon";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkMastodonEmbed],
  },
});
