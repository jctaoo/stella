import React from "react"
import "./MediaInformationView.scoped.scss"
import Popover from 'antd/lib/popover'
import WechatQRCode from "../../Resources/Images/wechat-qr.png"

function MediaInformationView({className = ""}: {className?: String}) {
  const items: { name: String, link: String }[] = [
    {name: "bilibili", link: "https://space.bilibili.com/155950817"},
    {name: "github", link: "https://github.com/jctaoo"},
    {name: "mail", link: "mailto:jctaoo@outlook.com"},
    {name: "twitter", link: ""},
    {name: "wechat", link: ""},
  ]

  return (
    <ul className={`contact-list ${className}`}>
      {
        items.map(({name, link}, index) =>
          <a href={`${link}`} className="contact-list-item " key={index}>
            {
              name !== "wechat" ?
                <span className={`icon-${name}`}/> :
                <Popover placement={"bottom"} content={
                  <img src={WechatQRCode} alt=""/>
                }>
                  <span className={`icon-${name}`}/>
                </Popover>
            }
          </a>
        )
      }
    </ul>
  )
}

export default MediaInformationView