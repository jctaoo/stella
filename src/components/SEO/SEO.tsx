import React from "react";
import Helmet from "react-helmet";
import { useSelector } from "react-redux";

import useSiteMetadata from "../../hooks/use-site-metadata";
import AppState from "../../models/app-state";
import PageDescription from "../../models/page-description";

// XQR ----> SEO
function XQR({ description }: { description?: PageDescription }) {
  const siteMetadata = useSiteMetadata();
  const siteName = siteMetadata.config.siteName;
  const locale = siteMetadata.config.lang;
  const pathname = useSelector((state: AppState) => state.currentPathname);
  const href = `${siteMetadata.config.host}${pathname}`;
  const isHome = pathname === "/";
  const title = isHome
    ? description?.title ?? ""
    : `${siteName} | ${description?.title ?? ""}`;

  if (!description) {
    return <></>;
  }

  return (
    <Helmet defer={false} defaultTitle={siteName}>
      <html lang={locale} />
      <title>{title}</title>

      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />

      <link rel="canonical" href={href} />
      <meta name="keyword" content={description.keywords.join(",")} />
      {description.description ? (
        <meta name="description" content={description.description} />
      ) : undefined}

      <meta property="og:site_name" content={siteName} />
      {description.description ? (
        <meta property="og:description" content={description.description} />
      ) : undefined}
      <meta property="og:title" content={title} />
      <meta property="og:url" content={href} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      {description.largeImage ? (
        <meta
          property="og:image"
          content={`${siteMetadata.config.host}${description.largeImage}`}
        />
      ) : undefined}
      {description.largeImageAlt ? (
        <meta property="og:image:alt" content={description.largeImageAlt} />
      ) : undefined}
    </Helmet>
  );
}

export default XQR;
