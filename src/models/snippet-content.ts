import { BaseContentAbbr, BaseContentDetail } from "./base-content";

export interface SnippetAbbr extends BaseContentAbbr {
  codeRaw?: string
}

export interface SnippetDetail extends BaseContentDetail<SnippetAbbr> {

}
