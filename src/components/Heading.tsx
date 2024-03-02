import { EmbedData } from "../types.js";
import { MastodonLogo } from "./MastodonLogo.js";
import React from "react";

type Props = {
  data: EmbedData;
};

/**
 * This component is used to display the heading of a Mastodon post.
 * @param data - The data to display in the heading.
 * @returns A heading component for a Mastodon post.
 */
export const Heading = ({ data }: Props) => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex flex-col sm:flex-row justify-center w-full no-underline">
        <a
          href={data.accountUrl}
          target="_blank"
          className="no-underline justify-center"
          rel="noopener noreferrer"
        >
          <div className="w-14 h-14 mx-auto">
            <img
              src={data.avatar}
              alt={data.display_name}
              width="100"
              height="100"
              className="border-2 border-violet-700 object-cover w-full rounded-full"
            />
          </div>
        </a>
        <div className="w-full flex flex-col pl-0 sm:pl-3 mx-auto ">
          <a
            href={data.accountUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-center sm:text-left mx-auto sm:mx-0 hover:text-inherit"
          >
            <div className="mx-auto font-bold">{data.display_name}</div>
            <div className="mx-auto text-xs my-0">@{data.username}</div>
          </a>
        </div>
      </div>
      <MastodonLogo />
    </div>
  );
};
