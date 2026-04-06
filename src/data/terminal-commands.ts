import type { AppId } from "@/types";

export interface CommandResult {
  output: string[];
  /** If set, triggers a window action */
  action?: { type: "open-app" | "close-app"; appId: AppId } | { type: "set-theme"; theme: "dark" | "light" } | { type: "clear" };
}

export type CommandHandler = (args: string[]) => CommandResult;

const ASCII_BANNER = [
  "   _____ _               _            _",
  "  |_   _(_)_ __   __ _  | | ___  _ __| |",
  "    | | | | '_ \\ / _` | | |/ _ \\| '__| |",
  "    | | | | | | | (_| | | | (_) | |  |_|",
  "    |_|_|_|_| |_|\\__, | |_|\\___/|_|  (_)",
  "     / \\  | |    |___/_  _ _ __ / _| __ _ _ __",
  "    / _ \\ | |___| |/ / || | '__| |_ / _` | '_ \\",
  "   / ___ \\| |___|   <|  _,_| |  |  _| (_| | | | |",
  "  /_/   \\_\\____|_|\\_\\|_| |_|  |_|  \\__,_|_| |_|",
  "",
  "  Welcome to Jihad Al-Khurfan's portfolio terminal.",
  "  Type 'help' to see available commands.",
  "",
];

const NEOFETCH = [
  "       .:'          visitor@jalkhurfan.com",
  "      .:'           ──────────────────────",
  "    .:'             OS: Portfolio OS v3.0",
  "  .:'  ___          Host: jalkhurfan.com",
  " :'  .'   '.        Kernel: React 19 + Vite 6",
  "    :       :        Shell: terminal v1.0",
  "    :       :        Resolution: " + (typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "1920x1080"),
  "     '.___.'         Theme: macOS Desktop",
  "                     Stack: TypeScript, React, TailwindCSS",
  "                     3D: Three.js + React Three Fiber",
  "                     Icons: Lucide React",
];

const VALID_APPS: AppId[] = [
  "profile", "experience", "skills", "contact",
  "terminal", "projects", "settings",
];

function helpCommand(): CommandResult {
  return {
    output: [
      "Available commands:",
      "",
      "  help          Show this help message",
      "  about         Short bio",
      "  skills        List skill categories",
      "  experience    Career summary",
      "  contact       Contact information",
      "  open <app>    Open an app window",
      "  close <app>   Close an app window",
      "  theme <mode>  Switch theme (dark/light)",
      "  clear         Clear terminal",
      "  ls            List files",
      "  cat resume    Show resume summary",
      "  whoami        Who are you?",
      "  neofetch      System info",
      "",
      "  Easter eggs: sudo hire me, rm -rf /, ping google.com, matrix",
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
      "  Backend    Node.js, Spring Boot, NestJS, GraphQL, ...",
      "  DevOps     Docker, GitHub Actions, Azure, AWS, ...",
      "  Databases  PostgreSQL, MongoDB, Redis, SQL Server, ...",
      "  Testing    Jest, Playwright, Cypress, WebDriverIO, ...",
      "  Languages  TypeScript, JavaScript, Java, Kotlin, ...",
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
      "  2022-Present  Sr. Fullstack Engineer @ CME",
      "  2021-2022     Sr. Frontend Engineer @ CME",
      "  2020-2021     Full-Stack Engineer @ CME",
      "  2019-2020     Jr. Full-Stack Engineer @ areeba",
      "  2018-2019     Intern/Part-time @ Tecfrac",
      "  2018          Intern @ NAR",
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
    return { output: [`Unknown app: ${appName}`, "Apps: " + VALID_APPS.join(", ")] };
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

function lsCommand(): CommandResult {
  return {
    output: [
      "drwxr-xr-x  Apps/",
      "drwxr-xr-x  Documents/",
      "-rw-r--r--  Resume.pdf",
      "-rw-r--r--  About.txt",
      "-rw-r--r--  Contact.txt",
    ],
  };
}

function catCommand(args: string[]): CommandResult {
  const file = args.join(" ").toLowerCase();
  if (file === "resume") {
    return {
      output: [
        "Jihad Al-Khurfan - Senior Fullstack Engineer",
        "──────────────────────────────────────────────",
        "6+ years | React, TypeScript, Node.js, Azure",
        "",
        "Download the full resume from the Profile app.",
      ],
    };
  }
  return { output: [`cat: ${args.join(" ")}: No such file or directory`] };
}

function whoamiCommand(): CommandResult {
  return {
    output: [
      "visitor@jalkhurfan.com",
      "",
      "You seem like a great recruiter/collaborator!",
      "Feel free to reach out :)",
    ],
  };
}

function neofetchCommand(): CommandResult {
  return { output: NEOFETCH };
}

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
      "rm: nice try! 😏",
      "This portfolio is too precious to delete.",
      "Besides, it's all client-side anyway.",
    ],
  };
}

function pingCommand(): CommandResult {
  return {
    output: [
      "PING google.com (142.250.80.46): 56 data bytes",
      "64 bytes from 142.250.80.46: icmp_seq=0 ttl=118 time=12.3 ms",
      "64 bytes from 142.250.80.46: icmp_seq=1 ttl=118 time=11.8 ms",
      "64 bytes from 142.250.80.46: icmp_seq=2 ttl=118 time=12.1 ms",
      "^C",
      "--- google.com ping statistics ---",
      "3 packets transmitted, 3 packets received, 0.0% packet loss",
    ],
  };
}

function matrixCommand(): CommandResult {
  const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:.\"=*+-<>";
  const lines: string[] = [];
  for (let i = 0; i < 8; i++) {
    let line = "";
    for (let j = 0; j < 50; j++) {
      line += chars[Math.floor(Math.random() * chars.length)];
    }
    lines.push(line);
  }
  lines.push("", "Wake up, Neo...", "The Matrix has you.");
  return { output: lines };
}

function clearCommand(): CommandResult {
  return { output: [], action: { type: "clear" } };
}

/** Map of command name to handler */
const COMMAND_REGISTRY: Record<string, CommandHandler> = {
  help: helpCommand,
  about: aboutCommand,
  skills: skillsCommand,
  experience: experienceCommand,
  contact: contactCommand,
  open: openCommand,
  close: closeCommand,
  theme: themeCommand,
  clear: clearCommand,
  ls: lsCommand,
  cat: catCommand,
  whoami: whoamiCommand,
  neofetch: neofetchCommand,
  matrix: matrixCommand,
  ping: () => pingCommand(),
};

/** Execute a terminal command string */
export function executeCommand(input: string): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: [] };

  // Handle special multi-word commands
  if (trimmed.toLowerCase() === "sudo hire me") return sudoHireCommand();
  if (trimmed.toLowerCase().startsWith("rm -rf")) return rmCommand();
  if (trimmed.toLowerCase().startsWith("ping")) return pingCommand();

  const [cmd, ...args] = trimmed.split(/\s+/);
  const handler = COMMAND_REGISTRY[cmd.toLowerCase()];

  if (!handler) {
    return {
      output: [
        `command not found: ${cmd}. Type 'help' for available commands.`,
      ],
    };
  }

  return handler(args);
}

export { ASCII_BANNER };
