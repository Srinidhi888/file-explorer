# File Explorer

A VS Code–inspired file explorer with recursive folder structures, inline editing, persistent local state, and custom tree rendering.

Built using:
- React
- TypeScript
- Vite
- Lucide React Icons

The application supports nested folders and files with recursive rendering and local persistence using `localStorage`.

---

# Project Structure

```txt
src/
├── components/
│   ├── EditorPanel.tsx
│   ├── FileTree.tsx
│   ├── Toolbar.tsx
│   └── TreeNode.tsx
│
├── types/
│   └── tree.ts
│
├── utils/
│   └── treeHelpers.ts
│
├── App.tsx
├── main.tsx
└── styles.css
```

---

# Features

| Feature | Description |
|---|---|
| Create File | Create files from toolbar or inside folders |
| Create Folder | Create folders from toolbar or inside folders |
| Nested Structure | Unlimited recursive folder nesting |
| Edit File Content | Edit selected files in editor panel |
| Rename Files/Folders | Rename directly inside the tree |
| Delete Files/Folders | Delete nodes from the explorer |
| Expand / Collapse | Folder toggle support |
| Persistent State | Tree stored in browser localStorage |
| VS Code-style UI | Dark themed sidebar and editor layout |

---

# Constraints Followed

The following ready-made tree libraries were intentionally NOT used:

- react-arborist
- rc-tree
- react-complex-tree

The tree structure is implemented manually using recursive React components and utility functions.

---

# Tech Stack

- React
- TypeScript
- Vite
- Lucide React

---

# Getting Started

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

---

# Build

```bash
npm run build
```

---

# Architecture

The application uses recursive tree rendering for nested folders and files.

Core tree operations:
- addNode
- deleteNode
- renameNode
- updateFileContent

State management is handled using React state.

The entire tree structure is persisted in browser `localStorage`.

---

# UI Notes

The UI is inspired by the VS Code explorer layout:
- dark theme
- sidebar tree structure
- recursive nested folders
- hover interactions
- collapsible folders
- editor panel

---

# Assumptions

- Duplicate file/folder names are allowed.
- File contents are stored locally in browser storage.
- No backend/database is used.
- Data persistence is browser-specific.

---

# AI Assistance

LLMs were used during development as permitted in the assignment instructions.

Detailed AI-assisted development history is available in the submitted `chat-history.md` file.