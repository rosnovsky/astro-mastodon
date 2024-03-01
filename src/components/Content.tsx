import React from "react";
import sanitize from "sanitize-html";
import DOMPurify from "isomorphic-dompurify";
import { EmbedData } from "../types.js";
import { Media } from "./Media.js";

type Props = {
  data: EmbedData;
};

const handleCustomEmojis = (content: string, emojis: EmbedData["emojis"]) => {
  if (!emojis) return content;

  const sanitizedEmojis = emojis.map((emoji: EmbedData["emojis"]) => ({
    ...emoji,
    shortcode: emoji.shortcode.replace(/[^a-zA-Z0-9_-]/g, ""),
  }));

  for (const emoji of sanitizedEmojis) {
    content = content.replace(
      new RegExp(`:${emoji.shortcode}:`, "g"),
      `<span class="inline-flex"><img src="${emoji.url}" alt="${emoji.shortcode}" className="inline object-contain h-4 w-4" width="26" /></span>`,
    );
  }

  return content;
};

export const Content = ({ data }: Props) => {
  const content = sanitize(data.content, {
    allowedTags: ["p", "a", "b", "i", "em", "strong", "br", "code", "pre"],
    allowedAttributes: {
      a: ["href", "rel", "target"],
    },
  });

  const cleanHtml = DOMPurify.sanitize(content);

  return (
    <div className="w-full my-6">
      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: handleCustomEmojis(cleanHtml, data.emojis),
        }}
      />
      <Media attachments={data.media_attachments} card={data.card} />
    </div>
  );
};
