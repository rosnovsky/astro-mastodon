import assert from "node:assert";
import { describe, test } from "node:test";

import { generateEmbedHtml } from "./generateEmbedHtml.ts";
import { mastodonPost, mastodonEmbed } from "./fixtures.ts";
import { convertResponseToData } from "./convertors.ts";

describe("generateEmbedHtml", (t) => {
  test("should return an HTML string with the correct data", async (t) => {
    const embedData = convertResponseToData(mastodonPost);

    const html = generateEmbedHtml(embedData);

    assert.equal(html, mastodonEmbed);
  });

  test("should return null if the embedData is invalid", async (t) => {
    mastodonPost.content = "";
    const embedData = convertResponseToData(mastodonPost);

    const html = generateEmbedHtml(embedData);

    assert.equal(html, null);
  });
});
