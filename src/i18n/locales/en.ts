const en = {
  topbar: {
    name: "Jihad Al-Khurfan",
    switchTheme: "Switch theme",
    switchLanguage: "Switch language",
    branding: {
      about: "About Jihad Al-Khurfan",
      restart: "Restart…",
      shutDown: "Shut Down…",
      viewSource: "View Source",
    },
    menu: {
      file: "File",
      view: "View",
      closeWindow: "Close Window",
      closeAll: "Close All Windows",
      expandAll: "Expand All",
      collapseAll: "Collapse All",
    },

    spotlight: {
      placeholder: "Search apps, skills, actions…",
      noResults: "No results found.",
      categories: {
        apps: "Apps",
        skills: "Skills",
        actions: "Actions",
        companies: "Companies",
      },
    },
  },
  apps: {
    profile: {
      title: "Profile",
      role: "Senior Fullstack Engineer",
      location: "Beirut, Lebanon",
      availableStatus: "Available for work",
      summary:
        "Senior Fullstack Engineer with 6+ years of experience building scalable web and mobile solutions. Specializing in React, TypeScript, Node.js, and cloud infrastructure across fintech, logistics, and government digital transformation projects in MENA, Europe, and the US.",
      stats: {
        experience: "Years Experience",
        projects: "Projects Delivered",
        technologies: "Technologies",
      },
      education: "Education",
      certificates: "Certificates",
      downloadResume: "Download Resume",
    },
    experience: {
      title: "Experience",
      "cme-senior-fullstack": {
        position: "Senior Fullstack Software Engineer",
        highlights: [
          "Led frontend architecture rewrite using React Query and TypeScript, improving performance by 40%",
          "Optimized backend APIs and database queries, reducing response times by 35%",
          "Implemented robust CI/CD pipelines with GitHub Actions and Docker",
          "Integrated Azure cloud services for scalable deployments with 99.9% uptime",
        ],
      },
      "cme-senior-frontend": {
        position: "Senior FrontEnd Software Engineer",
        highlights: [
          "Spearheaded TypeScript adoption and migrated legacy Redux code to Redux Toolkit",
          "Established reusable component library using Storybook with 95% test coverage",
          "Delivered strategic platform for ICT vendor classification and RFP management for Saudi DGA",
          "Developed high-impact POC for Saudi SBC investment cost calculator",
        ],
      },
      "cme-fullstack": {
        position: "Full-Stack Software Engineer",
        highlights: [
          "Rewrote legacy Clojure frontends to ReactJS, improving maintainability and developer velocity",
          "Migrated backend services from GoLang to Node.js + Spring Boot",
          "Led database migration plans with Postgres/SQL Server and abstraction layers",
          "Built comprehensive testing platform using WebDriverIO and Cucumber",
        ],
      },
      "areeba-junior-fullstack": {
        position: "Junior Full-Stack Software Engineer",
        highlights: [
          "Built KYC/KYB features with OCR data extraction from identity documents",
          "Integrated Visa/Mastercard gateways via Antelope SDK and MagicCube SDK",
          "Contributed to full rewrite of Zaki mobile app and Transfer web platform",
          "Delivered prototypes for invoice automation and custom business rules engines",
        ],
      },
      "tecfrac-intern": {
        position: "Intern/Part-time Software Developer",
        highlights: [
          "Designed native Android application for a retail client",
          "Built structured web scraping scripts for data extraction",
          "Provided maintenance for legacy Android applications",
          "Delivered branded website for the mobile application",
        ],
      },
      "nar-intern": {
        position: "Software Developer Intern",
        highlights: [
          "Implemented UX improvements for drone inspection application",
          "Introduced ProGuard-based obfuscation for production builds",
          "Improved app release documentation and processes",
        ],
      },
    },
    skills: {
      title: "Skills",
      searchPlaceholder: "Search skills…",
      noResults: "No skills match your search.",
      skillCount: "{{count}} technologies",
      categories: {
        frontend: "Frontend Development",
        backend: "Backend Development",
        devops: "DevOps & Cloud",
        databases: "Databases & Storage",
        testing: "Testing",
        languages: "Languages",
        ai: "AI & Tooling",
      },
    },
    contact: {
      title: "Contact",
      subtitle: "Let's Connect",
      availability:
        "Available for new opportunities and interesting projects. Based in Beirut, Lebanon.",
      copyFeedback: "Copied!",
      timezone: "Currently {{time}} in Beirut",
      copy: "Copy",
      open: "Open",
    },
    terminal: {
      title: "Terminal",
    },
    finder: {
      title: "Finder",
      back: "Go back",
      forward: "Go forward",
      breadcrumb: "Breadcrumb navigation",
      favorites: "Favorites",
      empty: "This folder is empty.",
      name: "Name",
      kind: "Kind",
      modified: "Modified",
      kinds: {
        folder: "Folder",
        pdf: "PDF Document",
        txt: "Text File",
        link: "Link",
      },
    },
    notepad: {
      title: "Notepad",
      namePlaceholder: "Your name (optional)",
      messagePlaceholder: "Write a message…",
      alreadySubmitted: "You have already submitted a message this session.",
      submit: "Submit",
      noMessages: "No messages yet. Be the first to write one!",
      anonymous: "Anonymous",
      loading: "Loading messages…",
      loadError: "Could not load messages. Please try again later.",
      submitError: "Failed to send message. Please try again.",
    },
    projects: {
      title: "Projects",
      noResults: "No projects match that filter.",
      demo: "Demo",
      categories: {
        personal: "Personal",
        freelance: "Freelance",
        volunteer: "Volunteer",
      },
      items: {
        portfolioV3: {
          name: "Portfolio v3",
          description:
            "macOS-inspired portfolio with 3D background, draggable windows, and a terminal emulator.",
        },
        denworldTravel: {
          name: "Denworld Travel",
          description:
            "Travel booking platform with flight search, curated travel packages, and service add-ons for a Danish travel agency.",
        },
        waAutomator: {
          name: "WhatsApp Automator",
          description:
            "Desktop automation tool for scheduling messages, validating contacts, and processing media.",
        },
        leadCrm: {
          name: "Lead Management CRM",
          description:
            "Role-based CRM with lead tracking, KPI dashboards, CSV import, and Excel export for an NGO.",
        },
        ngoWebsite: {
          name: "NGO Website",
          description:
            "Bilingual website with a back-office admin panel, news management, and event publishing.",
        },
        campaignTracker: {
          name: "Campaign Tracker",
          description:
            "Global campaign platform with real-time progress tracking and interactive map visualization.",
        },
        dukkani: {
          name: "Dukkani",
          description:
            "Mobile inventory management app with barcode scanning, product forms, and currency support.",
        },
      },
    },
    settings: {
      title: "Settings",
      sections: {
        appearance: "Appearance",
        dock: "Dock",
        windows: "Windows",
        language: "Language",
        accessibility: "Accessibility",
      },
      appearance: {
        theme: "Theme",
        dark: "Dark",
        light: "Light",
        accentColor: "Accent Color",
        wallpaper: "Wallpaper",
        pairedWallpaper: "Auto-swaps on theme change",
        wallpaperCategories: {
          abstract: "Abstract",
          nature: "Nature",
          city: "City",
          minimal: "Minimal",

        },
        wallpapers: {
          "abstract-light-1": "Pastel Gradient",
          "abstract-dark-2": "Deep Nebula",
          "abstract-light-2": "Watercolor Bloom",
          "abstract-dark-1": "Dark Waves",
          "abstract-light-3": "Soft Flow",
          "abstract-dark-3": "Dark Mesh",
          "nature-light-1": "Snowy Peaks",
          "nature-dark-1": "Aurora Mountains",
          "nature-light-2": "Sunlit Meadow",
          "nature-dark-2": "Sunset Range",
          "nature-light-3": "Coastal Breeze",
          "nature-dark-3": "Dark Forest",
          "city-light-1": "Golden Horizon",
          "city-dark-1": "Hong Kong Night",
          "city-light-2": "Misty Skyline",
          "city-dark-2": "City Lights",
          "city-light-3": "San Francisco",
          "city-dark-3": "Dark Horizon",
          "minimal-solid-light": "Solid Light",
          "minimal-solid-dark": "Solid Dark",
          "minimal-gradient-light": "Light Gradient",
          "minimal-gradient-dark": "Dark Gradient",
          "minimal-accent-light": "Accent Glow",
          "minimal-accent-dark": "Accent Dark",
        },
        colors: {
          blue: "Blue",
          cyan: "Cyan",
          teal: "Teal",
          green: "Green",
          amber: "Amber",
          orange: "Orange",
          red: "Red",
          rose: "Rose",
          pink: "Pink",
          purple: "Purple",
          indigo: "Indigo",
        },
      },
      dock: {
        magnification: "Magnification",
        iconSize: "Icon Size",
        sizes: {
          small: "Small",
          medium: "Medium",
          large: "Large",
        },
      },
      windows: {
        animationSpeed: "Animation Speed",
        autoCascade: "Auto-Cascade",
        speeds: {
          normal: "Normal",
          fast: "Fast",
          off: "Off",
        },
      },
      language: {
        directionNote: "Changing language will also switch the text direction (LTR/RTL).",
      },
      accessibility: {
        reduceMotion: "Reduce Motion",
        reduceMotionDesc: "Override system preference to reduce animations.",
        fontSize: "Font Size",
        fontSizes: {
          small: "Small",
          normal: "Normal",
          large: "Large",
        },
      },
    },
  },
  common: {
    close: "Close",
    minimize: "Minimize",
    maximize: "Maximize",
    restore: "Restore",
    present: "Present",
    skipToMain: "Skip to main content",
    all: "All",
    expandAll: "Expand All",
    collapseAll: "Collapse All",
  },
  contextMenu: {
    aboutPortfolio: "About This Portfolio",
    bringToFront: "Bring to Front",
    sendToBack: "Send to Back",
    open: "Open",
  },
  shortcuts: {
    title: "Keyboard Shortcuts",
    openApp: "Open {{app}}",
    closeWindow: "Close Window",
    minimizeWindow: "Minimize Window",
    openSpotlight: "Open Spotlight",
    cycleWindows: "Cycle Windows",
    closeOrDeselect: "Close / Deselect",
    showShortcuts: "Show Shortcuts",
  },
  actions: {
    toggleTheme: "Toggle Theme",
    switchLanguage: "Switch Language",
    downloadResume: "Download Resume",
  },
};

export default en;
