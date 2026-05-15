import type { TreeNodeType } from "../types/tree";

export function addNode(
  tree: TreeNodeType[],
  parentId: string | null,
  newNode: TreeNodeType
): TreeNodeType[] {
  if (parentId === null) {
    return [...tree, newNode];
  }

  return tree.map((node) => {
    if (node.id === parentId && node.type === "folder") {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    }

    if (node.children) {
      return {
        ...node,
        children: addNode(node.children, parentId, newNode),
      };
    }

    return node;
  });
}

export function deleteNode(
  tree: TreeNodeType[],
  nodeId: string
): TreeNodeType[] {
  return tree
    .filter((node) => node.id !== nodeId)
    .map((node) => {
      if (node.children) {
        return {
          ...node,
          children: deleteNode(node.children, nodeId),
        };
      }

      return node;
    });
}

export function updateFileContent(
  tree: TreeNodeType[],
  nodeId: string,
  content: string
): TreeNodeType[] {
  return tree.map((node) => {
    if (node.id === nodeId) {
      return { ...node, content };
    }

    if (node.children) {
      return {
        ...node,
        children: updateFileContent(
          node.children,
          nodeId,
          content
        ),
      };
    }

    return node;
  });
}

export function findNode(
  tree: TreeNodeType[],
  id: string
): TreeNodeType | null {
  for (const node of tree) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function renameNode(
  tree: TreeNodeType[],
  nodeId: string,
  name: string
): TreeNodeType[] {
  return tree.map((node) => {
    if (node.id === nodeId) {
      return { ...node, name };
    }
    if (node.children) {
      return {
        ...node,
        children: renameNode(node.children, nodeId, name),
      };
    }
    return node;
  });
}