import React from "react";
import FilterView from "../FilterView/FilterView";
import {
  cancelCategoryFilter,
  cancelTagFilter,
  jumpToPassagePage,
  jumpToSnippetsPage,
  useCategories,
  useFilter,
  useTags,
} from "../../componsitions/filter";
import { Tag } from "../../models/base-content";
import "./list-title.scss";

export enum ListTitleMode {
  passages,
  snippets,
}

function ListTitle({ mode }: { mode: ListTitleMode }) {
  const tags = useTags();
  const categories = useCategories();

  // TODO multiple category filter
  const [tagFilter, categoryFilter] = useFilter();
  const currentFilter = { tag: tagFilter, category: categoryFilter };

  function jumpTag(tag: Tag) {
    switch (mode) {
      case ListTitleMode.passages:
        jumpToPassagePage({ ...currentFilter, tag: tag.title }).then();
        break;
      case ListTitleMode.snippets:
        jumpToSnippetsPage({ ...currentFilter, tag: tag.title }).then();
        break;
    }
  }

  function jumpCategory(category: string) {
    switch (mode) {
      case ListTitleMode.passages:
        jumpToPassagePage({ ...currentFilter, category }).then();
        break;
      case ListTitleMode.snippets:
        jumpToSnippetsPage({ ...currentFilter, category }).then();
        break;
    }
  }

  return (
    <span className="passage-list-title">
      {/* 若需要隐藏 passage-list-title 则应用 passage-list-title-hide class */}
      <FilterView
        content={!!categoryFilter ? categoryFilter : "所有"}
        description={"分类的内容"}
        cancelButtonTitle={"取消"}
        onCancelButtonClick={() => cancelCategoryFilter(currentFilter)}
        dataSource={categories}
        onItemSelected={(category) => jumpCategory(category)}
        itemSelected={(category) =>
          category.toLowerCase() === categoryFilter?.toLowerCase()
        }
        itemTitle={(category) => category}
        showCancelButton={!!categoryFilter}
      />
      <FilterView
        content={!!tagFilter ? tagFilter : "所有"}
        description={"标签的内容"}
        cancelButtonTitle={"取消"}
        onCancelButtonClick={() => cancelTagFilter(currentFilter)}
        dataSource={tags}
        onItemSelected={(tag) => jumpTag(tag)}
        itemSelected={(tag) =>
          tag.title.toLowerCase() === tagFilter?.toUpperCase()
        }
        itemTitle={(tag) => tag.title}
        showCancelButton={!!tagFilter}
      />
    </span>
  );
}

export default ListTitle;
