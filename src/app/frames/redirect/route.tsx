import { frames } from "../frames";

export const POST = frames(async (ctx) => {
  return Response.redirect(ctx.searchParams.url, 302);
});
