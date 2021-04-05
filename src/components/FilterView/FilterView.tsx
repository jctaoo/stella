import { List, Popover } from "antd";
import React from "react";
import "./FilterView.scss";

interface FilterViewProps<T> {
  content?: string;
  showCancelButton?: boolean;
  description: string;
  cancelButtonTitle?: string;
  onCancelButtonClick?: () => void;
  dataSource: T[];
  onItemSelected: (item: T) => void;
  itemSelected: (item: T) => boolean;
  itemTitle: (item: T) => string;
}

function FilterView<T>(props: FilterViewProps<T>) {
  return (
    <span className="passage-filter-view">
      <Popover
        content={
          <FilterViewList
            dataSource={props.dataSource}
            onItemSelected={props.onItemSelected}
            itemSelected={props.itemSelected}
            itemTitle={props.itemTitle}
          />
        }
      >
        <p className="passage-filter-content passage-filter-text">
          {props.content}
        </p>
      </Popover>
      <p className="passage-filter-description passage-filter-text">
        {props.description}
      </p>
      {props.showCancelButton ? (
        <a
          className="passage-filter-cancel"
          onClick={props.onCancelButtonClick}
        >
          {props.cancelButtonTitle ?? "取消"}
        </a>
      ) : (
        <></>
      )}
    </span>
  );
}

interface FilterViewListProps<T> {
  dataSource: T[];
  onItemSelected: (item: T) => void;
  itemSelected: (item: T) => boolean;
  itemTitle: (item: T) => string;
}

function FilterViewList<T>(props: FilterViewListProps<T>) {
  return (
    <div className="navigation-link-popover">
      <List
        itemLayout="horizontal"
        dataSource={props.dataSource}
        renderItem={(item: T) => (
          <List.Item
            onClick={() => {
              props.onItemSelected(item);
            }}
            className={`navigation-link-popover-item ${
              props.itemSelected(item)
                ? "navigation-link-popover-item-selected"
                : ""
            }`}
          >
            <List.Item.Meta
              title={
                <span className="navigation-link-popover-selected">
                  {props.itemTitle(item)}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default FilterView;
