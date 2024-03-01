import React from "react";
import { EmbedData } from "../types.js";
import { Content } from "./Content.js";
import { Heading } from "./Heading.js";
import { Footer } from "./Footer.js";
import { renderToString } from "react-dom/server";
import { SwitchComponent } from "./Switch.js";

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
      <aside className="min-w-72 max-w-2xl w-full sm:w-2xl mx-auto card">
        <div className="w-full h-full flex items-center justify-center sm:p-5 p-0">
          <div className="w-full mx-auto rounded-lg border-2 dark:border-violet-300 border-violet-800 p-5 text-slate-800 bg-violet-100 bg-opacity-100  dark:bg-violet-950 dark:bg-opacity-90 bg-blend-darken dark:text-slate-200">
            <Heading data={data} />
            <Content data={data} />
            <Footer data={data} />
          </div>
        </div>
      </aside>
    </>
  );
};

export const Card = (data: EmbedData) =>
  renderToString(<CardComponent data={data} />);
