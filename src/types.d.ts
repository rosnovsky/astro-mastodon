interface MastodonEmbedOptions {
  url: string;
  size?: "small" | "medium" | "large";
}

interface MastodonPost {
  id: string;
  in_reply_to_id: string | null;
  in_reply_to_account_id: string | null;
  sensitive: boolean;
  spoiler_text: string;
  visibility: "public" | "unlisted" | "private" | "direct";
  language: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  edited_at: string | null;
  favourited: boolean;
  reblogged: boolean;
  muted: boolean;
  bookmarked: boolean;
  pinned: boolean;
  content: string;
  filtered: string[];
  reblog: MastodonPost | null;
  application: {
    name: string;
    website: string;
  };
  account: {};
  media_attachments: string[];
  mentions: string[];
  tags: {
    name: string;
    url: string;
  }[];
  emojis: string[];
  card: string | null;
  poll: string | null;
}
