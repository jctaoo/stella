export interface NodeData<Node = object> {
  edges: {
    node: Node;
  }[];
}

export interface NodeContentData<Content = object> {
  edges: {
    node: {
      internal: {
        content: Content;
      };
    };
  }[];
}

export function getNodesFromNodeData<Content = object>(
  data: NodeData<Content>
): Content[] {
  return data.edges.map((e) => e.node);
}

export function getContentFromNodeContentData<Content = object>(
  data: NodeContentData<Content>
): Content[] {
  return data.edges.map((e) => e.node.internal.content);
}
