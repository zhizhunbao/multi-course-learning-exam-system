/**
 * 统一数据服务层
 * 提供题目和考试数据的统一访问接口
 * 支持从 public 目录动态加载数据文件
 */

class DataService {
  constructor() {
    this.cache = new Map();
    // 使用 Vite 的 BASE_URL 环境变量
    const base = import.meta.env.BASE_URL || "/";
    this.baseUrl = `${base}data`.replace(/\/+/g, "/");
  }

  /**
   * 获取课程题目数据
   * @param {string} courseId - 课程ID
   * @param {string} language - 语言代码 (zh/en)，默认为 en
   * @param {Object} options - 选项参数
   * @param {string} options.chapter - 章节ID (可选)
   * @param {string} options.type - 题型 (可选)
   * @param {string} options.format - 格式类型 'json' | 'markdown' (可选)
   * @returns {Promise<Object>} 题目数据
   */
  async getQuestions(courseId, language = "en", options = {}) {
    const { chapter, type, format } = options;
    const cacheKey = `questions_${courseId}_${language}_${chapter || "all"}_${
      type || "all"
    }_${format || "json"}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      let data = null;

      // 如果请求 markdown 格式，尝试加载 markdown 题库
      if (format === "markdown") {
        data = await this.getMarkdownQuestions(courseId, language);
        if (data) {
          this.cache.set(cacheKey, data);
          return data;
        }
      }

      // 如果指定了章节，尝试加载对应的文件
      if (chapter) {
        // 尝试新的文件路径格式: questions/cst8503/cst8503-chapter1-kr-zh.json
        const chapterFileName = `${courseId}-${chapter}-${language}.json`;
        data = await this.loadDataFromFile(
          `questions/${courseId}/${chapterFileName}`
        );
      } else if (type) {
        // 题型过滤：从所有章节文件中收集指定类型的题目
        data = await this.collectQuestionsByType(courseId, language, type);
      }

      // 如果没有找到特定文件，尝试加载所有章节的题目
      if (!data) {
        data = await this.collectAllQuestions(courseId, language);
      }

      // 如果指定语言的数据不存在，尝试其他语言
      if (!data) {
        const fallbackLanguage = language === "zh" ? "en" : "zh";

        if (chapter) {
          const chapterFileName = `${courseId}-${chapter}-${fallbackLanguage}.json`;
          data = await this.loadDataFromFile(
            `questions/${courseId}/${chapterFileName}`
          );
        } else {
          data = await this.collectAllQuestions(courseId, fallbackLanguage);
        }
      }

      if (data) {
        this.cache.set(cacheKey, data);
        return data;
      }

      throw new Error(
        `No questions found for course ${courseId} in language ${language}`
      );
    } catch (error) {
      console.error("Error loading questions:", error);
      throw error;
    }
  }

  /**
   * 获取 Markdown 格式的题库
   * @param {string} courseId - 课程ID
   * @param {string} language - 语言代码 (zh/en)
   * @param {string} setId - 题库套数 (set1/set2/...)，可选
   * @returns {Promise<Object|null>} 题库数据，包含 markdown 内容
   */
  async getMarkdownQuestions(courseId, language = "en", setId = null) {
    try {
      // 构建文件名：根据语言和题库套数选择对应的文件
      const fileNames = [];

      if (setId) {
        // 如果指定了题库套数
        if (language === "en") {
          fileNames.push(
            `questions/${courseId}/exam-questions-${setId}-en.md`,
            `questions/${courseId}/exam-questions-${setId}.md`
          );
        } else {
          fileNames.push(
            `questions/${courseId}/exam-questions-${setId}.md`,
            `questions/${courseId}/exam-questions-${setId}-en.md`
          );
        }
      } else {
        // 默认加载第一套题库
        if (language === "en") {
          fileNames.push(
            `questions/${courseId}/exam-questions-en.md`,
            `questions/${courseId}/exam-questions.md`
          );
        } else {
          fileNames.push(
            `questions/${courseId}/exam-questions.md`,
            `questions/${courseId}/exam-questions-en.md`
          );
        }
      }

      // 尝试加载指定语言的文件，如果失败则尝试备用语言
      let markdownContent = null;
      for (const fileName of fileNames) {
        markdownContent = await this.loadMarkdownFile(fileName);
        if (markdownContent) break;
      }

      if (markdownContent) {
        const setLabel = setId ? ` (${setId.toUpperCase()})` : "";
        const titles = {
          zh: `${courseId} 综合考试题库${setLabel}`,
          en: `${courseId} Comprehensive Exam Question Bank${setLabel}`,
        };

        const descriptions = {
          zh: `完整的考试题库${setLabel}（Markdown 格式）`,
          en: `Complete Exam Question Bank${setLabel} (Markdown Format)`,
        };

        return {
          courseId,
          language,
          format: "markdown",
          setId,
          content: markdownContent,
          title: titles[language] || titles.zh,
          description: descriptions[language] || descriptions.zh,
        };
      }

      return null;
    } catch (error) {
      console.warn(`Failed to load markdown questions for ${courseId}:`, error);
      return null;
    }
  }

  /**
   * 获取所有可用的题库列表
   * @param {string} courseId - 课程ID
   * @param {string} language - 语言代码 (zh/en)
   * @returns {Promise<Array>} 可用题库列表
   */
  async getAvailableQuestionSets(courseId, language = "en") {
    const sets = [];

    // 定义所有可能的题库文件名（不包含语言后缀）
    const possibleSets = [
      {
        fileNames: ["exam-questions"],
        id: "exam-questions",
        titleEn: "Comprehensive Exam Questions",
        titleZh: "综合考试题库",
        descEn: "Complete exam question bank covering all topics",
        descZh: "涵盖所有主题的完整考试题库",
      },
      {
        fileNames: ["situation-calculus-planning-questions"],
        id: "situation-calculus-planning",
        titleEn: "Situation Calculus & Planning",
        titleZh: "情境演算与规划",
        descEn: "Questions about situation calculus and planning in Prolog",
        descZh: "关于Prolog中的情境演算和规划的题目",
      },
    ];

    // 遍历所有可能的题库
    for (const setConfig of possibleSets) {
      let content = null;

      // 尝试加载该题库的不同文件名变体
      for (const baseName of setConfig.fileNames) {
        // 构建文件路径
        const fileNames = [];
        if (language === "en") {
          fileNames.push(
            `questions/${courseId}/${baseName}-en.md`,
            `questions/${courseId}/${baseName}.md`
          );
        } else {
          fileNames.push(
            `questions/${courseId}/${baseName}.md`,
            `questions/${courseId}/${baseName}-en.md`
          );
        }

        // 尝试加载文件
        for (const fileName of fileNames) {
          content = await this.loadMarkdownFile(fileName);
          if (content) break;
        }

        if (content) break;
      }

      // 如果找到内容，添加到题库列表
      if (content) {
        sets.push({
          id: setConfig.id,
          title: language === "en" ? setConfig.titleEn : setConfig.titleZh,
          description: language === "en" ? setConfig.descEn : setConfig.descZh,
          courseId,
          language,
          format: "markdown",
          content,
        });
      }
    }

    return sets;
  }

  /**
   * 收集指定类型的所有题目
   * @param {string} courseId - 课程ID
   * @param {string} language - 语言代码
   * @param {string} type - 题型
   * @returns {Promise<Object|null>} 题目数据
   */
  async collectQuestionsByType(courseId, language, type) {
    try {
      const allQuestions = await this.collectAllQuestions(courseId, language);
      if (allQuestions && allQuestions.questions) {
        const filteredQuestions = allQuestions.questions.filter(
          (q) => q.type === type
        );
        return {
          ...allQuestions,
          questions: filteredQuestions,
          totalQuestions: filteredQuestions.length,
          description: `${type} 相关题目`,
        };
      }
      return null;
    } catch (error) {
      console.error("Error collecting questions by type:", error);
      return null;
    }
  }

  /**
   * 收集所有章节的题目
   * @param {string} courseId - 课程ID
   * @param {string} language - 语言代码
   * @returns {Promise<Object|null>} 题目数据
   */
  async collectAllQuestions(courseId, language) {
    try {
      const chapters = [
        "chapter1-kr",
        "chapter2-prolog-basics",
        "chapter3-prolog-debugging",
        "chapter4-prolog-structures-matching",
        "chapter5-prolog-lists-operators",
        "chapter6-prolog-negation",
        "chapter7-midterm-review",
      ];

      const allQuestions = [];
      let courseInfo = null;

      for (const chapter of chapters) {
        const chapterFileName = `${courseId}-${chapter}-${language}.json`;
        const chapterData = await this.loadDataFromFile(
          `questions/${courseId}/${chapterFileName}`
        );

        if (chapterData) {
          if (!courseInfo) {
            courseInfo = {
              courseId: chapterData.courseId,
              courseName: chapterData.courseName,
              language: chapterData.language,
              description: chapterData.description,
            };
          }

          if (chapterData.questions) {
            allQuestions.push(...chapterData.questions);
          }
        }
      }

      if (allQuestions.length > 0) {
        return {
          ...courseInfo,
          questions: allQuestions,
          totalQuestions: allQuestions.length,
          description: courseInfo?.description || `${courseId} 所有题目`,
        };
      }

      return null;
    } catch (error) {
      console.error("Error collecting all questions:", error);
      return null;
    }
  }

  /**
   * 从文件加载数据
   * @param {string} filePath - 文件路径（相对于 data 目录）
   * @returns {Promise<Object|null>} 数据对象或 null
   */
  async loadDataFromFile(filePath) {
    try {
      const url = `${this.baseUrl}/${filePath}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          return null; // 文件不存在
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && !contentType.includes("application/json")) {
        // 如果返回的是HTML（通常是404页面），返回null而不是抛出错误
        const text = await response.text();
        if (
          text.trim().startsWith("<!DOCTYPE") ||
          text.trim().startsWith("<!doctype")
        ) {
          return null;
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn(`Failed to load data from ${filePath}:`, error);
      return null;
    }
  }

  /**
   * 加载 Markdown 文件
   * @param {string} filePath - 文件路径（相对于 data 目录）
   * @returns {Promise<string|null>} Markdown 文本内容，失败时返回 null
   */
  async loadMarkdownFile(filePath) {
    const cacheKey = `markdown_${filePath}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const url = `${this.baseUrl}/${filePath}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          return null; // 文件不存在
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      this.cache.set(cacheKey, text);
      return text;
    } catch (error) {
      console.warn(`Failed to load markdown from ${filePath}:`, error);
      return null;
    }
  }

  /**
   * 获取考试配置数据
   * @param {string} courseId - 课程ID
   * @returns {Promise<Object>} 考试配置数据
   */
  async getExamConfig(courseId) {
    const cacheKey = `examConfig_${courseId}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // 尝试从文件加载考试配置
      const data = await this.loadDataFromFile(`exams/${courseId}.json`);
      if (data) {
        this.cache.set(cacheKey, data);
        return data;
      }

      // 如果文件不存在，返回默认配置
      const defaultConfig = {
        exams: [
          {
            id: "midterm",
            title: "Midterm Exam",
            description: "Midterm examination",
            questionSelection: {
              strategy: "random",
              count: 20,
              filters: {},
            },
          },
        ],
      };

      this.cache.set(cacheKey, defaultConfig);
      return defaultConfig;
    } catch (error) {
      console.error("Error loading exam config:", error);
      throw error;
    }
  }

  /**
   * 根据考试配置选择题目
   * @param {string} courseId - 课程ID
   * @param {string} examId - 考试ID
   * @param {string} language - 语言代码 (zh/en)，默认为 zh
   * @returns {Promise<Array>} 选中的题目
   */
  async getExamQuestions(courseId, examId, language = "en") {
    const [questionsData, examConfigData] = await Promise.all([
      this.getQuestions(courseId, language),
      this.getExamConfig(courseId),
    ]);

    const examConfig = examConfigData?.exams?.find(
      (exam) => exam.id === examId
    );
    if (!examConfig) {
      throw new Error(`Exam ${examId} not found for course ${courseId}`);
    }

    return this.selectQuestions(
      questionsData?.questions || [],
      examConfig.questionSelection
    );
  }

  /**
   * 获取课程索引信息
   * @param {string} courseId - 课程ID
   * @param {string} language - 语言代码 (zh/en)，默认为 en
   * @returns {Promise<Object>} 课程索引数据
   */
  async getCourseIndex(courseId, language = "en") {
    const cacheKey = `courseIndex_${courseId}_${language}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // 索引文件已删除，从完整题目文件中生成索引信息
      const questionsData = await this.getQuestions(courseId, language);

      if (!questionsData || !questionsData.questions) {
        throw new Error(
          `No questions found for course ${courseId} in language ${language}`
        );
      }

      // 生成章节索引
      const chapters = [];
      const chapterMap = new Map();

      questionsData.questions.forEach((question) => {
        if (question.chapter) {
          if (!chapterMap.has(question.chapter)) {
            chapterMap.set(question.chapter, {
              chapterId: question.chapter,
              title: question.chapterTitle || question.chapter,
              questionCount: 0,
              fileName: `${courseId}-${question.chapter}-${language}.json`,
            });
          }
          chapterMap.get(question.chapter).questionCount++;
        }
      });

      chapters.push(...chapterMap.values());

      // 生成题型索引
      const questionTypes = [];
      const typeMap = new Map();

      questionsData.questions.forEach((question) => {
        if (question.type) {
          if (!typeMap.has(question.type)) {
            typeMap.set(question.type, {
              type: question.type,
              title: question.type,
              questionCount: 0,
            });
          }
          typeMap.get(question.type).questionCount++;
        }
      });

      questionTypes.push(...typeMap.values());

      const indexData = {
        courseId,
        language,
        title: questionsData.title || courseId,
        description: questionsData.description || `Course ${courseId}`,
        lastUpdated: new Date().toISOString().split("T")[0],
        chapters,
        questionTypes,
        totalQuestions: questionsData.questions.length,
      };

      this.cache.set(cacheKey, indexData);
      return indexData;
    } catch (error) {
      console.error("Error generating course index:", error);
      throw error;
    }
  }

  /**
   * 获取指定章节的题目
   * @param {string} courseId - 课程ID
   * @param {string} chapterId - 章节ID
   * @param {string} language - 语言代码 (zh/en)，默认为 zh
   * @returns {Promise<Object>} 章节题目数据
   */
  async getChapterQuestions(courseId, chapterId, language = "en") {
    return this.getQuestions(courseId, language, { chapter: chapterId });
  }

  /**
   * 获取指定题型的题目
   * @param {string} courseId - 课程ID
   * @param {string} questionType - 题型
   * @param {string} language - 语言代码 (zh/en)，默认为 zh
   * @returns {Promise<Object>} 题型题目数据
   */
  async getQuestionsByType(courseId, questionType, language = "en") {
    return this.getQuestions(courseId, language, { type: questionType });
  }

  /**
   * 获取课程内容
   * @param {string} courseId - 课程ID
   * @param {string} language - 语言代码 (zh/en)，默认为 en
   * @returns {Promise<Object>} 课程内容数据
   */
  async getCourseContent(courseId, language = "en") {
    const cacheKey = `courseContent_${courseId}_${language}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // 尝试加载课程内容文件
      let data = await this.loadDataFromFile(
        `content/${courseId}/course-${language}.json`
      );

      // 如果指定语言的文件不存在，尝试其他语言
      if (!data) {
        const fallbackLanguage = language === "zh" ? "en" : "zh";
        data = await this.loadDataFromFile(
          `content/${courseId}/course-${fallbackLanguage}.json`
        );
      }

      // 如果找到了课程数据，加载 markdown 内容
      if (data && data.chapters) {
        // 遍历所有章节，加载 markdown 文件
        for (const chapter of data.chapters) {
          // 如果 chapter 有 markdownFile 字段，加载对应的 markdown 内容
          if (chapter.markdownFile) {
            const markdownContent = await this.loadMarkdownFile(
              `content/${courseId}/${chapter.markdownFile}`
            );
            if (markdownContent) {
              chapter.content = markdownContent;
            }
          }
        }

        this.cache.set(cacheKey, data);
        return data;
      }

      // 如果都没有找到，返回默认内容
      const defaultContent = {
        courseId,
        language,
        title: `Course ${courseId}`,
        description: `Course content for ${courseId}`,
        chapters: [],
        lastUpdated: new Date().toISOString().split("T")[0],
      };

      this.cache.set(cacheKey, defaultContent);
      return defaultContent;
    } catch (error) {
      console.error("Error loading course content:", error);
      throw error;
    }
  }

  /**
   * 获取章节内容
   * @param {string} courseId - 课程ID
   * @param {string} chapterId - 章节ID
   * @param {string} language - 语言代码 (zh/en)，默认为 zh
   * @returns {Promise<Object>} 章节内容数据
   */
  async getChapterContent(courseId, chapterId, language = "en") {
    const cacheKey = `chapterContent_${courseId}_${chapterId}_${language}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // 尝试加载章节内容文件
      const data = await this.loadDataFromFile(
        `content/${courseId}/${chapterId}-${language}.json`
      );
      if (data) {
        this.cache.set(cacheKey, data);
        return data;
      }

      // 如果指定语言的文件不存在，尝试其他语言
      if (!data) {
        const fallbackLanguage = language === "zh" ? "en" : "zh";
        const fallbackData = await this.loadDataFromFile(
          `content/${courseId}/${chapterId}-${fallbackLanguage}.json`
        );
        if (fallbackData) {
          this.cache.set(cacheKey, fallbackData);
          return fallbackData;
        }
      }

      // 如果都没有找到，返回默认内容
      const defaultContent = {
        courseId,
        chapterId,
        language,
        title: `Chapter ${chapterId}`,
        description: `Chapter content for ${chapterId}`,
        learningObjectives: [],
        content: [],
        exercises: [],
        resources: [],
        lastUpdated: new Date().toISOString().split("T")[0],
      };

      this.cache.set(cacheKey, defaultContent);
      return defaultContent;
    } catch (error) {
      console.error("Error loading chapter content:", error);
      throw error;
    }
  }

  /**
   * 获取实验数据
   * @param {string} courseId - 课程ID
   * @returns {Promise<Object>} 实验数据
   */
  async getExperiments(courseId) {
    const cacheKey = `experiments_${courseId}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // 暂时返回默认实验数据
    const defaultExperiments = {
      experiments: [
        {
          id: "exp1",
          title: "Basic Experiment",
          description: "Basic experiment description...",
        },
      ],
    };

    this.cache.set(cacheKey, defaultExperiments);
    return defaultExperiments;
  }

  /**
   * 根据选择策略选择题目
   * @param {Array} questions - 所有题目
   * @param {Object} selection - 选择配置
   * @returns {Array} 选中的题目
   */
  selectQuestions(questions, selection) {
    if (!questions || !Array.isArray(questions)) {
      console.warn("selectQuestions: questions is not an array:", questions);
      return [];
    }

    let filteredQuestions = questions;

    // 应用过滤器
    if (selection.filters) {
      filteredQuestions = questions.filter((question) => {
        // 难度过滤
        if (
          selection.filters.difficulty &&
          selection.filters.difficulty.length > 0
        ) {
          if (!selection.filters.difficulty.includes(question.difficulty)) {
            return false;
          }
        }

        // 标签过滤
        if (selection.filters.tags && selection.filters.tags.length > 0) {
          if (
            !question.tags.some((tag) => selection.filters.tags.includes(tag))
          ) {
            return false;
          }
        }

        return true;
      });
    }

    // 应用选择策略
    switch (selection.strategy) {
      case "random":
        return this.shuffleArray(filteredQuestions).slice(0, selection.count);
      case "sequential":
        return filteredQuestions.slice(0, selection.count);
      case "mixed":
        // 混合策略：按难度比例选择
        return this.selectMixedQuestions(filteredQuestions, selection.count);
      default:
        return filteredQuestions.slice(0, selection.count);
    }
  }

  /**
   * 随机打乱数组
   * @param {Array} array - 要打乱的数组
   * @returns {Array} 打乱后的数组
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * 混合策略选择题目
   * @param {Array} questions - 题目数组
   * @param {number} count - 选择数量
   * @returns {Array} 选中的题目
   */
  selectMixedQuestions(questions, count) {
    const easyQuestions = questions.filter((q) => q.difficulty === "easy");
    const mediumQuestions = questions.filter((q) => q.difficulty === "medium");
    const hardQuestions = questions.filter((q) => q.difficulty === "hard");

    const easyCount = Math.floor(count * 0.4); // 40% 简单题
    const mediumCount = Math.floor(count * 0.4); // 40% 中等题
    const hardCount = count - easyCount - mediumCount; // 剩余为难题

    const selected = [
      ...this.shuffleArray(easyQuestions).slice(0, easyCount),
      ...this.shuffleArray(mediumQuestions).slice(0, mediumCount),
      ...this.shuffleArray(hardQuestions).slice(0, hardCount),
    ];

    return this.shuffleArray(selected);
  }

  /**
   * 清除缓存
   * @param {string} courseId - 课程ID（可选）
   * @param {string} language - 语言代码（可选）
   * @param {string} chapterId - 章节ID（可选）
   * @param {string} questionType - 题型（可选）
   */
  clearCache(
    courseId = null,
    language = null,
    chapterId = null,
    questionType = null
  ) {
    if (courseId) {
      if (language) {
        if (chapterId) {
          // 清除特定课程、语言和章节的缓存
          for (const key of this.cache.keys()) {
            if (
              key.includes(`questions_${courseId}_${language}_${chapterId}_`)
            ) {
              this.cache.delete(key);
            }
          }
        } else if (questionType) {
          // 清除特定课程、语言和题型的缓存
          for (const key of this.cache.keys()) {
            if (
              key.includes(
                `questions_${courseId}_${language}_all_${questionType}`
              )
            ) {
              this.cache.delete(key);
            }
          }
        } else {
          // 清除特定课程和语言的所有缓存
          for (const key of this.cache.keys()) {
            if (
              key.includes(`questions_${courseId}_${language}_`) ||
              key === `examConfig_${courseId}` ||
              key === `courseIndex_${courseId}_${language}` ||
              key === `courseContent_${courseId}_${language}` ||
              key.includes(`chapterContent_${courseId}_`)
            ) {
              this.cache.delete(key);
            }
          }
        }
      } else {
        // 清除特定课程的所有语言缓存
        for (const key of this.cache.keys()) {
          if (
            key.includes(`questions_${courseId}_`) ||
            key === `examConfig_${courseId}` ||
            key.includes(`courseIndex_${courseId}_`) ||
            key.includes(`courseContent_${courseId}_`) ||
            key.includes(`chapterContent_${courseId}_`)
          ) {
            this.cache.delete(key);
          }
        }
      }
    } else {
      this.cache.clear();
    }
  }
}

// 创建单例实例
const dataService = new DataService();

export default dataService;
