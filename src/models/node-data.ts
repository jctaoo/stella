export interface NodeData<Node = Record<string, unknown>> {
  edges: {
    node: Node;
  }[];
}

export interface NodeContentData<Content = Record<string, unknown>> {
  edges: {
    node: {
      internal: {
        content: Content;
      };
    };
  }[];
}

export function getNodesFromNodeData<Content = Record<string, unknown>>(
  data: NodeData<Content>
): Content[] {
  return data.edges.map((e) => e.node);
}

export function getContentFromNodeContentData<
  Content = Record<string, unknown>
>(data: NodeContentData<Content>): Content[] {
  return data.edges.map((e) => e.node.internal.content);
}
