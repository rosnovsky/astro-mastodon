import React from "react";
import { EmbedData } from "../types.js";
import { Content } from "./Content.js";
import { Heading } from "./Heading.js";
import { Footer } from "./Footer.js";
import { renderToString } from "react-dom/server";

type Props = {
  data: {
    accountUrl: string;
    avatar: string;
    created_at: string;
    display_name: string;
    username: string;
    content: string;
    favourites_count: number;
    reblogs_count: number;
    replies_count: number;
    url: string;
    media_attachments: EmbedData["media_attachments"];
    card: EmbedData["card"];
    emojis: EmbedData["emojis"];
  };
};

export const CardComponent = ({ data }: Props) => {
  return (
    <>
      <aside className="card w-full">
        <div className="card-content">
          <Heading data={data} />
          <Content data={data} />
          <Footer data={data} />
        </div>
      </aside>
    </>
  );
};

export const Card = (data: EmbedData) =>
  renderToString(<CardComponent data={data} />);
