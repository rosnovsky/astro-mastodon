import React, { useState, useEffect } from "react";
import { EmbedData } from "./types.js";
import { generateMastodonEmbed } from "./generateMastodonEmbed.js";
import { Skeleton } from "./components/ui/skeleton.js";
import "../src/output.css";

export const MastodonEmbed = ({ url }: { url: string }) => {
  const [embedData, setEmbedData] = useState<EmbedData | null>(null);

  useEffect(() => {
    generateMastodonEmbed({ url }).then((data) => {
      setEmbedData(data);
    });
  }, [url]);

  if (!embedData)
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  return (
    <div>
      <h1>{embedData.display_name}</h1>
      <p dangerouslySetInnerHTML={{ __html: embedData.content }}></p>
      <img src={embedData.avatar} alt={embedData.username} />
    </div>
  );
};
