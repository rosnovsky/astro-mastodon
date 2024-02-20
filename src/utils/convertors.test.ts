import assert from "node:assert";
import { describe, test } from "node:test";
import { convertPostUrlToApiUrl } from "./convertors.ts";

describe("convertors", (t) => {
  test("convertPostUrlToApiUrl", async (t) => {
    await t.test("should return a valid API URL", () => {
      const postUrl = "https://lounge.town/@rosnovsky/109860863149734322";

      const apiUrl = convertPostUrlToApiUrl(postUrl);

      assert.strictEqual(
        apiUrl,
        "https://lounge.town/api/v1/statuses/109860863149734322",
      );
    });

    await t.test("should return null for invalid URLs", () => {
      const postUrl = "https://lounge.town/@rosnovsky";

      const apiUrl = convertPostUrlToApiUrl(postUrl);

      assert.strictEqual(apiUrl, null);
    });
  });
});
