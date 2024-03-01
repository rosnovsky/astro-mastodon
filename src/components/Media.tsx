// import { Image } from 'astro:assets'
import { EmbedData, MediaAttachment } from "../types.js";
import React from "react";

type Props = {
  attachments: EmbedData["media_attachments"];
  card: EmbedData["card"];
};

const VideoComponent = ({ media }: { media: MediaAttachment }) => {
  if (!media) return null;
  return (
    <video
      className="w-full"
      src={media.url}
      typeof="video/mp4"
      autoPlay
      playsInline
      loop
    />
  );
};

const isYoutube = (url: string) => {
  return url.startsWith("https://www.youtube.com/");
};

const ImageComponent = ({ media }: { media: MediaAttachment }) => {
  return (
    <img
      src={media.url}
      alt={media.description}
      className="w-full"
      width="200"
      height="150"
    />
  );
};

const YoutubeComponent = ({ media }: { media: EmbedData["card"] }) => {
  if (!media) return null;

  const embedId = media.url.split("/").pop();
  if (!embedId) return null;

  return (
    <iframe
      className="w-full aspect-video"
      src={`https://youtube.com/embed/${embedId}`}
      height="300"
    />
  );
};

export const Media = ({ attachments, card }: Props) => {
  return (
    <div>
      <div
        className={`hover:text-inherit w-full my-5 grid ${
          attachments!.length > 1 ? "grid-cols-2" : "grid-cols-1"
        } gap-4`}
      >
        {attachments?.map((media) => (
          <a href={media.url} target="_blank" key={media.id}>
            {media.type === "gifv" ? (
              <VideoComponent media={media} />
            ) : (
              <ImageComponent media={media} />
            )}
          </a>
        ))}
      </div>
      {card && (
        <a
          className="no-underline rounded-md flex flex-col justify-between bg-violet-400 bg-opacity-30 dark:bg-violet-500 dark:bg-opacity-30 bg-blend-multiply p-5 hover:text-inherit"
          href={card!.url}
        >
          {isYoutube(card.url) ? (
            <YoutubeComponent media={card} />
          ) : (
            <>
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
            </>
          )}
        </a>
      )}
    </div>
  );
};
