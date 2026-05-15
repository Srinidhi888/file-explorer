import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";

import {
  ChevronRight,
  ChevronDown,
  FilePlus,
  Folder,
  FolderOpen,
  FolderPlus,
  Pencil,
  Trash2,
} from "lucide-react";

import type { TreeNodeType } from "../types/tree";
import { FileGlyph } from "../utils/fileGlyph";

interface Props {
  node: TreeNodeType;
  depth: number;
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

export default function TreeNode({
  node,
  depth,
  selectedId,
  onSelect,
  onRequestDelete,
  onAddFile,
  onAddFolder,
  onRename,
}: Props) {
  const [open, setOpen] = useState(true);
  const [renaming, setRenaming] = useState(false);
  const [draftName, setDraftName] = useState(node.name);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const isFolder = node.type === "folder";
  const isSelected = selectedId === node.id;
  const displayName =
    node.name.trim() ||
    (isFolder ? "Untitled folder" : "Untitled");
  useEffect(() => {
    setDraftName(node.name);
  }, [node.name]);

  useEffect(() => {
    if (renaming) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [renaming]);

  function commitRename() {
    const next = draftName.trim();
    setRenaming(false);
    if (next && next !== node.name) {
      onRename(node.id, next);
    } else {
      setDraftName(node.name);
    }
  }

  function onRowClick() {
    if (renaming) return;
    onSelect(node);
  }

  function onChevronClick(e: MouseEvent) {
    e.stopPropagation();
    if (!isFolder) return;
    setOpen((o) => !o);
  }

  return (
    <div className="tree-node">
      <div
        className={`node-row ${isSelected ? "node-row--selected" : ""} ${
          isFolder ? "node-row--folder" : ""
        }`}
        style={{ "--depth": depth } as CSSProperties & { "--depth": number }}
        onClick={onRowClick}
        role="treeitem"
        aria-expanded={isFolder ? open : undefined}
      >
        <div className="node-row-main">
          <button
            type="button"
            className={`chevron-hit ${
              !isFolder ? "chevron-hit--invisible" : ""
            }`}
            tabIndex={-1}
            aria-label={open ? "Collapse folder" : "Expand folder"}
            onClick={onChevronClick}
          >
            {isFolder ? (
              open ? (
                <ChevronDown size={16} strokeWidth={2} />
              ) : (
                <ChevronRight size={16} strokeWidth={2} />
              )
            ) : null}
          </button>

          {renaming ? (
            <input
              ref={renameInputRef}
              className="node-rename-input"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitRename();
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  setDraftName(node.name);
                  setRenaming(false);
                }
              }}
              onBlur={commitRename}
            />
          ) : (
            <>
              <span className="node-icon" aria-hidden>
                {isFolder ? (
                  open ? (
                    <FolderOpen
                      size={16}
                      strokeWidth={1.75}
                      className="folder-icon folder-icon--open"
                    />
                  ) : (
                    <Folder
                      size={16}
                      strokeWidth={1.75}
                      className="folder-icon"
                    />
                  )
                ) : (
                  <FileGlyph name={node.name} />
                )}
              </span>
              <span className="node-name" title={node.name || displayName}>
                {displayName}
              </span>
            </>
          )}
        </div>

        <span className="node-actions" onClick={(e) => e.stopPropagation()}>
          {isFolder && (
            <>
              <button
                type="button"
                className="node-action-btn"
                title="New file in folder"
                aria-label="New file in folder"
                onClick={() => onAddFile(node.id)}
              >
                <FilePlus size={15} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="node-action-btn"
                title="New folder inside"
                aria-label="New folder inside"
                onClick={() => onAddFolder(node.id)}
              >
                <FolderPlus size={15} strokeWidth={2} />
              </button>
            </>
          )}
          <button
            type="button"
            className="node-action-btn"
            title="Rename"
            aria-label="Rename"
            onClick={() => setRenaming(true)}
          >
            <Pencil size={15} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="node-action-btn node-action-btn--danger"
            title="Delete"
            aria-label="Delete"
            onClick={() =>
              onRequestDelete(node.id, node.name, node.type)
            }
          >
            <Trash2 size={15} strokeWidth={2} />
          </button>
        </span>
      </div>

      {isFolder && open && (
        <div className="tree-node-children" role="group">
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              depth={depth + 1}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              onRequestDelete={onRequestDelete}
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
              onRename={onRename}
            />
          ))}
        </div>
      )}
    </div>
  );
}
