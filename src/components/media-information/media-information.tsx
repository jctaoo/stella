import React from "react";
import "./media-information.scss";
import { Popover } from "antd";
import { graphql, useStaticQuery } from "gatsby";
import SocialMedia from "../../models/social-media";

interface MediaInformationData {
  siteMetadata: { medias: SocialMedia[] };
}

function MediaInformation({ className = "" }: { className?: String }) {
  const medias = useStaticQuery<MediaInformationData>(graphql`
    {
      siteMetadata {
        medias {
          identifier
          iconName
          title
          link
          imageName
        }
      }
    }
  `).siteMetadata.medias;

  return (
    <ul className={`contact-list ${className}`}>
      {medias.map((item) => (
        <li className="contact-list-item ">
          <a
            href={`${item.link}`}
            key={item.identifier}
            aria-label={item.title}
          >
            {!!item.imageName ? (
              <Popover
                placement={"bottom"}
                content={<img src={item.imageName} alt="" />}
              >
                <span className={`icon-${item.iconName}`} />
              </Popover>
            ) : (
              <span className={`icon-${item.iconName}`} />
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default MediaInformation;
