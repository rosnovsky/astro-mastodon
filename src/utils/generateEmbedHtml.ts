import { EmbedData } from "../types";

export const generateEmbedHtml = (
  embedData: EmbedData | null,
): string | null => {
  if (!embedData) {
    return null;
  }

  const {
    content,
    url,
    created_at,
    favourites_count,
    replies_count,
    reblogs_count,
    accountUrl,
    username,
    display_name,
    avatar,
  } = embedData;

  // temp
  return `<div><div><a href="${accountUrl}"><img src="${avatar}" alt="${display_name}" /><span>${display_name}</span><span>@${username}</span></a></div><div><div>${content}</div><a href="${url}">${created_at}</a><div><span>${favourites_count}</span><span>${replies_count}</span><span>${reblogs_count}</span></div></div></div>`;
};
