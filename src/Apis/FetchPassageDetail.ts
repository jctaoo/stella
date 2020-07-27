import PassageDetail, { demoPassageDetail } from "../Models/PassageDetail";

// TODO
function fetchPassageDetail(identifier: string): Promise<PassageDetail | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(demoPassageDetail);
    }, 2000);
  });
}

export default fetchPassageDetail;