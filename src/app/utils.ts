import { APP_URL } from "./env";

export function constructCastActionUrl(params: { url: string }): string {
  const baseUrl = "https://warpcast.com/~/add-cast-action";
  const urlParams = new URLSearchParams({
    url: params.url,
  });

  return `${baseUrl}?${urlParams.toString()}`;
}

export function installUrl(languageCode: string): string {
  const actionUrl = `${APP_URL!}/frames/actions/translate?target=${languageCode}`;

  return constructCastActionUrl({ url: actionUrl });
}
