import React from "react";
import "./snippets.scss"
import "./snippets.scss";
import { graphql, navigate, PageProps } from "gatsby";
import BasePage from "../../layout/base-page/base-page";
import { SnippetDetail } from "../../models/snippet-content";
import { NodeData, getNodesFromNodeData, NodeContentData, getContentFromNodeContentData } from "../../models/node-data";
import SEO from "../../components/SEO/SEO";
import useSiteMetadata from "../../hooks/use-site-metadata";
import PassageDetail, { PassageDetailViewMode } from "../../components/passage-detail/passage-detail";
import { Tag } from "../../models/base-content";
import { useFilter } from "../../hooks/use-filter";
import QueryString from "query-string";
import FilterView from "../../components/FilterView/FilterView";

interface SnippetsPageData {
  allSnippet: NodeData<SnippetDetail>
  allCategory: NodeContentData<string>
  allTag: NodeData<Tag>
}

export default function SnippetPage(props: PageProps<SnippetsPageData>) {
  const [tagFilter, categoryFilter] = useFilter();

  const cancelCategoryFilter = async () => {
    const search = QueryString.stringify({tag: tagFilter});
    await navigate(`/snippets?${search}`, {replace: true});
  }

  const cancelTagFilter = async () => {
    const search = QueryString.stringify({category: categoryFilter});
    await navigate(`/snippets?${search}`, {replace: true});
  }

  const goToCategory = async (category: string) => {
    const search = QueryString.stringify({tag: tagFilter, category: category});
    await navigate(`/snippets?${search}`, {replace: true});
  }

  const goToTag = async (tag: Tag) => {
    const search = QueryString.stringify({tag: tag.title, category: categoryFilter});
    await navigate(`/snippets?${search}`, {replace: true});
  }

  let snippets = getNodesFromNodeData(props.data.allSnippet);
  snippets = snippets.filter(item => {
    let flag = true;
    if (tagFilter) {
      flag = item.item.about.tags.map(t => t.title.toLowerCase()).includes(tagFilter.toLowerCase());
    }
    if (categoryFilter) {
      flag = item.item.about.category?.toLowerCase() === categoryFilter;
    }
    return flag;
  })

  const tags: Tag[] = getNodesFromNodeData(props.data.allTag);
  const categories: string[] = getContentFromNodeContentData(props.data.allCategory);

  const description = useSiteMetadata().pageDescription?.snippets;

  return (
    <BasePage id="snippet-page">
      <SEO description={description}/>
      <div className="snippet-list-container">
        { /* 若需要隐藏 passage-list-title 则应用 passage-list-title-hide class */}
        <div className="snippet-list-header-container">
          <span className="snippet-list-title">
            <FilterView
              content={!!categoryFilter ? categoryFilter : "所有"}
              description={"分类的内容"}
              cancelButtonTitle={"取消"}
              onCancelButtonClick={cancelCategoryFilter}
              dataSource={categories}
              onItemSelected={goToCategory}
              itemSelected={category => category.toLowerCase() === categoryFilter?.toLowerCase()}
              itemTitle={category => category}
              showCancelButton={!!categoryFilter}
            />
            <FilterView
              content={!!tagFilter ? tagFilter : "所有"}
              description={"标签的内容"}
              cancelButtonTitle={"取消"}
              onCancelButtonClick={cancelTagFilter}
              dataSource={tags}
              onItemSelected={goToTag}
              itemSelected={tag => tag.title.toLowerCase() === tagFilter?.toUpperCase()}
              itemTitle={tag => tag.title}
              showCancelButton={!!tagFilter}
            />
          </span>
        </div>
        <div className="snippet-list">
          {
            snippets.map(item => {
              return (
                <PassageDetail
                  className="snippet-item"
                  passage={item}
                  mode={PassageDetailViewMode.Partial}
                />
              );
            })
          }
        </div>
      </div>
    </BasePage>
  );
}

export const query = graphql`
  {
    allSnippet {
      edges {
        node {
          content
          item {
            abbr
            about {
              category
              tags {
                title
                id
              }
              readTime
              updateTimes
            }
            identifier
            title
            codeRaw
          }
        }
      }
    }
    allCategory {
      edges {
        node {
          internal {
            content
          }
        }
      }
    }
    allTag {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`
