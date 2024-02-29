// import { Image } from 'astro:assets'
import { EmbedData } from "../types.js";
import React from "react";

type Props = {
  attachments: EmbedData["media_attachments"];
  card: EmbedData["card"];
};

export const Media = ({ attachments, card }: Props) => {
  return (
    <div>
      <div
        className={`hover:text-inherit w-full my-5 grid ${
          attachments!.length > 1 ? "grid-cols-2" : "grid-cols-1"
        } gap-4`}
      >
        {attachments!.map((media) => (
          <a href={media.url} target="_blank" key={media.id}>
            <img
              src={media.url}
              alt={media.description}
              className="w-full"
              width="200"
              height="150"
            />
          </a>
        ))}
      </div>
      {card && (
        <a
          className="no-underline flex flex-col justify-between dark:bg-slate-600 dark:bg-opacity-30 bg-blend-multiply p-5 hover:text-inherit"
          href={card!.url}
        >
          {card.image && (
            <img
              src={card.image}
              alt={card.title || card.description || ""}
              className="w-full"
              width={100}
              height={100}
            />
          )}
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-300 hover:text-inherit">
            {card!.title}
          </h1>
          <p className="prose hover:text-inherit">{card!.description}</p>
          <p className="text-right text-sm text-slate-400 hover:text-inherit">
            {card!.provider_name}
          </p>
        </a>
      )}
    </div>
  );
};
