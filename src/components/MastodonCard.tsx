import React from "react";
import type { EmbedData } from "../types.d.ts";
import { MastodonLogo } from "./MastodonLogo.js";

type CardProps = {
  className?: string;
  data: EmbedData;
};

export function MastodonCard({ className, ...props }: CardProps) {
  const { data } = props;

  const date = new Date(data.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <aside className="w-2/3 mx-auto">
      <div className="w-full h-full flex items-center justify-center px-5 py-5">
        <div className="w-full mx-auto rounded-lg border-2 border-violet-300  p-5 text-gray-800">
          <a
            href={data.accountUrl}
            target="_blank"
            className=" no-underline p-0 m-0 "
          >
            <div className="w-full flex mb-4">
              <div className="w-14 h-14">
                <img
                  src={data.avatar}
                  alt={data.display_name}
                  width={100}
                  height={100}
                  className="border-2 border-violet-700 object-cover w-full rounded-full"
                />
              </div>
              <div className="flex-col flex-grow pl-3">
                <p className="my-0 font-bold">{data.display_name}</p>
                <p className="text-xs text-gray-600 my-0">@{data.username}</p>
              </div>
              <div className="w-12 text-right">
                <MastodonLogo className="text-violet-700 hover:text-violet-900" />
              </div>
            </div>
          </a>
          <div className="w-full mb-4">
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
              className="prose prose-md"
            />
          </div>
          <div className="w-full align-baseline">
            <div className="flex text-xs justify-between text-gray-500 text-right">
              <div className="w-1/2 flex justify-between">
                <p>
                  Favs:{" "}
                  <span className="font-bold">{data.favourites_count}</span>
                </p>
                <p>
                  Reblogs:{" "}
                  <span className="font-bold">{data.reblogs_count}</span>
                </p>
                <p>
                  Replies:{" "}
                  <span className="font-bold">{data.replies_count}</span>
                </p>
              </div>
              <a className="my-3" href={data.url} target="_blank">
                {date}
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
