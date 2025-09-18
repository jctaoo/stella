import React, { HTMLAttributes } from "react";

import "./styles/index.scss";
import "./styles/font.scss";
import "katex/dist/katex.min.css";

interface HtmlProps {
  htmlAttributes: HTMLAttributes<unknown>;
  bodyAttributes: HTMLAttributes<unknown>;
  headComponents: unknown[];
  preBodyComponents: unknown[];
  postBodyComponents: unknown[];
  body: string;
}

export default function HTML(props: HtmlProps) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
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
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}
