import { useLocation } from "@reach/router";
import { navigate } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { MouseEvent } from "react";

import { AppEnv, useEnv } from "../../hooks/useEnv";
import { About, BaseContentDetail, Tag } from "../../models/base-content";
import { Props } from "../../types";
import { openLink } from "../../utils";
import Footer from "../footer/footer";
import PassageAbout from "../passage-about/passage-about";
import PassageTitle from "../passage-title/passage-title";
import "./passage-detail.scss";


export enum PassageDetailViewMode {
  Full,
  Partial,
}

function PassageDetail({
  passage,
  mode = PassageDetailViewMode.Full,
  className,
  showFooter = true,
  onClickCategory = () => {},
  onClickTag = () => {},
}: Props<{
  passage: BaseContentDetail;
  mode?: PassageDetailViewMode;
  showFooter?: boolean;
  onClickCategory: (about: About, category?: string) => void;
  onClickTag: (about: About, tag: Tag) => void;
}>) {
  const onPassageContainerClick = (e: MouseEvent<HTMLElement>) => {
    const isLink = (e: HTMLElement) =>
      e.className.includes("passage-inner-link") &&
      e.tagName.toLocaleLowerCase() === "a";

    let currentElement = e.target as HTMLElement;

    while (
      !isLink(currentElement) &&
      !currentElement.isEqualNode(e.currentTarget)
    ) {
      if (currentElement.parentElement) {
        currentElement = currentElement.parentElement;
      } else {
        return;
      }
    }

    if (isLink(currentElement)) {
      e.preventDefault();
      const href = currentElement.getAttribute("href");
      if (typeof href === "string" && href.startsWith("./")) {
        e.preventDefault();
        navigate(href).then();
      } else if (typeof href === "string") {
        openLink(href);
      }
    }
  };

  return (
    <div className={`passage-container ${className ? className : ""}`}>
      {!!passage.topImage && mode === PassageDetailViewMode.Full ? (
        <GatsbyImage
          className="passage-top-image"
          image={passage.topImage}
          alt={passage.topImageAlt ?? ""}
        />
      ) : (
        <></>
      )}
      <div className="passage-title-container">
        {!!passage.circleImage && mode === PassageDetailViewMode.Full ? (
          <img
            alt={"头像"}
            src={passage.circleImage}
            className="passage-circle-image"
          />
        ) : (
          <></>
        )}
        <div className="passage-title">
          <PassageTitle title={passage.item.title} />
          {PassageDetailViewMode.Full !== mode ? (
            <></>
          ) : (
            <PassageAbout
              about={passage.item.about}
              onCategoryClick={onClickCategory}
              onTagClick={onClickTag}
            />
          )}
        </div>
      </div>
      <div
        className={`
          passage-content-container
          ${mode === PassageDetailViewMode.Partial ? "partial" : ""}
        `}
        id="passage-content-container"
        onClickCapture={onPassageContainerClick}
        dangerouslySetInnerHTML={{ __html: passage.content }}
        style={{
          marginTop: PassageDetailViewMode.Full !== mode ? 22 : undefined,
        }}
      />
      {PassageDetailViewMode.Full === mode ? (
        <></>
      ) : (
        <PassageAbout
          about={passage.item.about}
          onCategoryClick={onClickCategory}
          onTagClick={onClickTag}
        />
      )}
      {mode === PassageDetailViewMode.Full && !!showFooter ? <Footer /> : <></>}
    </div>
  );
}

export default PassageDetail;
