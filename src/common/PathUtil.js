/**
 * 路径工具类 - 统一管理项目中的路径
 * 解决硬编码路径问题，提供统一的路径管理
 */
class PathUtil {
  /**
   * 获取 common modules 的路径
   * @param {string} moduleName - 模块名称 (如: Elements, Header, Footer 等)
   * @param {string} fileName - 文件名 (如: zh-CN.json, en.json)
   * @returns {string} 完整的相对路径
   */
  static getCommonModulePath(moduleName, fileName) {
    return `./modules/${moduleName}/locales/${fileName}`;
  }

  /**
   * 获取 feature modules 的路径
   * @param {string} moduleName - 模块名称 (如: course-management, learning 等)
   * @param {string} fileName - 文件名 (如: zh-CN.json, en.json)
   * @returns {string} 完整的相对路径
   */
  static getFeatureModulePath(moduleName, fileName) {
    return `../modules/${moduleName}/locales/${fileName}`;
  }

  /**
   * 获取 common modules 的组件路径
   * @param {string} moduleName - 模块名称
   * @returns {string} 组件路径
   */
  static getCommonModuleComponentPath(moduleName) {
    return `./modules/${moduleName}`;
  }

  /**
   * 获取 common modules 的绝对路径
   * @param {string} moduleName - 模块名称
   * @returns {string} 绝对路径
   */
  static getCommonModuleAbsolutePath(moduleName) {
    return `/src/common/modules/${moduleName}`;
  }

  /**
   * 获取 feature modules 的组件路径
   * @param {string} moduleName - 模块名称
   * @returns {string} 组件路径
   */
  static getFeatureModuleComponentPath(moduleName) {
    return `../modules/${moduleName}`;
  }

  /**
   * 获取资源文件路径
   * @param {string} type - 资源类型 (common|feature)
   * @param {string} moduleName - 模块名称
   * @param {string} subPath - 子路径 (如: locales/zh-CN.json)
   * @returns {string} 完整的资源路径
   */
  static getResourcePath(type, moduleName, subPath) {
    const basePath = type === "common" ? "./modules" : "../modules";
    return `${basePath}/${moduleName}/${subPath}`;
  }

  /**
   * 预定义的 common modules 列表
   */
  static get COMMON_MODULES() {
    return [
      "Elements",
      "Header",
      "Footer",
      "Sidebar",
      "Navigator",
      "Login",
      "Layout",
    ];
  }

  /**
   * 常用组件的绝对路径常量
   */
  static get PATHS() {
    return {
      ELEMENTS: "/src/common/modules/Elements/index.js",
      HEADER: "/src/common/modules/Header/index.js",
      FOOTER: "/src/common/modules/Footer/index.js",
      SIDEBAR: "/src/common/modules/Sidebar/index.js",
      NAVIGATOR: "/src/common/modules/Navigator/index.js",
      LOGIN: "/src/common/modules/Login/index.js",
      LAYOUT: "/src/common/modules/Layout/index.js",
    };
  }

  /**
   * 预定义的 feature modules 列表
   */
  static get FEATURE_MODULES() {
    return [
      "course-management",
      "learning",
      "practice",
      "experiment",
      "exam",
      "admin",
    ];
  }

  /**
   * 生成所有 common modules 的导入路径
   * @param {string} locale - 语言代码 (zh-CN|en)
   * @returns {Object} 包含所有 common modules 导入路径的对象
   */
  static generateCommonModuleImports(locale) {
    const imports = {};
    this.COMMON_MODULES.forEach((moduleName) => {
      const key = `${moduleName.toLowerCase()}${
        locale === "zh-CN" ? "ZhCN" : "En"
      }`;
      imports[key] = this.getCommonModulePath(moduleName, `${locale}.json`);
    });
    return imports;
  }

  /**
   * 生成所有 feature modules 的导入路径
   * @param {string} locale - 语言代码 (zh-CN|en)
   * @returns {Object} 包含所有 feature modules 导入路径的对象
   */
  static generateFeatureModuleImports(locale) {
    const imports = {};
    this.FEATURE_MODULES.forEach((moduleName) => {
      const key = `${moduleName.replace("-", "")}${
        locale === "zh-CN" ? "ZhCN" : "En"
      }`;
      imports[key] = this.getFeatureModulePath(moduleName, `${locale}.json`);
    });
    return imports;
  }
}

export default PathUtil;
