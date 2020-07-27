import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import './Styles/Font.css';
import * as serviceWorker from './serviceWorker';
import HomePage from "./Pages/HomePage/HomePage";
import 'antd/dist/antd.css'
import marked from "marked";
import "highlight.js/styles/atom-one-dark.css"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import Highlight from "highlight.js";
import Katex from "katex";
import 'katex/dist/katex.min.css';

marked.setOptions({
  breaks: true,
  gfm: true,
})
marked.use({
  // @ts-ignore
  renderer: {
    // @ts-ignore
    listitem(text, task) {
      if (task) {
        return `<li class="task-list-item">${text}</li>\n`;
      }
      // use original renderer
      return false;
    },
    paragraph(text: string) {
      if (text.trim().startsWith("$$") && text.trim().endsWith("$$")) {
        let raw = text.trim();
        raw = raw.slice(2, raw.length - 2);
        const result = Katex.renderToString(raw, {throwOnError: false});
        return `<span class="latex">${result}</span>`;
      }
      return false;
    },
    code(code, language) {
      const preEle = document.createElement('pre');
      const codeEle = document.createElement('code');
      if (language) {
        codeEle.className = "language-" + language
      }
      preEle.appendChild(codeEle);
      codeEle.innerHTML = code;
      Highlight.highlightBlock(preEle);
      return preEle.outerHTML;
    },
    table(header: string, body: string) {
      const bodyRows = body.split("<tr>").filter((t) => t !== "")
      const oddClassName = "body-odd-row"
      const evenClassName = "body-even-row"
      const newBody = bodyRows.map((i, index) => {
        const rowString = "<tr>" + i
        if (index % 2 === 0) {
          return rowString.slice(0, 3) + ` class="${evenClassName}"` + rowString.slice(3)
        } else {
          return rowString.slice(0, 3) + ` class="${oddClassName}"` + rowString.slice(3)
        }
      }).join()
      return `<table>${header + newBody}</table>`;
    }
    // TODO code diff
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
