import { IMAGES } from "@/constants/constants";
import { HeadTemplateProps } from "@/types/general";
import Head from "next/head";

const HeadTemplate = ({ title }: HeadTemplateProps) => {
  const meta = {
    title: title ? `${title} ~ BCW` : "BCW",
    description: "Anonymously chat with the chaplain.",
    url: "https://www.babcock.tools",
    image: "https://www.babcock.tools/images/logo.jpeg",
    logo: IMAGES.logo.src,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <link rel="shortcut-icon" href={meta.logo} type="image/x-icon" />
      <link rel="icon" href={meta.logo} type="image/x-icon" />
      <meta name="description" content={meta.description} />
      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={meta.url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="BCW" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={meta.url.split("https://")[0]} />
      <meta property="twitter:url" content={meta.url} />
      <meta name="twitter:title" content="BCW" />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Head>
  );
};

export default HeadTemplate;
