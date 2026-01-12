import { SITE_NAME } from "@/modules/Globals";
import Head from "next/head";

interface SeoHeadProps {
  pageTitle: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogUrl?: string;
}

const DEFAULT_OG_IMAGE =
  "https://arosarealestate.com/assets/imgs/evworld.jpg";

const SeoHead = ({
  pageTitle,
  metaTitle,
  metaDescription,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogUrl = canonicalUrl || "https://www.evworld.ae/",
}: SeoHeadProps) => {
  return (
    <Head>
      {/* Basic SEO */}
      <title>{pageTitle}</title>
      {metaTitle && <meta name="title" content={metaTitle} />}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:type" content="website" />
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {metaDescription && (
        <meta name="twitter:description" content={metaDescription} />
      )}
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={pageTitle} />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default SeoHead;
