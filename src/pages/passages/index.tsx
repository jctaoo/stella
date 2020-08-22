import React from "react";
import "./passages.scss";
import { useFilter } from "../../services/use-filter";
import { navigate } from "gatsby";
import QueryString from "query-string";
import { graphql, PageProps } from "gatsby";
import { Tag } from "../../models/base-content";
import BasePage from "../../layout/base-page/base-page";
import FilterView from "../../components/FilterView/FilterView";
import PassageItem from "../../components/passage-item/passage-item";
import { PassageAbbr } from "../../models/passage-content";

interface PassageListPageData {
  allPassages: PassageAbbr[]
  allCategories: string[]
  allTags: Tag[]
}

export default function PassageListPage(props: PageProps<PassageListPageData>) {
  const [tagFilter, categoryFilter] = useFilter();

  const cancelCategoryFilter = () => {
    const search = QueryString.stringify({ tag: tagFilter });
    navigate(`/passages?${search}`, { replace: true });
  }

  const cancelTagFilter = () => {
    const search = QueryString.stringify({ category: categoryFilter });
    navigate(`/passages?${search}`, { replace: true });
  }

  const goToCategory = (category: string) => {
    const search = QueryString.stringify({ tag: tagFilter, category: category });
    navigate(`/passages?${search}`, { replace: true });
  }

  const goToTag = (tag: Tag) => {
    const search = QueryString.stringify({ tag: tag.title, category: categoryFilter });
    navigate(`/passages?${search}`, { replace: true });
  }

  let passages = props.data.allPassages
  passages = passages.filter(item => {
    let flag = true;
    if (tagFilter) {
      flag = item.about.tags.map(t => t.title.toLowerCase()).includes(tagFilter.toLowerCase());
    }
    if (categoryFilter) {
      flag = item.about.category?.toLowerCase() === categoryFilter;
    }
    return flag;
  })

  const tags: Tag[] = props.data.allTags;
  const categories: string[] = props.data.allCategories;

  return (
    <BasePage id="passage-list-page">
      <div className="passage-list-container">
        { /* 若需要隐藏 passage-list-title 则应用 passage-list-title-hide class */ }
        <span className="passage-list-title">
          <FilterView
            content={categoryFilter ? categoryFilter : "所有"}
            description={"分类的内容"}
            cancelButtonTitle={"取消"}
            onCancelButtonClick={cancelCategoryFilter}
            dataSource={categories}
            onItemSelected={goToCategory}
            itemSelected={category => category.toLowerCase() === categoryFilter?.toLowerCase()}
            itemTitle={category => category}
          />
          <FilterView
            content={tagFilter ? tagFilter : "所有"}
            description={"标签的内容"}
            cancelButtonTitle={"取消"}
            onCancelButtonClick={cancelTagFilter}
            dataSource={tags}
            onItemSelected={goToTag}
            itemSelected={tag => tag.title.toLowerCase() === tagFilter?.toUpperCase()}
            itemTitle={tag => tag.title}
          />
        </span>
        <div className="passage-list">
          {
            passages.map(item => (
              <PassageItem passage={item} key={item.identifier}/>
            ))
          }
        </div>
      </div>
    </BasePage>
  )
}

export const query = graphql`
  {
    allPassages {
      identifier
      title
      abbr
      about {
        updateTimes
        tags {
          id
          title
        }
        category
        readTime
      }
    }
    allCategories
    allTags {
      id
      title
    }
  }
`