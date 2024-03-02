// import { Image } from 'astro:assets'
import { EmbedData, MediaAttachment } from "../types.js";
import { validateYouTube } from "../utils/validators.js";
import React from "react";

type Props = {
  attachments: EmbedData["media_attachments"];
  card: EmbedData["card"];
};

/**
 * This component is used to display video and gifv attachments.
 * @param media - The media attachment to display.
 * @returns A video element if the media is a gifv or video, or null if the media is not a gifv or video.
 */
const VideoComponent = ({ media }: { media: MediaAttachment }) => {
  if (!media) return null;
  return (
    <video
      className="w-full"
      src={media.url}
      typeof="video/mp4"
      autoPlay
      muted
      playsInline
      loop
    />
  );
};

/**
 * This component is used to display image attachments.
 * @param media - The media attachment to display.
 * @returns An image element.
 */
const ImageComponent = ({ media }: { media: MediaAttachment }) => {
  return (
    // TODO: how can I use the `Image` component from Astro here?
    <img
      src={media.url}
      alt={media.description}
      className="w-full"
      width="200"
      height="150"
    />
  );
};

/**
 * This component is used to display YouTube cards.
 * @param {EmbedData["card"]} card - The card to display.
 * @returns An iframe element if the card is a YouTube video, or null if the card is not a YouTube video.
 */
const YoutubeComponent = ({ card }: { card: EmbedData["card"] }) => {
  if (!card) return null;

  const embedId = card.url.split("/").pop();
  if (!embedId) return null;

  return (
    <iframe
      className="w-full aspect-video"
      src={`https://youtube.com/embed/${embedId}`}
      height="300"
    />
  );
};

/* NOTE: 

Attachments are files uploaded by users directly to their instance (images, videos, audio, etc) 

Cards are embedded content from other websites (like YouTube, opengraph, etc) 

A post can have multiple attachments and at most one card
*/

/**
 * This component is used to display media attachments and cards in a Mastodon post.
 * @param attachments - The media attachments to display.
 * @param card - The card to display.
 * @returns A media component for a Mastodon post.
 */
export const Media = ({ attachments, card }: Props) => {
  return (
    <div>
      <div
        // TODO: this is bad. It should be a nice masonry layout.
        className={`hover:text-inherit w-full my-5 grid ${
          attachments!.length > 1 ? "grid-cols-2" : "grid-cols-1"
        } gap-4`}
      >
        {/* TODO: I hate these conditionals, here and below at `card`. Gotta move them out and replace with a maintainable component */}
        {attachments?.map((media) => (
          <a
            href={media.url}
            target="_blank"
            key={media.id}
            rel="noopener noreferrer"
          >
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
          rel="noopener noreferrer"
          target="_blank"
        >
          {validateYouTube(card.url) ? (
            <YoutubeComponent card={card} />
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
