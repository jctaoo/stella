import { BaseContentAbbr, BaseContentDetail } from "./base-content";

export interface SnippetAbbr extends BaseContentAbbr {
  codeRaw?: string;
}

export type SnippetDetail = BaseContentDetail<SnippetAbbr>;
