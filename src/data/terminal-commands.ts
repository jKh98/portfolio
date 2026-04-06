import type { AppId } from "@/types";

export interface CommandResult {
  output: string[];
  /** If set, triggers a window action */
  action?:
    | { type: "open-app" | "close-app"; appId: AppId }
    | { type: "set-theme"; theme: "dark" | "light" }
    | { type: "clear" };
}

export type CommandHandler = (
  args: string[],
  ctx: CommandContext,
) => CommandResult;

/** Shared mutable state across commands */
export interface CommandContext {
  /** Command history for the `history` builtin */
  history: string[];
}

// ---------------------------------------------------------------------------
// Virtual filesystem
// ---------------------------------------------------------------------------

interface FsNode {
  type: "dir" | "file";
  children?: Record<string, FsNode>;
  content?: string[];
}

const VIRTUAL_FS: FsNode = {
  type: "dir",
  children: {
    "About.txt": {
      type: "file",
      content: [
        "Jihad Al-Khurfan",
        "Senior Fullstack Engineer",
        "",
        "6+ years of experience building scalable web and mobile",
        "solutions. Specializing in React, TypeScript, Node.js,",
        "and cloud infrastructure across fintech, logistics, and",
        "government digital transformation projects.",
      ],
    },
    "Contact.txt": {
      type: "file",
      content: [
        "Email     jihadkhurfan@gmail.com",
        "LinkedIn  linkedin.com/in/jalkhurfan",
        "GitHub    github.com/jalkhurfan",
        "Location  Beirut, Lebanon",
      ],
    },
    "Resume.pdf": {
      type: "file",
      content: [
        "Jihad Al-Khurfan - Senior Fullstack Engineer",
        "----------------------------------------------",
        "6+ years | React, TypeScript, Node.js, Azure",
        "",
        "Download the full resume from the Profile app.",
      ],
    },
    Apps: {
      type: "dir",
      children: {
        "profile.app": {
          type: "file",
          content: ["Profile application bundle"],
        },
        "experience.app": {
          type: "file",
          content: ["Experience application bundle"],
        },
        "skills.app": { type: "file", content: ["Skills application bundle"] },
        "contact.app": {
          type: "file",
          content: ["Contact application bundle"],
        },
        "terminal.app": {
          type: "file",
          content: ["Terminal application bundle"],
        },
        "projects.app": {
          type: "file",
          content: ["Projects application bundle"],
        },
        "settings.app": {
          type: "file",
          content: ["Settings application bundle"],
        },
      },
    },
    Documents: {
      type: "dir",
      children: {
        "cover-letter.txt": {
          type: "file",
          content: [
            "Dear Hiring Manager,",
            "",
            "I am writing to express my interest in your engineering position.",
            "With 6+ years of full-stack experience and a passion for building",
            "elegant, scalable solutions, I believe I would be a great fit.",
            "",
            "Best regards,",
            "Jihad Al-Khurfan",
          ],
        },
        "tech-stack.md": {
          type: "file",
          content: [
            "# Tech Stack",
            "",
            "## Frontend",
            "- React 19, TypeScript, Next.js, Tailwind CSS",
            "- Framer Motion, Vite, Storybook",
            "",
            "## Backend",
            "- Node.js, NestJS, Express.js, Spring Boot, GraphQL",
            "",
            "## DevOps",
            "- Docker, GitHub Actions, GitLab CI, Azure, Firebase",
            "",
            "## Databases",
            "- PostgreSQL, MongoDB, SQL Server",
          ],
        },
      },
    },
    Projects: {
      type: "dir",
      children: {
        "portfolio-v3": {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# Portfolio v3",
                "",
                "macOS-inspired portfolio with 3D background,",
                "draggable windows, and a terminal emulator.",
                "",
                "Stack: React, TypeScript, Three.js, Tailwind CSS",
                "URL: https://jalkhurfan.com",
              ],
            },
            "package.json": {
              type: "file",
              content: [
                "{",
                '  "name": "portfolio-v3",',
                '  "version": "3.0.0",',
                '  "scripts": {',
                '    "dev": "vite",',
                '    "build": "tsc -b && vite build"',
                "  }",
                "}",
              ],
            },
            src: { type: "dir", children: {} },
            node_modules: { type: "dir", children: {} },
          },
        },
        "denworld-travel": {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# Denworld Travel",
                "",
                "Travel booking platform with flight search,",
                "curated travel packages, and service add-ons",
                "for a Danish travel agency.",
                "",
                "Stack: Next.js, TypeScript, Prisma, Framer Motion",
                "URL: https://denworldtravel.com",
              ],
            },
          },
        },
        "wa-automator": {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# WhatsApp Automator",
                "",
                "Desktop automation tool for scheduling messages,",
                "validating contacts, and processing media.",
                "",
                "Stack: Electron, React, Redux Toolkit, Firebase",
              ],
            },
          },
        },
        "lead-crm": {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# Lead Management CRM",
                "",
                "Role-based CRM with lead tracking, KPI dashboards,",
                "CSV import, and Excel export for an NGO.",
                "",
                "Stack: React, TypeScript, Firebase, Ant Design",
              ],
            },
          },
        },
        "ngo-website": {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# NGO Website",
                "",
                "Bilingual website with a back-office admin panel,",
                "news management, and event publishing.",
                "",
                "Stack: React, TypeScript, Firebase, Tailwind CSS",
              ],
            },
          },
        },
        "campaign-tracker": {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# Campaign Tracker",
                "",
                "Global campaign platform with real-time progress",
                "tracking and interactive map visualization.",
                "",
                "Stack: React, Firebase, D3.js, Maps",
              ],
            },
          },
        },
        dukkani: {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# Dukkani",
                "",
                "Mobile inventory management app with barcode",
                "scanning, product forms, and currency support.",
                "",
                "Stack: React Native, Expo, TypeScript",
              ],
            },
          },
        },
      },
    },
  },
};

let cwd = "~";

function resolvePath(path: string): string {
  if (path === "~" || path === "") return "~";
  if (path.startsWith("~/")) return path;
  if (path.startsWith("/")) return "~" + path;

  // Relative path
  const base = cwd === "~" ? [] : cwd.slice(2).split("/");
  const parts = path.split("/");

  for (const part of parts) {
    if (part === "." || part === "") continue;
    if (part === "..") {
      base.pop();
    } else {
      base.push(part);
    }
  }

  return base.length === 0 ? "~" : "~/" + base.join("/");
}

function getNode(path: string): FsNode | null {
  const resolved = resolvePath(path);
  if (resolved === "~") return VIRTUAL_FS;

  const parts = resolved.slice(2).split("/");
  let node: FsNode = VIRTUAL_FS;

  for (const part of parts) {
    if (!part) continue;
    if (node.type !== "dir" || !node.children?.[part]) return null;
    node = node.children[part];
  }

  return node;
}

/** Get completions for a partial path */
export function getPathCompletions(partial: string): string[] {
  const lastSlash = partial.lastIndexOf("/");
  const dirPath =
    lastSlash === -1 ? cwd : resolvePath(partial.slice(0, lastSlash) || ".");
  const prefix = lastSlash === -1 ? partial : partial.slice(lastSlash + 1);

  const dir = getNode(dirPath === cwd ? "." : dirPath);
  if (!dir || dir.type !== "dir" || !dir.children) return [];

  return Object.entries(dir.children)
    .filter(([name]) => name.toLowerCase().startsWith(prefix.toLowerCase()))
    .map(([name, node]) => {
      const base =
        lastSlash === -1 ? name : partial.slice(0, lastSlash + 1) + name;
      return node.type === "dir" ? base + "/" : base;
    });
}

// ---------------------------------------------------------------------------
// ASCII banner
// ---------------------------------------------------------------------------

// prettier-ignore
const ASCII_BANNER = [
  "      _ _ _               _      _    _ _  ___                 __",
  "     | (_) |__   __ _  __| |    / \\  | | |/ / |__  _   _ _ __ / _| __ _ _ __",
  "  _  | | | '_ \\ / _` |/ _` |   / _ \\ | | ' /| '_ \\| | | | '__|  _/ _` | '_ \\",
  " | |_| | | | | | (_| | (_| |  / ___ \\| | . \\| | | | |_| | |  |  _| (_| | | | |",
  "  \\___/|_|_| |_|\\__,_|\\__,_| /_/   \\_\\_|_|\\_\\_| |_|\\__,_|_|  |_|  \\__,_|_| |_|",
  "",
  "  Senior Fullstack Engineer | React, TypeScript, Node.js",
  "  Type 'help' to get started.",
  "",
];

// ---------------------------------------------------------------------------
// Neofetch
// ---------------------------------------------------------------------------

const NEOFETCH = [
  "       .:'          visitor@jalkhurfan.com",
  "      .:'           ──────────────────────",
  "    .:'             OS: Portfolio OS v3.0",
  "  .:'  ___          Host: jalkhurfan.com",
  " :'  .'   '.        Kernel: React 19 + Vite 6",
  "    :       :        Shell: terminal v1.0",
  "    :       :        Resolution: " +
    (typeof window !== "undefined"
      ? `${window.innerWidth}x${window.innerHeight}`
      : "1920x1080"),
  "     '.___.'         Theme: macOS Desktop",
  "                     Stack: TypeScript, React, TailwindCSS",
  "                     3D: Three.js + React Three Fiber",
  "                     Icons: Lucide React",
];

// ---------------------------------------------------------------------------
// App IDs
// ---------------------------------------------------------------------------

const VALID_APPS: AppId[] = [
  "profile",
  "experience",
  "skills",
  "contact",
  "terminal",
  "projects",
  "settings",
];

// ---------------------------------------------------------------------------
// Startup time (for uptime command)
// ---------------------------------------------------------------------------

const BOOT_TIME = Date.now();

// ---------------------------------------------------------------------------
// Command implementations
// ---------------------------------------------------------------------------

function helpCommand(): CommandResult {
  return {
    output: [
      "Available commands:",
      "",
      "  Navigation & Files",
      "  ──────────────────",
      "  ls [path]        List directory contents",
      "  cd <path>        Change directory",
      "  pwd              Print working directory",
      "  cat <file>       Display file contents",
      "  find <name>      Search for files by name",
      "  grep <pat> <f>   Search file contents",
      "  tree [path]      Show directory tree",
      "",
      "  Portfolio",
      "  ─────────",
      "  about            Short bio",
      "  skills           List skill categories",
      "  experience       Career summary",
      "  contact          Contact information",
      "  open <app>       Open an app window",
      "  close <app>      Close an app window",
      "",
      "  System",
      "  ──────",
      "  theme <mode>     Switch theme (dark/light)",
      "  whoami           Current user",
      "  hostname         System hostname",
      "  date             Current date & time",
      "  uptime           Session uptime",
      "  uname [-a]       System information",
      "  env              Environment variables",
      "  neofetch         System info display",
      "  echo <text>      Print text",
      "  history          Command history",
      "  clear            Clear terminal",
      "",
      "  Fun",
      "  ───",
      "  sudo hire me     You know you want to",
      "  rm -rf /         Try it",
      "  ping <host>      Ping a host",
      "  curl <url>       Fetch a URL",
      "  cowsay <text>    Moo",
      "  exit             Nice try",
    ],
  };
}

function aboutCommand(): CommandResult {
  return {
    output: [
      "Jihad Al-Khurfan",
      "Senior Fullstack Engineer",
      "",
      "6+ years of experience building scalable web and",
      "mobile solutions. Specializing in React, TypeScript,",
      "Node.js, and cloud infrastructure across fintech,",
      "logistics, and government digital transformation",
      "projects in MENA, Europe, and the US.",
    ],
  };
}

function skillsCommand(): CommandResult {
  return {
    output: [
      "Skill Categories:",
      "",
      "  Frontend   React, TypeScript, Next.js, Tailwind CSS, ...",
      "  Backend    Node.js, NestJS, Express.js, Spring Boot, ...",
      "  DevOps     Docker, GitHub Actions, Azure, Firebase, ...",
      "  Databases  PostgreSQL, MongoDB, SQL Server, ...",
      "  Testing    Jest, Cypress, Playwright, Cucumber, ...",
      "  Languages  JavaScript, TypeScript, Java, Python, ...",
      "",
      "  Run 'open skills' for the full interactive view.",
    ],
  };
}

function experienceCommand(): CommandResult {
  return {
    output: [
      "Career Summary:",
      "",
      "  2025-Present  Sr. Fullstack Engineer  @ CME Offshore",
      "  2022-2025     Sr. Frontend Engineer   @ CME Offshore",
      "  2021-2022     Full-Stack Engineer     @ CME Offshore",
      "  2020-2021     Jr. Full-Stack Engineer @ areeba",
      "  2019          Intern/Part-time        @ TecFrac",
      "  2018-2019     Intern                  @ NAR Technologies",
      "",
      "  Run 'open experience' for the full timeline.",
    ],
  };
}

function contactCommand(): CommandResult {
  return {
    output: [
      "Contact Information:",
      "",
      "  Email     jihadkhurfan@gmail.com",
      "  LinkedIn  linkedin.com/in/jalkhurfan",
      "  GitHub    github.com/jalkhurfan",
      "  Location  Beirut, Lebanon",
      "",
      "  Run 'open contact' for interactive contact card.",
    ],
  };
}

function openCommand(args: string[]): CommandResult {
  const appName = args[0]?.toLowerCase() as AppId;
  if (!appName) {
    return { output: ["Usage: open <app>", "Apps: " + VALID_APPS.join(", ")] };
  }
  if (!VALID_APPS.includes(appName)) {
    return {
      output: [`Unknown app: ${appName}`, "Apps: " + VALID_APPS.join(", ")],
    };
  }
  return {
    output: [`Opening ${appName}...`],
    action: { type: "open-app", appId: appName },
  };
}

function closeCommand(args: string[]): CommandResult {
  const appName = args[0]?.toLowerCase() as AppId;
  if (!appName) {
    return { output: ["Usage: close <app>"] };
  }
  if (!VALID_APPS.includes(appName)) {
    return { output: [`Unknown app: ${appName}`] };
  }
  return {
    output: [`Closing ${appName}...`],
    action: { type: "close-app", appId: appName },
  };
}

function themeCommand(args: string[]): CommandResult {
  const mode = args[0]?.toLowerCase();
  if (mode !== "dark" && mode !== "light") {
    return { output: ["Usage: theme <dark|light>"] };
  }
  return {
    output: [`Switching to ${mode} theme...`],
    action: { type: "set-theme", theme: mode },
  };
}

// ---- Filesystem commands ----

function pwdCommand(): CommandResult {
  const display =
    cwd === "~" ? "/home/visitor" : cwd.replace("~", "/home/visitor");
  return { output: [display] };
}

function cdCommand(args: string[]): CommandResult {
  const target = args[0] || "~";

  if (target === "-") {
    return { output: ["cd: OLDPWD not set"] };
  }

  const resolved = resolvePath(target);
  const node = getNode(resolved);

  if (!node) {
    return { output: [`cd: no such file or directory: ${target}`] };
  }
  if (node.type !== "dir") {
    return { output: [`cd: not a directory: ${target}`] };
  }

  cwd = resolved;
  return { output: [] };
}

function lsCommand(args: string[]): CommandResult {
  const showAll =
    args.includes("-a") || args.includes("-la") || args.includes("-al");
  const showLong =
    args.includes("-l") || args.includes("-la") || args.includes("-al");
  const pathArg = args.find((a) => !a.startsWith("-")) || ".";
  const resolved = pathArg === "." ? cwd : resolvePath(pathArg);
  const node = getNode(resolved);

  if (!node) {
    return {
      output: [`ls: cannot access '${pathArg}': No such file or directory`],
    };
  }
  if (node.type === "file") {
    return { output: [pathArg] };
  }
  if (!node.children) {
    return { output: [] };
  }

  const entries = Object.entries(node.children);
  const dotEntries: [string, FsNode][] = showAll
    ? [
        [".", { type: "dir" }],
        ["..", { type: "dir" }],
      ]
    : [];

  const all = [...dotEntries, ...entries];

  if (showLong) {
    const lines = all.map(([name, n]) => {
      const isDir = n.type === "dir";
      const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--";
      const size = n.content
        ? n.content.join("\n").length.toString().padStart(5)
        : isDir
          ? "  4096"
          : "     0";
      return `${perms}  1 visitor  staff  ${size}  ${name}${isDir ? "/" : ""}`;
    });
    return { output: lines };
  }

  const names = all.map(([name, n]) => (n.type === "dir" ? name + "/" : name));
  return { output: [names.join("  ")] };
}

function catCommand(args: string[]): CommandResult {
  if (args.length === 0) {
    return { output: ["Usage: cat <file>"] };
  }

  const target = args.join(" ");
  const resolved = resolvePath(target);
  const node = getNode(resolved);

  if (!node) {
    return { output: [`cat: ${target}: No such file or directory`] };
  }
  if (node.type === "dir") {
    return { output: [`cat: ${target}: Is a directory`] };
  }

  return { output: node.content ?? [] };
}

function treeCommand(args: string[]): CommandResult {
  const pathArg = args[0] || ".";
  const resolved = pathArg === "." ? cwd : resolvePath(pathArg);
  const node = getNode(resolved);

  if (!node) {
    return { output: [`tree: '${pathArg}': No such file or directory`] };
  }
  if (node.type !== "dir") {
    return { output: [pathArg] };
  }

  const displayName = resolved === "~" ? "." : resolved.split("/").pop() || ".";
  const lines: string[] = [displayName];
  let dirs = 0;
  let files = 0;

  function walk(n: FsNode, prefix: string) {
    if (n.type !== "dir" || !n.children) return;
    const entries = Object.entries(n.children);
    entries.forEach(([name, child], i) => {
      const isLast = i === entries.length - 1;
      const connector = isLast ? "└── " : "├── ";
      const suffix = child.type === "dir" ? "/" : "";
      lines.push(prefix + connector + name + suffix);

      if (child.type === "dir") {
        dirs++;
        walk(child, prefix + (isLast ? "    " : "│   "));
      } else {
        files++;
      }
    });
  }

  walk(node, "");
  lines.push("", `${dirs} directories, ${files} files`);
  return { output: lines };
}

function findCommand(args: string[]): CommandResult {
  if (args.length === 0) {
    return { output: ["Usage: find <name>"] };
  }

  const query = args.join(" ").toLowerCase();
  const results: string[] = [];

  function walk(node: FsNode, path: string) {
    if (node.type !== "dir" || !node.children) return;
    for (const [name, child] of Object.entries(node.children)) {
      const fullPath = path + "/" + name;
      if (name.toLowerCase().includes(query)) {
        results.push(fullPath + (child.type === "dir" ? "/" : ""));
      }
      if (child.type === "dir") {
        walk(child, fullPath);
      }
    }
  }

  walk(VIRTUAL_FS, "~");
  return {
    output:
      results.length > 0
        ? results
        : [`No files matching '${args.join(" ")}' found.`],
  };
}

function grepCommand(args: string[]): CommandResult {
  if (args.length < 2) {
    return { output: ["Usage: grep <pattern> <file>"] };
  }

  const pattern = args[0];
  const filePath = args.slice(1).join(" ");
  const resolved = resolvePath(filePath);
  const node = getNode(resolved);

  if (!node) {
    return { output: [`grep: ${filePath}: No such file or directory`] };
  }
  if (node.type === "dir") {
    return { output: [`grep: ${filePath}: Is a directory`] };
  }
  if (!node.content) {
    return { output: [] };
  }

  const re = new RegExp(pattern, "i");
  const matches = node.content.filter((line) => re.test(line));
  return { output: matches.length > 0 ? matches : [`(no matches)`] };
}

// ---- System commands ----

function whoamiCommand(): CommandResult {
  return { output: ["visitor"] };
}

function hostnameCommand(): CommandResult {
  return { output: ["jalkhurfan.com"] };
}

function dateCommand(): CommandResult {
  return { output: [new Date().toString()] };
}

function uptimeCommand(): CommandResult {
  const elapsed = Date.now() - BOOT_TIME;
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const m = minutes % 60;
  const s = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);

  return { output: [`up ${parts.join(" ")}`] };
}

function unameCommand(args: string[]): CommandResult {
  if (args.includes("-a")) {
    return {
      output: [
        "PortfolioOS 3.0.0 jalkhurfan.com React19-Vite6 browser " +
          (typeof navigator !== "undefined" ? navigator.platform : "unknown") +
          " Portfolio/3.0",
      ],
    };
  }
  return { output: ["PortfolioOS"] };
}

function envCommand(): CommandResult {
  return {
    output: [
      "USER=visitor",
      "HOME=/home/visitor",
      "SHELL=/bin/terminal",
      "TERM=portfolio-256color",
      "LANG=en_US.UTF-8",
      `PWD=${cwd === "~" ? "/home/visitor" : cwd.replace("~", "/home/visitor")}`,
      "HOSTNAME=jalkhurfan.com",
      "NODE_ENV=production",
      "VITE_VERSION=6",
      "REACT_VERSION=19",
    ],
  };
}

function echoCommand(args: string[]): CommandResult {
  const text = args.join(" ");

  // Handle $VAR expansion
  const expanded = text.replace(/\$(\w+)/g, (_match, varName: string) => {
    const vars: Record<string, string> = {
      USER: "visitor",
      HOME: "/home/visitor",
      SHELL: "/bin/terminal",
      HOSTNAME: "jalkhurfan.com",
      PWD: cwd === "~" ? "/home/visitor" : cwd.replace("~", "/home/visitor"),
    };
    return vars[varName] ?? "";
  });

  return { output: [expanded] };
}

function historyCommand(_args: string[], ctx: CommandContext): CommandResult {
  if (ctx.history.length === 0) {
    return { output: ["(no history)"] };
  }
  return {
    output: ctx.history.map(
      (cmd, i) => `  ${(i + 1).toString().padStart(4)}  ${cmd}`,
    ),
  };
}

function neofetchCommand(): CommandResult {
  return { output: NEOFETCH };
}

// ---- Fun commands ----

function sudoHireCommand(): CommandResult {
  return {
    output: [
      "Password: ********",
      "",
      "[sudo] Excellent choice!",
      "Sending hire request to Jihad Al-Khurfan...",
      "Request accepted! Check your inbox for next steps.",
      "",
      "(Just kidding -- but seriously, let's connect!)",
    ],
  };
}

function rmCommand(): CommandResult {
  return {
    output: [
      "rm: permission denied",
      "This portfolio is too precious to delete.",
      "Besides, it's all client-side anyway.",
    ],
  };
}

function pingCommand(args: string[]): CommandResult {
  const host = args[0] || "google.com";
  const ip =
    host === "google.com"
      ? "142.250.80.46"
      : `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  return {
    output: [
      `PING ${host} (${ip}): 56 data bytes`,
      `64 bytes from ${ip}: icmp_seq=0 ttl=118 time=${(10 + Math.random() * 5).toFixed(1)} ms`,
      `64 bytes from ${ip}: icmp_seq=1 ttl=118 time=${(10 + Math.random() * 5).toFixed(1)} ms`,
      `64 bytes from ${ip}: icmp_seq=2 ttl=118 time=${(10 + Math.random() * 5).toFixed(1)} ms`,
      "^C",
      `--- ${host} ping statistics ---`,
      "3 packets transmitted, 3 packets received, 0.0% packet loss",
    ],
  };
}

function curlCommand(args: string[]): CommandResult {
  const url = args[0];
  if (!url) {
    return { output: ["Usage: curl <url>"] };
  }

  if (url.includes("jalkhurfan") || url.includes("localhost")) {
    return {
      output: [
        "HTTP/1.1 200 OK",
        "Content-Type: text/html; charset=utf-8",
        "Server: Portfolio/3.0",
        "",
        "<!DOCTYPE html>",
        "<html>",
        "  <head><title>Jihad Al-Khurfan</title></head>",
        "  <body>Welcome to my portfolio!</body>",
        "</html>",
      ],
    };
  }

  return {
    output: [
      `HTTP/1.1 301 Moved Permanently`,
      `Location: https://jalkhurfan.com`,
      "",
      "Redirecting to portfolio...",
    ],
  };
}

function cowsayCommand(args: string[]): CommandResult {
  const text = args.length > 0 ? args.join(" ") : "Moo!";
  const border = "-".repeat(text.length + 2);
  return {
    output: [
      ` ${border}`,
      `< ${text} >`,
      ` ${border}`,
      "        \\   ^__^",
      "         \\  (oo)\\_______",
      "            (__)\\       )\\/\\",
      "                ||----w |",
      "                ||     ||",
    ],
  };
}

function exitCommand(): CommandResult {
  return {
    output: [
      "logout",
      "There is nowhere to go. You are already home.",
      "Type 'help' if you are lost.",
    ],
  };
}

function manCommand(args: string[]): CommandResult {
  const cmd = args[0]?.toLowerCase();
  if (!cmd) {
    return {
      output: ["What manual page do you want?", "Usage: man <command>"],
    };
  }

  const manPages: Record<string, string[]> = {
    ls: [
      "LS(1)                    Portfolio Manual                    LS(1)",
      "",
      "NAME",
      "     ls - list directory contents",
      "",
      "SYNOPSIS",
      "     ls [-al] [path]",
      "",
      "DESCRIPTION",
      "     List information about files in the virtual filesystem.",
      "     -a    Show hidden entries (. and ..)",
      "     -l    Long listing format with permissions and sizes",
    ],
    cd: [
      "CD(1)                    Portfolio Manual                    CD(1)",
      "",
      "NAME",
      "     cd - change the working directory",
      "",
      "SYNOPSIS",
      "     cd [path]",
      "",
      "DESCRIPTION",
      "     Change the current directory. Use .. to go up, ~ for home.",
    ],
    cat: [
      "CAT(1)                   Portfolio Manual                   CAT(1)",
      "",
      "NAME",
      "     cat - concatenate and print files",
      "",
      "SYNOPSIS",
      "     cat <file>",
      "",
      "DESCRIPTION",
      "     Display the contents of a file from the virtual filesystem.",
    ],
    open: [
      "OPEN(1)                  Portfolio Manual                  OPEN(1)",
      "",
      "NAME",
      "     open - open an application window",
      "",
      "SYNOPSIS",
      "     open <app>",
      "",
      "APPS",
      "     profile, experience, skills, contact,",
      "     terminal, projects, settings",
    ],
  };

  const page = manPages[cmd];
  if (!page) {
    return { output: [`No manual entry for ${cmd}`] };
  }
  return { output: page };
}

function touchCommand(args: string[]): CommandResult {
  if (args.length === 0) {
    return { output: ["Usage: touch <file>"] };
  }
  return { output: [`touch: read-only file system: ${args[0]}`] };
}

function mkdirCommand(args: string[]): CommandResult {
  if (args.length === 0) {
    return { output: ["Usage: mkdir <dir>"] };
  }
  return { output: [`mkdir: read-only file system: ${args[0]}`] };
}

function clearCommand(): CommandResult {
  return { output: [], action: { type: "clear" } };
}

function whichCommand(args: string[]): CommandResult {
  const cmd = args[0];
  if (!cmd) {
    return { output: ["Usage: which <command>"] };
  }
  if (COMMAND_REGISTRY[cmd]) {
    return { output: [`/usr/bin/${cmd}`] };
  }
  return { output: [`${cmd} not found`] };
}

function headCommand(args: string[]): CommandResult {
  let n = 10;
  let filePath = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-n" && args[i + 1]) {
      n = parseInt(args[i + 1], 10) || 10;
      i++;
    } else if (!args[i].startsWith("-")) {
      filePath = args.slice(i).join(" ");
      break;
    }
  }

  if (!filePath) {
    return { output: ["Usage: head [-n lines] <file>"] };
  }

  const resolved = resolvePath(filePath);
  const node = getNode(resolved);

  if (!node)
    return { output: [`head: ${filePath}: No such file or directory`] };
  if (node.type === "dir")
    return { output: [`head: ${filePath}: Is a directory`] };

  return { output: (node.content ?? []).slice(0, n) };
}

function tailCommand(args: string[]): CommandResult {
  let n = 10;
  let filePath = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-n" && args[i + 1]) {
      n = parseInt(args[i + 1], 10) || 10;
      i++;
    } else if (!args[i].startsWith("-")) {
      filePath = args.slice(i).join(" ");
      break;
    }
  }

  if (!filePath) {
    return { output: ["Usage: tail [-n lines] <file>"] };
  }

  const resolved = resolvePath(filePath);
  const node = getNode(resolved);

  if (!node)
    return { output: [`tail: ${filePath}: No such file or directory`] };
  if (node.type === "dir")
    return { output: [`tail: ${filePath}: Is a directory`] };

  const content = node.content ?? [];
  return { output: content.slice(-n) };
}

function wcCommand(args: string[]): CommandResult {
  if (args.length === 0) {
    return { output: ["Usage: wc <file>"] };
  }

  const filePath = args.join(" ");
  const resolved = resolvePath(filePath);
  const node = getNode(resolved);

  if (!node) return { output: [`wc: ${filePath}: No such file or directory`] };
  if (node.type === "dir")
    return { output: [`wc: ${filePath}: Is a directory`] };

  const content = node.content ?? [];
  const lines = content.length;
  const words = content.reduce(
    (sum, line) => sum + line.split(/\s+/).filter(Boolean).length,
    0,
  );
  const chars = content.reduce((sum, line) => sum + line.length + 1, 0);

  return {
    output: [
      `  ${lines.toString().padStart(5)}  ${words.toString().padStart(5)}  ${chars.toString().padStart(5)} ${filePath}`,
    ],
  };
}

// ---------------------------------------------------------------------------
// Command registry & all known command names (for tab completion)
// ---------------------------------------------------------------------------

/** Map of command name to handler */
const COMMAND_REGISTRY: Record<string, CommandHandler> = {
  // Navigation & files
  ls: (args) => lsCommand(args),
  cd: (args) => cdCommand(args),
  pwd: () => pwdCommand(),
  cat: (args) => catCommand(args),
  tree: (args) => treeCommand(args),
  find: (args) => findCommand(args),
  grep: (args) => grepCommand(args),
  head: (args) => headCommand(args),
  tail: (args) => tailCommand(args),
  wc: (args) => wcCommand(args),
  touch: (args) => touchCommand(args),
  mkdir: (args) => mkdirCommand(args),

  // Portfolio
  help: () => helpCommand(),
  about: () => aboutCommand(),
  skills: () => skillsCommand(),
  experience: () => experienceCommand(),
  contact: () => contactCommand(),
  open: (args) => openCommand(args),
  close: (args) => closeCommand(args),

  // System
  theme: (args) => themeCommand(args),
  whoami: () => whoamiCommand(),
  hostname: () => hostnameCommand(),
  date: () => dateCommand(),
  uptime: () => uptimeCommand(),
  uname: (args) => unameCommand(args),
  env: () => envCommand(),
  echo: (args) => echoCommand(args),
  history: (_args, ctx) => historyCommand(_args, ctx),
  neofetch: () => neofetchCommand(),
  clear: () => clearCommand(),
  which: (args) => whichCommand(args),
  man: (args) => manCommand(args),

  // Fun
  cowsay: (args) => cowsayCommand(args),
  exit: () => exitCommand(),
};

/** All registered command names (for tab completion) */
export const COMMAND_NAMES: string[] = Object.keys(COMMAND_REGISTRY).sort();

/** Execute a terminal command string */
export function executeCommand(
  input: string,
  ctx: CommandContext = { history: [] },
): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: [] };

  // Handle special multi-word commands
  const lower = trimmed.toLowerCase();
  if (lower === "sudo hire me") return sudoHireCommand();
  if (lower.startsWith("rm ")) return rmCommand();
  if (lower.startsWith("ping"))
    return pingCommand(trimmed.split(/\s+/).slice(1));
  if (lower.startsWith("curl"))
    return curlCommand(trimmed.split(/\s+/).slice(1));

  const [cmd, ...args] = trimmed.split(/\s+/);
  const handler = COMMAND_REGISTRY[cmd.toLowerCase()];

  if (!handler) {
    return {
      output: [
        `command not found: ${cmd}`,
        "Type 'help' for available commands.",
      ],
    };
  }

  return handler(args, ctx);
}

export { ASCII_BANNER };
