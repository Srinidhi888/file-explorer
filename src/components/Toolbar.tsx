import { FilePlus, FolderPlus } from "lucide-react";

interface Props {
  onAddFile: () => void;
  onAddFolder: () => void;
}

export default function Toolbar({ onAddFile, onAddFolder }: Props) {
  return (
    <div className="toolbar">
      <button
        type="button"
        className="toolbar-btn toolbar-btn--primary"
        onClick={onAddFile}
      >
        <FilePlus size={16} strokeWidth={2} aria-hidden />
        New file
      </button>

      <button
        type="button"
        className="toolbar-btn toolbar-btn--secondary"
        onClick={onAddFolder}
      >
        <FolderPlus size={16} strokeWidth={2} aria-hidden />
        New folder
      </button>
    </div>
  );
}
