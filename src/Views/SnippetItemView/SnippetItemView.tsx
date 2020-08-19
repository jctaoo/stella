import React from "react";
import PassageDetailView, { PassageDetailViewMode } from "../PassageDetailView/PassageDetailView";
import "./SnippetItemView.scss";
import { SnippetAbbr, SnippetDetail } from "../../Models/Snippet";

export default function SnippetItemView({ item }: { item: SnippetAbbr }) {
  const detail: SnippetDetail = {
    item: item,
    markdownRaw: (item.abbr ?? "") + "\n" + (item.codeRaw ?? ""),
  }
  return (
    <PassageDetailView className="snippet-item" passage={detail} mode={PassageDetailViewMode.Partial}/>
  );
}
