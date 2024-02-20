import assert from "node:assert";
import { describe, test } from "node:test";
import { validateUrl, validateMastodon } from "./validators.ts";

describe("validators", (t) => {
  test("validateUrl", async (t) => {
    await t.test("should return true for valid urls", () => {
      assert.strictEqual(validateUrl("https://example.com"), true);
    });

    await t.test("should return false for invalid urls", () => {
      assert.strictEqual(validateUrl("com"), false);
      assert.strictEqual(validateUrl("example.1"), false);
      assert.strictEqual(validateUrl(""), false);
      assert.strictEqual(validateUrl("email@domain.com"), false);
    });
  });

  test("validateMastodon", async (t) => {
    await t.test("should return true for valid Mastodon URLs", async () => {
      const isMastodon = await validateMastodon(
        "https://lounge.town/api/v1/statuses/109860863149734322",
      );
      assert.strictEqual(isMastodon, true);
    });

    await t.test("should return false for invalid Mastodon URLs", async () => {
      assert.strictEqual(await validateMastodon("https://example.com"), false);
    });
  });
});
