import assert from "node:assert";
import { describe, test } from "node:test";
import { validateMastodon } from "./validators.js";

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
});
