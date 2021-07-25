import { ImageData } from "./base-content";

interface PageDescription {
  title: string;
  keywords: string[];
  description?: string;
  largeImage?: ImageData;
  largeImageAlt?: string;
}

export default PageDescription;
