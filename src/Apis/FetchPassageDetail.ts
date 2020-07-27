import PassageDetail from "../Models/PassageDetail";
import { demoPassageAbbrs } from "../Models/PassageAbbr";
import DemoText from "../Resources/Text/DemoText";

// TODO
function fetchPassageDetail(identifier: string): Promise<PassageDetail | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = parseInt(identifier);
      if (isNaN(index)) {
        resolve(null);
      } else {
        const detail: PassageDetail = {
          item: demoPassageAbbrs[index],
          markdownRaw: DemoText,
        };
        resolve(detail);
      }
    }, 200);
  });
}

export default fetchPassageDetail;