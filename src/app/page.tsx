import { fetchMetadata } from "frames.js/next";
import { APP_URL } from "./env";

export async function generateMetadata() {
  const frameMetadata = await fetchMetadata(`${APP_URL}/frames`);
  return {
    title: "Translation frame",
    description:
      "Easiest way to translate posts on farcaster - just install the action!",
    other: {
      ...frameMetadata,
    },
  };
}

export default function Home() {
  return <div>Translation frame</div>;
}
