import assert from "node:assert";
import { describe, test } from "node:test";
import {
  convertAPIUrlToEmbedData,
  convertCustomEmojisToImages,
  convertDateToLocalString,
  convertMentionToApiUrl,
} from "./convertors";
import { mastodonPostGuns } from "./fixtures";

describe("convertors", async () => {
  await test("convertMentionToApiUrl", async (t) => {
    await t.test("should return a URL string", () => {
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

  test("convertDateToLocaleString", async (t) => {
    await t.test("should return a string", () => {
      const date = new Date("2024-02-01T09:00:00Z").toISOString();

      const localeString = convertDateToLocalString(date);

      assert.strictEqual(localeString, "February 1, 2024 at 09:00");
    });

    await t.test("should return 'Invalid Date' back for invalid dates", () => {
      const date = "Haha! I'm not a date!";

      assert.equal(convertDateToLocalString(date), "Invalid Date");
    });
  });

  test("convertCustomEmojisToImages", async (t) => {
    await t.test(
      "should return the content with custom emojis converted to images",
      () => {
        const content = {
          content:
            "BOOM!<br>Touchdown Seahawks!!!!!!!<br>:seahawks: 🏈 <br>1️⃣ 2️⃣ ",
          emojis: [
            {
              shortcode: "seahawks",
              url: "https://s3.us-west-1.wasabisys.com/lounge-town/custom_emojis/images/000/000/402/original/4938f4914e2a7766.png",
              static_url:
                "https://s3.us-west-1.wasabisys.com/lounge-town/custom_emojis/images/000/000/402/static/4938f4914e2a7766.png",
              visible_in_picker: true,
            },
          ],
        };

        const convertedContent = convertCustomEmojisToImages(
          content.content,
          content.emojis,
        );

        assert.strictEqual(
          convertedContent,
          'BOOM!<br>Touchdown Seahawks!!!!!!!<br><span class="inline-flex"><img src="https://s3.us-west-1.wasabisys.com/lounge-town/custom_emojis/images/000/000/402/original/4938f4914e2a7766.png" alt="seahawks" className="inline object-contain h-4 w-4" width="26" /></span> 🏈 <br>1️⃣ 2️⃣ ',
        );
      },
    );

    await t.test("should return the content if no emojis are present", () => {
      const content = "Hello, world!";

      const convertedContent = convertCustomEmojisToImages(content, []);

      assert.strictEqual(convertedContent, "Hello, world!");
    });
  });

  test("convertAPIUrlToEmbedData", async (t) => {
    await t.test("should return embed data for a Mastodon post", async (t) => {
      const convertAPIUrlToEmbedDataMock = t.mock.fn(convertAPIUrlToEmbedData);

      const url = "https://lounge.town/api/v1/statuses/109860863149734322";

      const embedData = await convertAPIUrlToEmbedDataMock({ url });

      assert.equal(embedData.avatar, mastodonPostGuns.avatar);
    });
  });
});
