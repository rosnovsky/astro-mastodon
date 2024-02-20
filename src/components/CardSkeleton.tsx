import React from "react";
import { MastodonLogo } from "./MastodonLogo.js";

export const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <aside className="w-2/3 mx-auto">
      <div className="w-full h-full flex items-center justify-center px-5 py-5">
        <div className="w-full mx-auto rounded-lg border-2 border-violet-300  p-5 text-gray-800">
          <a href={"#"} target="_blank" className=" no-underline p-0 m-0 ">
            <div className="w-full flex mb-4">
              <div className="w-14 h-14">
                <img
                  src={"#"}
                  alt=""
                  width={100}
                  height={100}
                  className="border-2 border-violet-700 object-cover w-full rounded-full"
                />
              </div>
              <div className="flex-col flex-grow pl-3">
                <p className="my-0 font-bold">John Mastodon</p>
                <p className="text-xs text-gray-600 my-0">@johnmastodon</p>
              </div>
              <div className="w-12 text-right">
                <a href={"#"} target="_blank">
                  <MastodonLogo className="text-violet-700 hover:text-violet-900" />
                </a>
              </div>
            </div>
          </a>
          <div className="w-full mb-4">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<p>John Mastodon for Mayor! John Mastodon for Mayor! John Mastodon for Mayor! John Mastodon for Mayor! John Mastodon for Mayor! John Mastodon for Mayor!</p>",
              }}
              className="prose prose-md"
            />
          </div>
          <div className="w-full align-baseline">
            <div className="flex text-xs justify-between text-gray-500 text-right">
              <div className="w-1/2 flex justify-between">
                <p>
                  Favs: <span className="font-bold">0</span>
                </p>
                <p>
                  Reblogs: <span className="font-bold">0</span>
                </p>
                <p>
                  Replies: <span className="font-bold">0</span>
                </p>
              </div>
              <a className="my-3" href={"#"} target="_blank">
                permalink
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
