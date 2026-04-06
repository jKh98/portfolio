import type { AppId } from "@/types";

/** Action triggered when a file is double-clicked */
export type FileAction =
  | { type: "download"; url: string }
  | { type: "openApp"; appId: AppId }
  | { type: "openUrl"; url: string };

/** A single node in the virtual file tree */
export interface FileNode {
  /** Display name */
  name: string;
  /** "folder" or a file extension hint */
  kind: "folder" | "pdf" | "txt" | "link";
  /** ISO date for display */
  modified: string;
  /** Children (only for folders) */
  children?: FileNode[];
  /** Action when double-clicked (only for files) */
  action?: FileAction;
}

/** Root of the virtual filesystem */
export const FILE_TREE: FileNode = {
  name: "~",
  kind: "folder",
  modified: "2025-01-01",
  children: [
    {
      name: "Documents",
      kind: "folder",
      modified: "2025-01-01",
      children: [
        {
          name: "Resume.pdf",
          kind: "pdf",
          modified: "2025-01-01",
          action: {
            type: "download",
            url: "/assets/documents/Jihad_Al-Khurfan_Resume.pdf",
          },
        },
        {
          name: "Resume_Detailed.pdf",
          kind: "pdf",
          modified: "2025-01-01",
          action: {
            type: "download",
            url: "/assets/documents/Jihad_Al-Khurfan_Resume_Detailed.pdf",
          },
        },
        {
          name: "Azure_AZ-900.pdf",
          kind: "pdf",
          modified: "2024-06-15",
          action: {
            type: "openUrl",
            url: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
          },
        },
      ],
    },
    {
      name: "Projects",
      kind: "folder",
      modified: "2025-01-01",
      children: [
        {
          name: "portfolio-v3",
          kind: "link",
          modified: "2025-01-01",
          action: {
            type: "openUrl",
            url: "https://github.com/jalkhurfan/portfolio",
          },
        },
        {
          name: "dga-platform",
          kind: "link",
          modified: "2024-06-01",
          action: { type: "openApp", appId: "projects" },
        },
        {
          name: "fintech-app",
          kind: "link",
          modified: "2023-09-01",
          action: { type: "openApp", appId: "projects" },
        },
        {
          name: "testing-platform",
          kind: "link",
          modified: "2023-03-01",
          action: { type: "openApp", appId: "projects" },
        },
        {
          name: "investment-calculator",
          kind: "link",
          modified: "2024-01-01",
          action: { type: "openApp", appId: "projects" },
        },
      ],
    },
    {
      name: "About.txt",
      kind: "txt",
      modified: "2025-01-01",
      action: { type: "openApp", appId: "profile" },
    },
    {
      name: "Contact.txt",
      kind: "txt",
      modified: "2025-01-01",
      action: { type: "openApp", appId: "contact" },
    },
  ],
};

/**
 * Resolve a path string (e.g. "~/Documents") to the corresponding FileNode.
 * Returns null if the path is invalid.
 */
export function resolveNode(path: string): FileNode | null {
  if (path === "~" || path === "") return FILE_TREE;

  const segments = path
    .replace(/^~\/?/, "")
    .split("/")
    .filter(Boolean);

  let current: FileNode = FILE_TREE;
  for (const seg of segments) {
    const child = current.children?.find((c) => c.name === seg);
    if (!child) return null;
    current = child;
  }
  return current;
}

/**
 * Build a breadcrumb-friendly path array from a path string.
 * e.g. "~/Documents" → ["~", "Documents"]
 */
export function pathSegments(path: string): string[] {
  if (path === "~" || path === "") return ["~"];
  return [
    "~",
    ...path
      .replace(/^~\/?/, "")
      .split("/")
      .filter(Boolean),
  ];
}
