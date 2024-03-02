import React from "react";
import { EmbedData } from "../types.js";
import { Media } from "./Media.js";
import {
  convertCustomEmojisToImages,
  convertPostContentToHTML,
} from "../utils/convertors.js";

type Props = {
  data: EmbedData;
};

export const Content = ({ data }: Props) => {
  const cleanHtml = convertPostContentToHTML(data.content);

  console.log(cleanHtml, data.emojis);

  const cleanHtmlWithEmojis = convertCustomEmojisToImages(
    cleanHtml,
    data.emojis,
  );

  return (
    <div className="w-full my-6">
      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: cleanHtmlWithEmojis,
        }}
      />
      <Media attachments={data.media_attachments} card={data.card} />
    </div>
  );
};
