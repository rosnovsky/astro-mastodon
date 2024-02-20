import React, { useState, useEffect, useMemo } from "react";
import type { EmbedData } from "./types.d.ts";
import { generateMastodonEmbed } from "./generateMastodonEmbed.js";
import "../src/output.css";

import { MastodonCard } from "./components/MastodonCard.js";
import { CardSkeleton } from "./components/CardSkeleton.js";

export const MastodonEmbed = ({ url }: { url: string }) => {
  const [embedData, setEmbedData] = useState<EmbedData | null>(null);

  const memoizedEmbedData = useMemo(() => embedData, [embedData]);

  useEffect(() => {
    generateMastodonEmbed({ url }).then((data) => {
      setEmbedData(data);
    });
  }, [url]);

  if (!memoizedEmbedData) return <CardSkeleton />;

  return <MastodonCard data={memoizedEmbedData} />;
};
