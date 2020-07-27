import Config from "./Config";
import PassageAbbr from "./PassageAbbr";
import PassageDetail from "./PassageDetail";
import PassageDetailState from "./PassageDetailState";

interface AppState {

  config: Config

  passages: PassageAbbr[]

  currentPassage?: PassageDetail | PassageDetailState

}

export default AppState;