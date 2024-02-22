import assert from "node:assert";
import { describe, test } from "node:test";
import { convertMentionToApiUrl } from "./convertors.js";

describe("convertors", (t) => {
  test("convertMentionToApiUrl", async (t) => {
    t.test("should return a URL string", () => {
      const mention = "@rosnovsky@lounge.town:109860863149734322";

      const apiUrl = convertMentionToApiUrl(mention);

      assert.strictEqual(
        apiUrl,
        "https://lounge.town/api/v1/statuses/109860863149734322",
      );
    });

    await t.test("should return null for invalid mentions", () => {
      const mention = "@111@@wooord.com:123:2000";

      assert.equal(convertMentionToApiUrl(mention), null);
    });
  });
});
