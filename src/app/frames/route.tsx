import { Button } from "frames.js/next";
import { frames } from "./frames";
import { installUrl } from "../utils";

const handler = frames(async (ctx) => {
  const installEnglish = installUrl("en");
  const installSpanish = installUrl("es");
  const installKorean = installUrl("ko");

  return {
    image: (
      <div className="flex">
        Install language or search for language code e.g. 'en' for English
      </div>
    ),
    textInput: "Search a language",
    buttons: [
      <Button action="post" target={"/search"}>
        🔎 Search
      </Button>,
      <Button action="link" target={installEnglish}>
        Install 🇬🇧English
      </Button>,
      <Button action="link" target={installSpanish}>
        Install 🇪🇸Spanish
      </Button>,
      <Button action="link" target={installKorean}>
        Install 🇰🇷Korean
      </Button>,
    ],
  };
});

export const POST = handler;
export const GET = handler;
