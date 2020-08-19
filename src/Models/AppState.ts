import Config from "./Config";
import PassageAbbr from "./Passage";
import { BaseContentDetail, ContentDetailState } from "./BaseContent";
import { SnippetAbbr } from "./Snippet";
import SocialMedia from "./SocialMedia";

interface AppState<ContentDetail extends BaseContentDetail = BaseContentDetail> {
  config: Config
  passages: PassageAbbr[]
  snippets: SnippetAbbr[]
  currentPassage?: ContentDetail | ContentDetailState
  socialMedias: SocialMedia[]
}

export default AppState;
