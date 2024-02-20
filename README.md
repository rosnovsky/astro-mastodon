# Astro Mastodon

> Work in Progress

Easily embed Mastodon posts (and eventually other ActivityPub posts) into your Astro blog posts.

## How to use

### Use inside of Astro components

Install the package by running:

```shell
pnpm add astro-mastodon
```

In any `.astro` component, add

```typescript
---
import { MastodonEmbed } from 'astro-mastodon`
---

// use plain post url to embed a post
<MastodonEmbed url="https://lounge.town/@rosnovsky/109860863149734322" />

```

### Using witn MDX

Enable Astro [MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/):

```shell
pnpm astro add mdx
```

Install the package:

```shell
pnpm add astro-mastodon
```

In your MDX file, import the package and use it as you'd normally use an imported component:

```mdx
---
title: Embeds FTW!
---

import { MastodonEmbed } from "astro-mastodon";

This is an example of an embedded Mastodon post:

<MastodonEmbed url="https://lounge.town/@rosnovsky/109860863149734322" />
```

## Features

- [ ] Embed Mastodon posts in any Astro component
- [ ] Embed Mastodon posts in `mdx` [content](https://docs.astro.build/en/guides/content-collections/) files
- [ ] Embeds are generated at build time (no client-side JavaScript)
- [ ] Install Astro Mastodon as [Astro Integration](https://astro.build/integrations/) with `astro add`
- [ ] Embed profiles, polls, posts with media attachments
- [ ] Embed all of the above in [plain `markdown` content](https://docs.astro.build/en/guides/markdown-content/)
- [ ] Embed other ActivityPub post types (PeerTube videos, BookWyrm books, Pixelfed photos, etc)
