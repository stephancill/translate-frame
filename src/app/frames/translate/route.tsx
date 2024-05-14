import { redirect } from "frames.js/core";
import { GOOGLE_TRANSLATE_API_KEY, HUB_API_URL } from "../../env";
import { frames } from "../frames";

async function translateText(
  inputText: string,
  targetLanguage: string
): Promise<string> {
  const url = "https://translation.googleapis.com/language/translate/v2";
  const body = {
    q: inputText,
    target: targetLanguage,
    format: "text",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": GOOGLE_TRANSLATE_API_KEY!,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  // Check the response structure in documentation to navigate correctly. Assuming the path below.
  return data.data.translations[0].translatedText;
}

const handler = frames(async (ctx) => {
  const hash = ctx.searchParams.hash;
  const fid = ctx.searchParams.fid;

  const target = ctx.searchParams.target || "en";

  let languageCode = target.toLowerCase().slice(0, 2);
  const languageNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });
  const languageName = languageNames.of(languageCode);

  return redirect(`https://warpcast.sh/translate/${languageName}`);

  if (!hash) {
    return {
      image: <div tw="flex">No cast provided</div>,
    };
  }

  const castReq = await fetch(
    `${HUB_API_URL}/v1/castById?hash=${hash}&fid=${fid}`
  );

  if (!castReq.ok) {
    const text = await castReq.text();
    console.log("Error fetching cast: ", text, castReq.status);
    return {
      image: <div tw="flex">Error fetching cast: {castReq.status}</div>,
    };
  }

  const {
    data: {
      castAddBody: { text },
    },
  } = await castReq.json();

  const translation = await translateText(text, target);

  return {
    image: <div tw="flex p-10 text-[42px]">{translation}</div>,
  };
});

export const GET = handler;
export const POST = handler;
