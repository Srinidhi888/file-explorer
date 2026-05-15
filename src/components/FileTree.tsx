import type { TreeNodeType } from "../types/tree";

import TreeNode from "./TreeNode";

interface Props {
  tree: TreeNodeType[];
  selectedId: string | null;
  onSelect: (node: TreeNodeType) => void;
  onRequestDelete: (
    id: string,
    name: string,
    type: "file" | "folder"
  ) => void;
  onAddFile: (parentId: string) => void;
  onAddFolder: (parentId: string) => void;
  onRename: (id: string, name: string) => void;
}

export default function FileTree({
  tree,
  selectedId,
  onSelect,
  onRequestDelete,
  onAddFile,
  onAddFolder,
  onRename,
}: Props) {
  return (
    <div className="file-tree" role="tree">
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          depth={0}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
          onRequestDelete={onRequestDelete}
          onAddFile={onAddFile}
          onAddFolder={onAddFolder}
          onRename={onRename}
        />
      ))}
    </div>
  );
}
