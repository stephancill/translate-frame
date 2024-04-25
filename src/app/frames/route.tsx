import { Button } from "frames.js/next";
import { frames } from "./frames";
import { installUrl } from "../utils";

const handler = frames(async (ctx) => {
  const installEnglish = installUrl("en");
  const installSpanish = installUrl("es");
  const installKorean = installUrl("ko");

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="text-[52px] mb-4">Translation Action 🌎🌍🌏</div>
        <div tw="text-[36px]">
          Install language or search for language code e.g. 'en' for English
        </div>
      </div>
    ),
    textInput: "Search a language",
    buttons: [
      <Button action="post" target={"/search"}>
        🔎 Search
      </Button>,
      <Button action="link" target={installEnglish}>
        🇬🇧English
      </Button>,
      <Button action="link" target={installSpanish}>
        🇪🇸Spanish
      </Button>,
      <Button action="link" target={installKorean}>
        🇰🇷Korean
      </Button>,
    ],
  };
});

export const POST = handler;
export const GET = handler;
