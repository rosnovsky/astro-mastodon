import { MastodonPost } from "../types";

export const validateUrl = (url: string): boolean => {
  const sanitized = url.trim();
  try {
    new URL(sanitized);
    return true;
  } catch (error) {
    return false;
  }
};

export const validateMastodon = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return (data satisfies MastodonPost) ? true : false;
  } catch (error) {
    return false;
  }
};
