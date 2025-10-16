import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 使用 PathUtil 动态导入各个模块的语言资源
// Common modules
import elementsZhCN from "./modules/Elements/locales/zh-CN.json";
import elementsEn from "./modules/Elements/locales/en.json";
import headerZhCN from "./modules/Header/locales/zh-CN.json";
import headerEn from "./modules/Header/locales/en.json";
import footerZhCN from "./modules/Footer/locales/zh-CN.json";
import footerEn from "./modules/Footer/locales/en.json";
import sidebarZhCN from "./modules/Sidebar/locales/zh-CN.json";
import sidebarEn from "./modules/Sidebar/locales/en.json";
import navigatorZhCN from "./modules/Navigator/locales/zh-CN.json";
import navigatorEn from "./modules/Navigator/locales/en.json";
import loginZhCN from "./modules/Login/locales/zh-CN.json";
import loginEn from "./modules/Login/locales/en.json";
import layoutZhCN from "./modules/Layout/locales/zh-CN.json";
import layoutEn from "./modules/Layout/locales/en.json";

// Feature modules - 使用 PathUtil 管理路径
import courseManagementZhCN from "../modules/course-management/locales/zh-CN.json";
import courseManagementEn from "../modules/course-management/locales/en.json";
import learningZhCN from "../modules/learning/locales/zh-CN.json";
import learningEn from "../modules/learning/locales/en.json";
import practiceZhCN from "../modules/practice/locales/zh-CN.json";
import practiceEn from "../modules/practice/locales/en.json";
import experimentZhCN from "../modules/experiment/locales/zh-CN.json";
import experimentEn from "../modules/experiment/locales/en.json";
import examZhCN from "../modules/exam/locales/zh-CN.json";
import examEn from "../modules/exam/locales/en.json";
import adminZhCN from "../modules/admin/locales/zh-CN.json";
import adminEn from "../modules/admin/locales/en.json";

// 构建资源对象
const resources = {
  "zh-CN": {
    login: loginZhCN,
    elements: elementsZhCN,
    header: headerZhCN,
    footer: footerZhCN,
    sidebar: sidebarZhCN,
    navigator: navigatorZhCN,
    layout: layoutZhCN,
    "course-management": courseManagementZhCN,
    learning: learningZhCN,
    practice: practiceZhCN,
    experiment: experimentZhCN,
    exam: examZhCN,
    admin: adminZhCN,
  },
  en: {
    login: loginEn,
    elements: elementsEn,
    header: headerEn,
    footer: footerEn,
    sidebar: sidebarEn,
    navigator: navigatorEn,
    layout: layoutEn,
    "course-management": courseManagementEn,
    learning: learningEn,
    practice: practiceEn,
    experiment: experimentEn,
    exam: examEn,
    admin: adminEn,
  },
};

// 初始化 i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "zh-CN",
    defaultNS: "login",
    ns: [
      "login",
      "elements",
      "header",
      "footer",
      "sidebar",
      "navigator",
      "layout",
      "course-management",
      "learning",
      "practice",
      "experiment",
      "exam",
      "admin",
    ],
    debug: true,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
