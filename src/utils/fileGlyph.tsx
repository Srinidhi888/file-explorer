import {
  Brackets,
  File,
  FileCode,
  FileJson,
  FileText,
  Image,
} from "lucide-react";

type GlyphProps = {
  name: string;
  size?: number;
  className?: string;
};

function iconClassFor(name: string): string {
  const n = name.toLowerCase();
  if (n.endsWith(".tsx") || n.endsWith(".jsx")) {
    return "file-glyph file-glyph--react";
  }
  if (n.endsWith(".ts") || n.endsWith(".mts") || n.endsWith(".cts")) {
    return "file-glyph file-glyph--ts";
  }
  if (
    n.endsWith(".js") ||
    n.endsWith(".mjs") ||
    n.endsWith(".cjs")
  ) {
    return "file-glyph file-glyph--js";
  }
  if (n.endsWith(".json") || n.endsWith(".jsonc")) {
    return "file-glyph file-glyph--json";
  }
  if (
    n.endsWith(".css") ||
    n.endsWith(".scss") ||
    n.endsWith(".less")
  ) {
    return "file-glyph file-glyph--css";
  }
  if (n.endsWith(".md") || n.endsWith(".mdx")) {
    return "file-glyph file-glyph--md";
  }
  if (n.endsWith(".html") || n.endsWith(".htm")) {
    return "file-glyph file-glyph--html";
  }
  if (
    n.endsWith(".png") ||
    n.endsWith(".jpg") ||
    n.endsWith(".jpeg") ||
    n.endsWith(".gif") ||
    n.endsWith(".webp") ||
    n.endsWith(".svg")
  ) {
    return "file-glyph file-glyph--image";
  }
  return "file-glyph file-glyph--default";
}

export function FileGlyph({
  name,
  size = 16,
  className = "",
}: GlyphProps) {
  const base = iconClassFor(name);
  const n = name.toLowerCase();
  const cn = `${base} ${className}`.trim();

  if (n.endsWith(".json") || n.endsWith(".jsonc")) {
    return <FileJson size={size} className={cn} strokeWidth={1.75} />;
  }
  if (
    n.endsWith(".md") ||
    n.endsWith(".mdx") ||
    n.endsWith(".txt")
  ) {
    return <FileText size={size} className={cn} strokeWidth={1.75} />;
  }
  if (
    n.endsWith(".css") ||
    n.endsWith(".scss") ||
    n.endsWith(".less")
  ) {
    return <Brackets size={size} className={cn} strokeWidth={1.75} />;
  }
  if (
    n.endsWith(".png") ||
    n.endsWith(".jpg") ||
    n.endsWith(".jpeg") ||
    n.endsWith(".gif") ||
    n.endsWith(".webp") ||
    n.endsWith(".svg")
  ) {
    return <Image size={size} className={cn} strokeWidth={1.75} />;
  }
  if (
    n.endsWith(".tsx") ||
    n.endsWith(".jsx") ||
    n.endsWith(".ts") ||
    n.endsWith(".mts") ||
    n.endsWith(".cts") ||
    n.endsWith(".js") ||
    n.endsWith(".mjs") ||
    n.endsWith(".cjs") ||
    n.endsWith(".html") ||
    n.endsWith(".htm") ||
    n.endsWith(".vue") ||
    n.endsWith(".svelte")
  ) {
    return <FileCode size={size} className={cn} strokeWidth={1.75} />;
  }
  return <File size={size} className={cn} strokeWidth={1.75} />;
}
