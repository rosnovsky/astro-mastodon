import { EmbedData } from "../types.js";
import React from "react";
import { convertDateToLocalString } from "../utils/convertors.js";

type Props = {
  data: EmbedData;
};

export const Footer = ({ data }: Props) => {
  const date = convertDateToLocalString(data.created_at);

  const yep = `<span class="text-emerald-700">&checkmark;</span>`;
  const nope = `<span class="text-slate-300 dark:text-slate-500">&cross;</span>`;

  const hasReposts = data.reblogs_count > 0;
  const hasReplies = data.replies_count > 0;
  const hasFavs = data.favourites_count > 0;

  const boosts = `${hasReposts ? `${yep} boosts` : `${nope} boosts`}`;
  const replies = `${hasReplies ? `${yep} replies` : `${nope} replies`}`;
  const favs = `${hasFavs ? `${yep} favs` : `${nope} favs`}`;

  return (
    <div className="w-full align-baseline">
      <div className="flex w-full justify-between text-xs align-baseline text-slate-600 dark:text-slate-400 ">
        <div className="w-48 flex justify-between">
          <span
            className="inline-block"
            dangerouslySetInnerHTML={{ __html: boosts }}
          />
          <span
            className="inline-block"
            dangerouslySetInnerHTML={{ __html: replies }}
          />
          <span
            className="inline-block"
            dangerouslySetInnerHTML={{ __html: favs }}
          />
        </div>
        <div>
          Posted on{" "}
          <a
            className="text-center sm:text-right underline"
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {date}
          </a>
        </div>
      </div>
    </div>
  );
};
