import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSiteMetadata from '../../hooks/use-site-metadata';
import { CreativeCommons } from '../../models/creative-commons';
import './footer.scss';

// TODO 对 ccImage 的 undefined 处理
function CreativeCommonsView({ ccLink, ccImage }: { ccLink: string, ccImage?: string }) {
  return (
    <>
      <div className="creative-commons-container">
        <div className="cc-img">
          <a href={ccLink} target="_blank">
            <img src={ccImage} alt="知识共享许可协议" />
          </a>
        </div>
        <p className="cc-label">
          本作品采用
            <a href={ccLink} target="_blank" className="cc-link">
            知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
            </a>
            进行许可。
          </p>
      </div>
    </>
  );
}

function CopyrightView({ author }: { author: String }) {
  return (
    <>
      <p className="copyright-label">
        Copyright © 2021 {author}. 保留所有权利。
      </p>
      <p className="powered-label">
        Powered by stella
      </p>
    </>
  );
}

function Footer() {
  const { copyright } = useSiteMetadata();

  // TODO 优化
  const creativeCommons = !!copyright?.creativeCommons
    ? CreativeCommons[copyright!.creativeCommons! as string as keyof typeof CreativeCommons]
    : undefined;

  const [ccImage, setCCImage] = useState<string | undefined>();
  const ccName = creativeCommons?.slice(3); // remote 'cc-' prefix
  const ccLink = `http://creativecommons.org/licenses/${ccName}/4.0/`;

  useEffect(() => {
    if (!!creativeCommons) {
      import(`../../resources/images/${creativeCommons}.png`).then(ccImage => {
        setCCImage(ccImage.default);
      });
    }
  }, [creativeCommons]);

  return (
    <>
      <div className="footer">
        {
          !!copyright?.creativeCommons ?
            <CreativeCommonsView ccLink={ccLink} ccImage={ccImage} /> : <></>
        }
        {
          !!copyright?.author ?
            <CopyrightView author={copyright.author} /> : <></>
        }
      </div>
    </>
  );
}

export default Footer;
