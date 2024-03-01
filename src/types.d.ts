interface MastodonEmbedOptions {
  url: string;
}

export interface MediaAttachment {
  id: string;
  type: "image" | "video" | "gifv" | "unknown";
  url: string;
  preview_url: string;
  remote_url: string | null;
  text_url: string;
  meta: {
    focus: {
      x: number;
      y: number;
    };
    original: {
      width: number;
      height: number;
      size: string;
      aspect: number;
    };
    small: {
      width: number;
      height: number;
      size: string;
      aspect: number;
    };
  };
  description: string;
  blurhash: string;
  html: string;
}

interface MastodonPoll {
  id: string;
  expires_at: string;
  expired: boolean;
  multiple: boolean;
  votes_count: number;
  own_votes: number[];
  options: {
    title: string;
    votes_count: number;
  }[];
}

interface MastodonAccount {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  locked: boolean;
  bot: boolean;
  discoverable: boolean;
  group: boolean;
  created_at: string;
  note: string;
  url: string;
  uri: string;
  avatar: string;
  avatar_static: string;
  header: string;
  header_static: string;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  last_status_at: string;
  noindex: boolean;
  emojis: {
    shortcode: string;
    url: string;
    static_url: string;
    visible_in_picker: boolean;
  }[];
  roles: {
    id: string;
    name: string;
    color: string;
  }[];
  fields: {
    name: string;
    value: string;
    verified_at: string;
  }[];
}

// This appears to be a "oEmbed" kind of card for YouTube and other media.
interface MediaCard {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  type: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  provider_url?: string;
  html?: string;
  width?: number;
  height?: number;
  embed_url?: string;
  blurhash?: string;
}

export interface MastodonPost {
  id: string;
  created_at: string;
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
  account: MastodonAccount;
  media_attachments: MediaAttachment[];
  mentions: string[];
  tags: {
    name: string;
    url: string;
  }[];
  emojis: string[];
  card: MediaCard | null;
  poll: MastodonPoll | null;
}

export interface EmbedData {
  content: string;
  url: string;
  created_at: string;
  favourites_count: number;
  replies_count: number;
  reblogs_count: number;
  accountUrl: string;
  username: string;
  display_name: string;
  avatar: string;
  media_attachments: MediaAttachment[] | null;
  card: MediaCard | null;
  emojis: any;
}
