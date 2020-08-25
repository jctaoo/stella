import React from "react";
import PassageDetail, { PassageDetailViewMode } from "../passage-detail/passage-detail";
import "./snippet-item.scss";
import { SnippetAbbr, SnippetDetail } from "../../models/snippet-content";

export default function SnippetItemView({ item }: { item: SnippetAbbr }) {
  const detail: SnippetDetail = {
    item: item,
    content: (item.abbr ?? "") + "\n" + (item.codeRaw ?? ""),
  }
  return (
    <PassageDetail className="snippet-item" passage={detail} mode={PassageDetailViewMode.Partial}/>
  );
}
