import React, {HTMLAttributes} from 'react';
import doSiteConfig from "./SiteConfig";

import './Styles/index.scss';
import './Styles/Font.css';
import 'antd/dist/antd.css'
import 'katex/dist/katex.min.css';

interface HtmlProps {
  htmlAttributes: HTMLAttributes<any>
  bodyAttributes: HTMLAttributes<any>
  headComponents: any[]
  preBodyComponents: any[]
  postBodyComponents: any[]
  body: string
}

doSiteConfig();
export default function HTML(props: HtmlProps) {
  return (
    <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div
        id="___gatsby"
        className="root"
        dangerouslySetInnerHTML={{__html: props.body}}
      />
      {props.postBodyComponents}
    </body>
    </html>
  )
}