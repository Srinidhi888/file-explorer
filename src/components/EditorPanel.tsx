import { useEffect, useState } from "react";

import { FileCode, FolderOpen } from "lucide-react";

import type { TreeNodeType } from "../types/tree";

interface Props {
  selectedNode: TreeNodeType | null;
  onContentChange: (value: string) => void;
  onRenameFolder: (id: string, name: string) => void;
}

export default function EditorPanel({
  selectedNode,
  onContentChange,
  onRenameFolder,
}: Props) {
  const [folderNameDraft, setFolderNameDraft] = useState("");

  useEffect(() => {
    if (selectedNode?.type === "folder") {
      setFolderNameDraft(selectedNode.name);
    }
  }, [selectedNode?.id, selectedNode?.name, selectedNode?.type]);

  if (!selectedNode) {
    return (
      <div className="editor-empty">
        <div className="editor-empty-card">
          <FileCode
            size={40}
            strokeWidth={1.25}
            className="editor-empty-icon"
          />
          <p className="editor-empty-title">Nothing selected</p>
          <p className="editor-empty-hint">
            Pick a file from the explorer to edit its contents, or select a
            folder to rename it.
          </p>
        </div>
      </div>
    );
  }

  if (selectedNode.type === "folder") {
    const folder = selectedNode;

    function saveFolderName() {
      const next = folderNameDraft.trim();
      if (next && next !== folder.name) {
        onRenameFolder(folder.id, next);
      } else {
        setFolderNameDraft(folder.name);
      }
    }

    return (
      <div className="editor-folder">
        <header className="editor-breadcrumb">
          <FolderOpen
            size={16}
            strokeWidth={1.75}
            className="breadcrumb-icon"
          />
          <span className="breadcrumb-label">Folder</span>
        </header>
        <div className="editor-folder-body">
          <label className="field-label" htmlFor="folder-name">
            Name
          </label>
          <input
            id="folder-name"
            className="folder-name-input"
            value={folderNameDraft}
            onChange={(e) => setFolderNameDraft(e.target.value)}
            onBlur={saveFolderName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
          />
          <p className="folder-hint">
            Press Enter or click away to apply the new name.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-file">
      <header className="editor-breadcrumb">
        <FileCode
          size={16}
          strokeWidth={1.75}
          className="breadcrumb-icon breadcrumb-icon--file"
        />
        <span className="breadcrumb-name">{selectedNode.name}</span>
        <span className="breadcrumb-pill">UTF-8</span>
      </header>
      <textarea
        className="editor-textarea"
        spellCheck={false}
        value={selectedNode.content || ""}
        onChange={(e) => onContentChange(e.target.value)}
        aria-label={`Contents of ${selectedNode.name}`}
      />
    </div>
  );
}
