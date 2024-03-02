# Astro Mastodon

Easily embed Mastodon posts into your Astro blog posts.

![Example in Dark Mode](./assets/example-dark.png)

![Example in Light Mode](./assets/example-light.png)

## How to use

Install the package:

```shell
pnpm add astro-mastodon
```

Update your `astro.config.mjs` file:

```js
// Other imports
import { remarkMastodonEmbed } from "astro-mastodon";

export default defineConfig({
  // ...
  markdown: {
    remarkPlugins: [
      remarkMastodonEmbed, // other plugins
    ],
  },
  // ...
});
```

Add `import "astro-mastodon/dist/output.css"` at the top of your post template file (e.g. `src/pages/blog/[slug]/index.astro`)

In your markdown file, add post "mention":

```markdown
---
title: Embeds FTW!
---

This is an example of an embedded Mastodon post:

`@rosnovsky@lounge.town:109860863149734322`
```

The anatomy of the embed is as follows:

`@username@instance.domain:postId`

## Development

Clone the repo and run

```sh
pnpm i
pnpm dev
```

Open `http://localhost:4321` and have fun!

## Features

- [x] Embed Mastodon posts in any Astro component
- [x] Embed Mastodon posts in `mdx` [content](https://docs.astro.build/en/guides/content-collections/) files
- [x] Embed posts in [plain `markdown` content](https://docs.astro.build/en/guides/markdown-content/)
- [x] Embeds are generated at build time (no client-side JavaScript)
- [x] Install `Astro Mastodon` as [Astro Integration](https://astro.build/integrations/) with `astro add`
- [x] Handle embedded images, video, audio, OpenGraph previews, etc.
- [ ] Embed profiles, polls, posts with media attachments
- [ ] Embed other ActivityPub post types (PeerTube videos, BookWyrm books, Pixelfed photos, etc)
