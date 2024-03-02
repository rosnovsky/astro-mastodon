import assert from "node:assert";
import { describe, test } from "node:test";
import { validateMastodon, validateYouTube } from "./validators.js";

describe("validators", (t) => {
  test("validateMastodon", async (t) => {
    await t.test("should return true for valid Mastodon mentions", async () => {
      const isMastodon = await validateMastodon(
        "https://lounge.town/api/v1/statuses/109860863149734322",
      );
      assert.strictEqual(isMastodon, true);
    });

    await t.test("should return false for invalid Mastodon URLs", async () => {
      assert.strictEqual(await validateMastodon("https://example.com"), false);
    });
  });

  test("validateYouTube", async (t) => {
    await t.test("should return true for valid YouTube URLs", () => {
      assert.strictEqual(
        validateYouTube("https://www.youtube.com/watch?v=0zM3nApSvMg"),
        true,
      );
      assert.strictEqual(
        validateYouTube("https://www.youtube.com/embed/0zM3nApSvMg"),
        true,
      );
      assert.strictEqual(validateYouTube("https://youtu.be/0zM3nApSvMg"), true);
      assert.strictEqual(
        validateYouTube("https://youtube.com/shorts/AxQ1yyLRIeQ"),
        true,
      );
    });

    await t.test("should return false for invalid YouTube URLs", () => {
      assert.strictEqual(
        validateYouTube("https://www.youtoobe.com/watch?v=0zM3nApSvMg"),
        false,
      );
      assert.strictEqual(
        validateYouTube("https://www.youtoobe.com/embed/0zM3nApSvMg"),
        false,
      );
      assert.strictEqual(
        validateYouTube("https://youtoo.be/0zM3nApSvMg"),
        false,
      );
      assert.strictEqual(
        validateYouTube("https://youtoobe.com/shorts/AxQ1yyLRIeQ"),
        false,
      );
    });
  });
});
