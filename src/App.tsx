import { useEffect, useMemo, useState } from "react";

import Toolbar from "./components/Toolbar";
import FileTree from "./components/FileTree";
import EditorPanel from "./components/EditorPanel";

import type { TreeNodeType } from "./types/tree";

import {
  addNode,
  deleteNode,
  findNode,
  renameNode,
  updateFileContent,
} from "./utils/treeHelpers";

type CreateTarget = {
  parentId: string | null;
  kind: "file" | "folder";
};

type DeleteTarget = {
  id: string;
  name: string;
  type: "file" | "folder";
};

const LS_KEY = "tree";

export default function App() {
  const [tree, setTree] = useState<TreeNodeType[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createTarget, setCreateTarget] = useState<CreateTarget | null>(
    null
  );
  const [createNameDraft, setCreateNameDraft] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(
    null
  );

  const selectedNode = useMemo(
    () =>
      selectedId ? findNode(tree, selectedId) ?? null : null,
    [tree, selectedId]
  );

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        setTree(JSON.parse(raw) as TreeNodeType[]);
      } catch {
        setTree([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(tree));
  }, [tree]);

  function openCreate(parentId: string | null, kind: "file" | "folder") {
    setCreateTarget({ parentId, kind });
    setCreateNameDraft(
      kind === "file" ? "untitled.txt" : "new-folder"
    );
  }

  function confirmCreate() {
    if (!createTarget) return;
    const name = createNameDraft.trim();
    if (!name) return;

    const newNode: TreeNodeType =
      createTarget.kind === "file"
        ? {
            id: crypto.randomUUID(),
            name,
            type: "file",
            content: "",
          }
        : {
            id: crypto.randomUUID(),
            name,
            type: "folder",
            children: [],
          };

    setTree(addNode(tree, createTarget.parentId, newNode));
    setCreateTarget(null);
    setCreateNameDraft("");
  }

  function cancelCreate() {
    setCreateTarget(null);
    setCreateNameDraft("");
  }

  function handleRename(id: string, name: string) {
    const next = name.trim();
    if (!next) return;
    setTree(renameNode(tree, id, next));
  }

  function requestDelete(id: string, name: string, type: "file" | "folder") {
    setDeleteTarget({ id, name, type });
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    setTree(deleteNode(tree, id));
    if (selectedId === id) {
      setSelectedId(null);
    }
    setDeleteTarget(null);
  }

  function cancelDelete() {
    setDeleteTarget(null);
  }

  function handleContentChange(value: string) {
    if (!selectedNode || selectedNode.type !== "file") return;

    setTree(updateFileContent(tree, selectedNode.id, value));
  }

  return (
    <div className="app">
      <header className="app-chrome">
        <h1 className="app-title">File Explorer</h1>
        <div className="app-chrome-spacer" aria-hidden />
      </header>

      <Toolbar
        onAddFile={() => openCreate(null, "file")}
        onAddFolder={() => openCreate(null, "folder")}
      />

      <div className="main-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span className="sidebar-heading">Explorer</span>
          </div>
          <div className="tree-scroll">
            <FileTree
              tree={tree}
              selectedId={selectedId}
              onSelect={(n) => setSelectedId(n.id)}
              onRequestDelete={requestDelete}
              onAddFile={(parentId) => openCreate(parentId, "file")}
              onAddFolder={(parentId) => openCreate(parentId, "folder")}
              onRename={handleRename}
            />
            {tree.length === 0 && (
              <p className="tree-empty">
                No files yet. Create a file or folder to get started.
              </p>
            )}
          </div>
        </aside>

        <main className="editor-pane">
          <EditorPanel
            selectedNode={selectedNode}
            onContentChange={handleContentChange}
            onRenameFolder={handleRename}
          />
        </main>
      </div>

      {createTarget && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={cancelCreate}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-dialog-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 id="create-dialog-title" className="modal-title">
              {createTarget.kind === "file" ? "New file" : "New folder"}
            </h2>
            <label className="modal-label" htmlFor="create-name">
              Name
            </label>
            <input
              id="create-name"
              className="modal-input"
              autoFocus
              value={createNameDraft}
              onChange={(e) => setCreateNameDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmCreate();
                if (e.key === "Escape") cancelCreate();
              }}
            />
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={cancelCreate}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={confirmCreate}
                disabled={!createNameDraft.trim()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={cancelDelete}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 id="delete-dialog-title" className="modal-title">
              Delete {deleteTarget.type}?
            </h2>
            <p className="modal-body">
              {deleteTarget.type === "folder"
                ? `This will remove the folder “${deleteTarget.name}” and everything inside it. This cannot be undone.`
                : `Remove “${deleteTarget.name}”? This cannot be undone.`}
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn--danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
