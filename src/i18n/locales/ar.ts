const ar = {
  topbar: {
    name: "جهاد الخرفان",
    switchTheme: "تبديل المظهر",
    switchLanguage: "تبديل اللغة",
    branding: {
      about: "عن جهاد الخرفان",
      restart: "إعادة تشغيل…",
      shutDown: "إيقاف التشغيل…",
      viewSource: "عرض المصدر",
    },
    menu: {
      file: "ملف",
      view: "عرض",
      closeWindow: "إغلاق النافذة",
      closeAll: "إغلاق جميع النوافذ",
      expandAll: "توسيع الكل",
      collapseAll: "طي الكل",
    },

    spotlight: {
      placeholder: "ابحث عن تطبيقات، مهارات، إجراءات…",
      noResults: "لم يتم العثور على نتائج.",
      categories: {
        apps: "التطبيقات",
        skills: "المهارات",
        actions: "الإجراءات",
        companies: "الشركات",
      },
    },
  },
  apps: {
    profile: {
      title: "الملف الشخصي",
      role: "مهندس Full Stack أول",
      location: "بيروت، لبنان",
      availableStatus: "متاح للعمل",
      summary:
        "مهندس Full Stack أول بخبرة 6+ سنوات في بناء حلول ويب وتطبيقات قابلة للتطوير. متخصص في React و TypeScript و Node.js والبنية التحتية السحابية عبر مشاريع التقنيات المالية واللوجستية والتحول الرقمي الحكومي في الشرق الأوسط وأوروبا والولايات المتحدة.",
      stats: {
        experience: "سنوات خبرة",
        projects: "مشاريع منجزة",
        technologies: "تقنيات",
      },
      education: "التعليم",
      certificates: "الشهادات",
      downloadResume: "تحميل السيرة الذاتية",
    },
    experience: {
      title: "الخبرة",
      "cme-senior-fullstack": {
        position: "مهندس Full Stack أول",
        highlights: [
          "قيادة إعادة كتابة الهيكل الأمامي باستخدام React Query و TypeScript، تحسين الأداء بنسبة 40%",
          "تحسين APIs الخلفية واستعلامات قواعد البيانات، تقليل أوقات الاستجابة بنسبة 35%",
          "تنفيذ خطوط CI/CD قوية باستخدام GitHub Actions و Docker",
          "دمج خدمات Azure السحابية للنشر القابل للتوسع مع توفر 99.9%",
        ],
      },
      "cme-senior-frontend": {
        position: "مهندس Frontend أول",
        highlights: [
          "قيادة اعتماد TypeScript وهجرة كود Redux القديم إلى Redux Toolkit",
          "إنشاء مكتبة مكونات قابلة لإعادة الاستخدام باستخدام Storybook مع تغطية اختبار 95%",
          "تسليم منصة استراتيجية لتصنيف موردي تكنولوجيا المعلومات وإدارة طلبات الشراء لهيئة الحكومة الرقمية السعودية",
          "تطوير نموذج أولي عالي التأثير لحاسبة تكلفة استثمار SBC السعودية",
        ],
      },
      "cme-fullstack": {
        position: "مهندس Full Stack",
        highlights: [
          "إعادة كتابة الواجهات الأمامية القديمة من Clojure إلى ReactJS، تحسين قابلية الصيانة وسرعة التطوير",
          "تحديث خدمات الخلفية بالهجرة من GoLang إلى Node.js + Spring Boot",
          "قيادة خطط هجرة قواعد البيانات مع Postgres/SQL Server + طبقات التجريد",
          "بناء منصة اختبار شاملة باستخدام WebDriverIO و Cucumber",
        ],
      },
      "areeba-junior-fullstack": {
        position: "مهندس Full Stack مبتدئ",
        highlights: [
          "بناء ميزات KYC/KYB متكاملة مع استخراج بيانات OCR من وثائق الهوية",
          "دمج بوابات Visa/Mastercard عبر Antelope SDK و MagicCube SDK",
          "المساهمة في إعادة الكتابة الكاملة لتطبيق Zaki المتنقل ومنصة Transfer للويب",
          "تسليم نماذج أولية لأتمتة الفواتير ومحركات قواعد الأعمال المخصصة",
        ],
      },
      "tecfrac-intern": {
        position: "مطور برمجيات (متدرب ودوام جزئي)",
        highlights: [
          "تصميم تطبيق Android أصلي لعميل تجارة التجزئة",
          "بناء برامج نصية لاستخراج البيانات المهيكلة من الويب",
          "توفير الصيانة لتطبيقات Android القديمة",
          "تسليم موقع ويب بعلامة تجارية للتطبيق المتنقل",
        ],
      },
      "nar-intern": {
        position: "متدرب مطور برمجيات",
        highlights: [
          "تنفيذ تحسينات تجربة المستخدم لتطبيق فحص الطائرات بدون طيار",
          "إدخال التشويش القائم على ProGuard لإصدارات الإنتاج",
          "تحسين توثيق إصدار التطبيق والعمليات",
        ],
      },
    },
    skills: {
      title: "المهارات",
      searchPlaceholder: "ابحث عن مهارة…",
      noResults: "لا توجد مهارات تطابق بحثك.",
      skillCount: "{{count}} تقنية",
      categories: {
        frontend: "تطوير الواجهة الأمامية",
        backend: "تطوير الخلفية",
        devops: "ديف أوبس والسحابة",
        databases: "قواعد البيانات والتخزين",
        testing: "الاختبارات",
        languages: "اللغات",
        ai: "الذكاء الاصطناعي والأدوات",
      },
    },
    contact: {
      title: "التواصل",
      subtitle: "لنتواصل",
      availability: "متاح لفرص جديدة ومشاريع مثيرة. مقيم في بيروت، لبنان.",
      copyFeedback: "تم النسخ!",
      timezone: "الوقت الآن {{time}} في بيروت",
      copy: "نسخ",
      open: "فتح",
    },
    terminal: {
      title: "الطرفية",
    },
    finder: {
      title: "مدير الملفات",
      back: "رجوع",
      forward: "تقدم",
      breadcrumb: "مسار التنقل",
      favorites: "المفضلة",
      empty: "هذا المجلد فارغ.",
      name: "الاسم",
      kind: "النوع",
      modified: "التعديل",
      kinds: {
        folder: "مجلد",
        pdf: "مستند PDF",
        txt: "ملف نصي",
        link: "رابط",
      },
    },
    notepad: {
      title: "المفكرة",
      namePlaceholder: "اسمك (اختياري)",
      messagePlaceholder: "اكتب رسالة…",
      alreadySubmitted: "لقد أرسلت رسالة بالفعل في هذه الجلسة.",
      submit: "إرسال",
      noMessages: "لا توجد رسائل بعد. كن أول من يكتب!",
      anonymous: "مجهول",
      loading: "جار تحميل الرسائل…",
      loadError: "تعذر تحميل الرسائل. يرجى المحاولة لاحقاً.",
      submitError: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
    },
    projects: {
      title: "المشاريع",
      noResults: "لا توجد مشاريع تطابق هذا الفلتر.",
      demo: "عرض",
      categories: {
        personal: "شخصي",
        freelance: "عمل حر",
        volunteer: "تطوعي",
      },
      items: {
        portfolioV3: {
          name: "Portfolio v3",
          description:
            "ملف شخصي بأسلوب macOS مع خلفية ثلاثية الأبعاد ونوافذ قابلة للسحب ومحاكي طرفية.",
        },
        denworldTravel: {
          name: "Denworld Travel",
          description:
            "منصة حجز سفر مع البحث عن رحلات وباقات سياحية وخدمات إضافية لوكالة سفر دنماركية.",
        },
        waAutomator: {
          name: "أتمتة واتساب",
          description:
            "أداة سطح مكتب لجدولة الرسائل والتحقق من جهات الاتصال ومعالجة الوسائط.",
        },
        leadCrm: {
          name: "نظام إدارة العملاء المحتملين",
          description:
            "نظام CRM مع تتبع العملاء المحتملين ولوحات مؤشرات الأداء واستيراد CSV وتصدير Excel لمنظمة غير ربحية.",
        },
        ngoWebsite: {
          name: "موقع منظمة",
          description:
            "موقع ثنائي اللغة مع لوحة إدارة وإدارة الأخبار ونشر الفعاليات.",
        },
        campaignTracker: {
          name: "متتبع الحملات",
          description:
            "منصة حملات عالمية مع تتبع التقدم المباشر وخريطة تفاعلية.",
        },
        dukkani: {
          name: "دكاني",
          description:
            "تطبيق إدارة المخزون للهاتف مع مسح الباركود ونماذج المنتجات ودعم العملات.",
        },
      },
    },
    settings: {
      title: "الإعدادات",
      sections: {
        appearance: "المظهر",
        dock: "شريط التطبيقات",
        windows: "النوافذ",
        language: "اللغة",
        accessibility: "إمكانية الوصول",
      },
      appearance: {
        theme: "المظهر",
        dark: "داكن",
        light: "فاتح",
        accentColor: "لون التمييز",
        wallpaper: "خلفية سطح المكتب",
        pairedWallpaper: "تتبدّل تلقائيًا عند تغيير المظهر",
        wallpaperCategories: {
          abstract: "تجريدي",
          nature: "طبيعة",
          city: "مدينة",
          minimal: "بسيط",

        },
        wallpapers: {
          "abstract-light-1": "تدرج باستيل",
          "abstract-dark-2": "سديم عميق",
          "abstract-light-2": "ألوان مائية",
          "abstract-dark-1": "أمواج داكنة",
          "abstract-light-3": "تدفق ناعم",
          "abstract-dark-3": "شبكة داكنة",
          "nature-light-1": "قمم ثلجية",
          "nature-dark-1": "جبال الشفق",
          "nature-light-2": "مرج مشمس",
          "nature-dark-2": "سلسلة الغروب",
          "nature-light-3": "نسيم ساحلي",
          "nature-dark-3": "غابة داكنة",
          "city-light-1": "أفق ذهبي",
          "city-dark-1": "هونغ كونغ ليلاً",
          "city-light-2": "أفق ضبابي",
          "city-dark-2": "أضواء المدينة",
          "city-light-3": "سان فرانسيسكو",
          "city-dark-3": "أفق داكن",
          "minimal-solid-light": "لون فاتح",
          "minimal-solid-dark": "لون داكن",
          "minimal-gradient-light": "تدرج فاتح",
          "minimal-gradient-dark": "تدرج داكن",
          "minimal-accent-light": "توهج مميز",
          "minimal-accent-dark": "مميز داكن",
        },
        colors: {
          blue: "أزرق",
          cyan: "سماوي",
          teal: "أخضر مزرق",
          green: "أخضر",
          amber: "كهرماني",
          orange: "برتقالي",
          red: "أحمر",
          rose: "وردي",
          pink: "زهري",
          purple: "بنفسجي",
          indigo: "نيلي",
        },
      },
      dock: {
        magnification: "التكبير",
        iconSize: "حجم الأيقونة",
        sizes: {
          small: "صغير",
          medium: "متوسط",
          large: "كبير",
        },
      },
      windows: {
        animationSpeed: "سرعة الرسوم المتحركة",
        autoCascade: "ترتيب تلقائي",
        speeds: {
          normal: "عادي",
          fast: "سريع",
          off: "إيقاف",
        },
      },
      language: {
        directionNote: "تغيير اللغة سيغير أيضاً اتجاه النص (يمين لليسار / يسار لليمين).",
      },
      accessibility: {
        reduceMotion: "تقليل الحركة",
        reduceMotionDesc: "تجاوز تفضيل النظام لتقليل الرسوم المتحركة.",
        fontSize: "حجم الخط",
        fontSizes: {
          small: "صغير",
          normal: "عادي",
          large: "كبير",
        },
      },
    },
  },
  common: {
    close: "إغلاق",
    minimize: "تصغير",
    maximize: "تكبير",
    restore: "استعادة",
    present: "الحالي",
    skipToMain: "تخطي إلى المحتوى الرئيسي",
    all: "الكل",
    expandAll: "توسيع الكل",
    collapseAll: "طي الكل",
  },
  contextMenu: {
    aboutPortfolio: "حول هذا الملف الشخصي",
    bringToFront: "إحضار للأمام",
    sendToBack: "إرسال للخلف",
    open: "فتح",
  },
  shortcuts: {
    title: "اختصارات لوحة المفاتيح",
    openApp: "فتح {{app}}",
    closeWindow: "إغلاق النافذة",
    minimizeWindow: "تصغير النافذة",
    openSpotlight: "فتح البحث",
    cycleWindows: "التبديل بين النوافذ",
    closeOrDeselect: "إغلاق / إلغاء التحديد",
    showShortcuts: "عرض الاختصارات",
  },
  actions: {
    toggleTheme: "تبديل المظهر",
    switchLanguage: "تبديل اللغة",
    downloadResume: "تحميل السيرة الذاتية",
  },
};

export default ar;
