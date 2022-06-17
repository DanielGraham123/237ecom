import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "zp3e7chc",
  dataset: "production", // in development or production
  apiVersion: "2022-06-15", // date
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // autheniticated or unauthenticated usage
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
