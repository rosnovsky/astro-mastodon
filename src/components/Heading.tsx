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
    <div className="card-heading">
      <div className="card-title">
        <a
          href={data.accountUrl}
          target="_blank"
          className="no-underline"
          rel="noopener noreferrer"
        >
          <div className="w-14 h-14 mx-auto">
            <img
              src={data.avatar}
              alt={data.display_name}
              width="100"
              height="100"
              className="border-2 m-0 border-violet-700 object-cover w-full rounded-full"
            />
          </div>
        </a>
        <div className="user-info w-full flex flex-col pl-0 sm:pl-3 mx-auto ">
          <a
            href={data.accountUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pl-0 sm:pl-3"
          >
            <div className="mx-auto font-bold">{data.display_name}</div>
            <div className="mx-auto text-sm my-0">@{data.username}</div>
          </a>
        </div>
      </div>
      <MastodonLogo />
    </div>
  );
};
