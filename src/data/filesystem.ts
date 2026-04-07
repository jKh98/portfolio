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
  kind: "folder" | "pdf" | "txt" | "link" | "app";
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
  modified: "2025-06-01",
  children: [
    {
      name: "Applications",
      kind: "folder",
      modified: "2025-06-01",
      children: [
        {
          name: "Profile.app",
          kind: "app",
          modified: "2025-06-01",
          action: { type: "openApp", appId: "profile" },
        },
        {
          name: "Experience.app",
          kind: "app",
          modified: "2025-06-01",
          action: { type: "openApp", appId: "experience" },
        },
        {
          name: "Skills.app",
          kind: "app",
          modified: "2025-06-01",
          action: { type: "openApp", appId: "skills" },
        },
        {
          name: "Projects.app",
          kind: "app",
          modified: "2025-06-01",
          action: { type: "openApp", appId: "projects" },
        },
        {
          name: "Contact.app",
          kind: "app",
          modified: "2025-06-01",
          action: { type: "openApp", appId: "contact" },
        },
        {
          name: "Terminal.app",
          kind: "app",
          modified: "2025-06-01",
          action: { type: "openApp", appId: "terminal" },
        },
        {
          name: "Finder.app",
          kind: "app",
          modified: "2025-06-01",
          action: { type: "openApp", appId: "finder" },
        },
        {
          name: "Guestbook.app",
          kind: "app",
          modified: "2025-06-01",
          action: { type: "openApp", appId: "guestbook" },
        },
        {
          name: "Settings.app",
          kind: "app",
          modified: "2025-06-01",
          action: { type: "openApp", appId: "settings" },
        },
      ],
    },
    {
      name: "Documents",
      kind: "folder",
      modified: "2025-06-01",
      children: [
        {
          name: "Resume.pdf",
          kind: "pdf",
          modified: "2025-06-01",
          action: {
            type: "download",
            url: "/assets/documents/Jihad_Al-Khurfan_Resume.pdf",
          },
        },
        {
          name: "Resume_Detailed.pdf",
          kind: "pdf",
          modified: "2025-06-01",
          action: {
            type: "download",
            url: "/assets/documents/Jihad_Al-Khurfan_Resume_Detailed.pdf",
          },
        },
        {
          name: "Azure_AZ-900.pdf",
          kind: "pdf",
          modified: "2023-06-15",
          action: {
            type: "openUrl",
            url: "https://learn.microsoft.com/en-us/users/jalkhurfan/credentials/46c61e916fb16642",
          },
        },
      ],
    },
    {
      name: "Projects",
      kind: "folder",
      modified: "2025-06-01",
      children: [
        {
          name: "portfolio-v3",
          kind: "link",
          modified: "2025-06-01",
          action: {
            type: "openUrl",
            url: "https://github.com/jKh98/portfolio",
          },
        },
        {
          name: "denworld-travel",
          kind: "link",
          modified: "2024-06-01",
          action: {
            type: "openUrl",
            url: "https://denworldtravel.com",
          },
        },
        {
          name: "wa-automator",
          kind: "link",
          modified: "2024-01-01",
          action: {
            type: "openUrl",
            url: "https://github.com/jKh98/wa-automator",
          },
        },
        {
          name: "lead-crm",
          kind: "link",
          modified: "2023-06-01",
          action: { type: "openApp", appId: "projects" },
        },
        {
          name: "ngo-website",
          kind: "link",
          modified: "2023-03-01",
          action: { type: "openApp", appId: "projects" },
        },
        {
          name: "campaign-tracker",
          kind: "link",
          modified: "2023-01-01",
          action: { type: "openApp", appId: "projects" },
        },
        {
          name: "dukkani",
          kind: "link",
          modified: "2022-06-01",
          action: {
            type: "openUrl",
            url: "https://github.com/jKh98/dukkani",
          },
        },
      ],
    },
    {
      name: "About.txt",
      kind: "txt",
      modified: "2025-06-01",
      action: { type: "openApp", appId: "profile" },
    },
    {
      name: "Experience.txt",
      kind: "txt",
      modified: "2025-01-02",
      action: { type: "openApp", appId: "experience" },
    },
    {
      name: "Skills.txt",
      kind: "txt",
      modified: "2025-06-01",
      action: { type: "openApp", appId: "skills" },
    },
    {
      name: "Contact.txt",
      kind: "txt",
      modified: "2025-06-01",
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
