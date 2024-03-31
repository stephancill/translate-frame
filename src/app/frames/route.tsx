import { frames } from "./frames";

const handler = frames(async (ctx) => {
  return {
    image: <div className="flex">Hello</div>,
  };
});

export const POST = handler;
export const GET = handler;
