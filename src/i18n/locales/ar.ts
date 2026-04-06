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
      edit: "تحرير",
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
      role: "مهندس برمجيات متكامل أول",
      summary:
        "مهندس برمجيات متكامل أول بخبرة 6+ سنوات في بناء حلول ويب وتطبيقات قابلة للتطوير. متخصص في React و TypeScript و Node.js والبنية التحتية السحابية عبر مشاريع التقنيات المالية واللوجستية والتحول الرقمي الحكومي في الشرق الأوسط وأوروبا والولايات المتحدة.",
      stats: {
        experience: "سنوات خبرة",
        projects: "مشاريع منجزة",
        technologies: "تقنيات",
      },
      education: "التعليم",
      certificates: "الشهادات",
      trustedBy: "موثوق من قبل",
      downloadResume: "تحميل السيرة الذاتية",
    },
    experience: {
      title: "الخبرة",
      "cme-senior-fullstack": {
        position: "مهندس برمجيات متكامل أول",
        highlights: [
          "قيادة إعادة كتابة الهيكل الأمامي باستخدام React Query و TypeScript، تحسين الأداء بنسبة 40%",
          "تحسين APIs الخلفية واستعلامات قواعد البيانات، تقليل أوقات الاستجابة بنسبة 35%",
          "تنفيذ خطوط CI/CD قوية باستخدام GitHub Actions و Docker",
          "دمج خدمات Azure السحابية للنشر القابل للتوسع مع توفر 99.9%",
        ],
      },
      "cme-senior-frontend": {
        position: "مهندس برمجيات أمامي أول",
        highlights: [
          "قيادة اعتماد TypeScript وهجرة كود Redux القديم إلى Redux Toolkit",
          "إنشاء مكتبة مكونات قابلة لإعادة الاستخدام باستخدام Storybook مع تغطية اختبار 95%",
          "تسليم منصة استراتيجية لتصنيف موردي تكنولوجيا المعلومات وإدارة طلبات الشراء لهيئة الحكومة الرقمية السعودية",
          "تطوير نموذج أولي عالي التأثير لحاسبة تكلفة استثمار SBC السعودية",
        ],
      },
      "cme-fullstack": {
        position: "مهندس برمجيات متكامل",
        highlights: [
          "إعادة كتابة الواجهات الأمامية القديمة من Clojure إلى ReactJS، تحسين قابلية الصيانة وسرعة التطوير",
          "تحديث خدمات الخلفية بالهجرة من GoLang إلى Node.js + Spring Boot",
          "قيادة خطط هجرة قواعد البيانات مع Postgres/SQL Server + طبقات التجريد",
          "بناء منصة اختبار شاملة باستخدام WebDriverIO و Cucumber",
        ],
      },
      "areeba-junior-fullstack": {
        position: "مهندس برمجيات متكامل مبتدئ",
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
      },
    },
    contact: {
      title: "التواصل",
      subtitle: "لنتواصل",
      availability: "متاح لفرص جديدة ومشاريع مثيرة. مقيم في بيروت، لبنان.",
      copyFeedback: "تم النسخ!",
      location: "بيروت، لبنان",
      timezone: "الوقت الآن {{time}} في بيروت",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      linkedin: "لينكد إن",
      github: "غيت هب",
      copy: "نسخ",
      open: "فتح",
    },
    terminal: {
      title: "الطرفية",
    },
    projects: {
      title: "المشاريع",
      noResults: "لا توجد مشاريع تطابق هذا الفلتر.",
      demo: "عرض",
      items: {
        portfolioV3: {
          name: "الملف الشخصي v3",
          description:
            "ملف شخصي بأسلوب macOS مع خلفية ثلاثية الأبعاد ونوافذ قابلة للسحب ومحاكي طرفية.",
        },
        dgaPlatform: {
          name: "منصة هيئة الحكومة الرقمية",
          description:
            "منصة استراتيجية لتصنيف موردي تكنولوجيا المعلومات وإدارة طلبات الشراء.",
        },
        fintechApp: {
          name: "تطبيق تقنيات مالية",
          description:
            "تطبيق بنكي متنقل مع KYC/KYB ودمج بوابات الدفع والتحويلات الفورية.",
        },
        testingPlatform: {
          name: "منصة اختبار شاملة",
          description:
            "إطار اختبار شامل من البداية إلى النهاية باستخدام WebDriverIO و Cucumber BDD.",
        },
        investmentCalc: {
          name: "حاسبة الاستثمار",
          description:
            "نموذج أولي تفاعلي لحاسبة تكلفة الاستثمار مع تصور البيانات لـ SBC السعودية.",
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
    present: "حالياً",
    copied: "تم النسخ!",
    openLink: "فتح الرابط",
    skipToMain: "تخطي إلى المحتوى الرئيسي",
    all: "الكل",
    expandAll: "توسيع الكل",
    collapseAll: "طي الكل",
  },
  contextMenu: {
    aboutPortfolio: "حول هذا الملف",
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
