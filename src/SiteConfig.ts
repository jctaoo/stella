import marked from "marked";
import Katex from "katex";
import Highlight from "highlight.js";
import * as serviceWorker from "./serviceWorker";
import store from "./Store";
import { DEFAULT_HIGHLIGHT_THEME } from "./Constant";

export default function doSiteConfig() {
  // highlight.js
  // TODO dynamic
  const theme = store.getState().config.code.highlightThemeName ?? DEFAULT_HIGHLIGHT_THEME;
  // @ts-ignore
  import(`highlight.js/styles/${theme}.css`);
  // marked
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
        const container = document.createElement('div');
        container.className = "code-container";

        const coloredBlock = document.createElement('div');
        coloredBlock.className = "colored-block"

        const lineBlock = document.createElement('div');
        lineBlock.className = "code-lines-block";

        const lines = code.split('\n');
        const newLines: string[] = [];
        const countOfLines = lines.length;
        for (let i = 0; i < countOfLines; i ++) {
          const line = lines[i];

          const numberBlock = document.createElement('span');
          numberBlock.innerText = (i + 1).toString();
          numberBlock.className = "code-lines-block-item hljs-comment";

          const coloredItemBlock = document.createElement('span');
          let newline = line;
          const isAdd = line.startsWith('+');
          const isDelete = line.startsWith('-');
          if (isAdd || isDelete) {
            coloredItemBlock.className = `colored-block-item colored-block-item-colored-${isAdd ? "add" : "delete"}`;
            newline = ' ' + newline.slice(1, newline.length);
          } else {
            coloredItemBlock.className = "colored-block-item";
          }
          newLines.push(newline);

          coloredBlock.appendChild(coloredItemBlock);
          lineBlock.appendChild(numberBlock);
        }
        const newCode = newLines.join("\n");

        container.appendChild(lineBlock);

        const preEle = document.createElement('pre');
        let codeEle = document.createElement('code');
        if (language) {
          codeEle.className = "language-" + language
        }
        preEle.appendChild(codeEle);
        codeEle.innerHTML = newCode;
        Highlight.highlightBlock(preEle);
        codeEle = preEle.firstChild! as HTMLElement;

        container.appendChild(codeEle);

        const newPreEle = document.createElement('pre');
        newPreEle.className = preEle.className;

        newPreEle.appendChild(coloredBlock);
        newPreEle.appendChild(container);

        return newPreEle.outerHTML;
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
    }
  });
  // service work
  serviceWorker.register();
}