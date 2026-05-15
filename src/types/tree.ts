export type NodeType = "file" | "folder";

export interface TreeNodeType {
  id: string;
  name: string;
  type: NodeType;
  content?: string;
  children?: TreeNodeType[];
}