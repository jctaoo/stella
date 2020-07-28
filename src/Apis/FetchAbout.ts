import PassageDetail from "../Models/PassageDetail";
import { demoAboutAbbr } from "../Models/PassageAbbr";
import DemoAboutText from "../Resources/Text/DemoAboutText";

// TODO
function fetchAbout(): Promise<PassageDetail | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const detail: PassageDetail = {
        item: demoAboutAbbr,
        markdownRaw: DemoAboutText,
        topImage: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/crop-wheatering-with-you-trailer-moviedigger-1567956561.jpg?crop=0.5xw:1xh;center,top&resize=640:*",
        circleImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/220px-Steve_Jobs_Headshot_2010-CROP2.jpg",
      };
      resolve(detail);
    }, 200);
  });
}

export default fetchAbout;