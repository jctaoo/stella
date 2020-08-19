import React from "react"
import "./MediaInformationView.scss"
import Popover from 'antd/lib/popover'
import WechatQRCode from "../../Resources/Images/wechat-qr.png"
import SocialMedia from "../../Models/SocialMedia";
import { useSelector } from "react-redux";
import AppState from "../../Models/AppState";
import PassageAbbr from "../../Models/Passage";

function MediaInformationView({className = ""}: {className?: String}) {
  const items: { name: String, link: String }[] = [
    {name: "bilibili", link: "https://space.bilibili.com/155950817"},
    {name: "github", link: "https://github.com/jctaoo"},
    {name: "mail", link: "mailto:jctaoo@outlook.com"},
    {name: "twitter", link: ""},
    {name: "wechat", link: ""},
  ]


  let medias = useSelector<AppState, SocialMedia[]>(state => state.socialMedias);

  return (
    <ul className={`contact-list ${className}`}>
      {
        medias.map(item =>
          <a href={`${item.link}`} className="contact-list-item " key={item.identifier}>
            {
              !!item.imageName ?
                <Popover placement={"bottom"} content={
                  <img src={item.imageName} alt=""/>
                }>
                  <span className={`icon-${item.iconName}`}/>
                </Popover> :
                <span className={`icon-${item.iconName}`}/>
            }
          </a>
        )
      }
    </ul>
  )
}

export default MediaInformationView