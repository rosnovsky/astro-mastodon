import React from "react";
import sanitize from "sanitize-html";
import { EmbedData } from "../types.js";
import { Media } from "./Media.jsx";

type Props = {
  data: EmbedData;
};

export const Content = ({ data }: Props) => {
  const content = sanitize(data.content, {
    allowedTags: ["p", "a", "b", "i", "em", "strong"],
    allowedAttributes: {
      a: ["href"],
    },
  });

  return (
    <div className="w-full my-6">
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
      <Media attachments={data.media_attachments} card={data.card} />
    </div>
  );
};
