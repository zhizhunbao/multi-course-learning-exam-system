/**
 * 统一数据服务层
 * 提供题目和考试数据的统一访问接口
 */

// 导入所有数据文件
import cst8503QuestionsZh from '../data/questions/cst8503-zh.json';
import cst8503QuestionsEn from '../data/questions/cst8503-en.json';

class DataService {
  constructor() {
    this.cache = new Map();
    
    // 预加载数据
    this.questionData = {
      'cst8503-zh': cst8503QuestionsZh,
      'cst8503-en': cst8503QuestionsEn,
    };
  }

  /**
   * 获取课程题目数据
   * @param {string} courseId - 课程ID
   * @param {string} language - 语言代码 (zh/en)，默认为 zh
   * @returns {Promise<Object>} 题目数据
   */
  async getQuestions(courseId, language = "zh") {
    const cacheKey = `questions_${courseId}_${language}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // 从预加载的数据中获取
      const dataKey = `${courseId}-${language}`;
      if (this.questionData[dataKey]) {
        const data = this.questionData[dataKey];
        this.cache.set(cacheKey, data);
        return data;
      }
      
      // 如果预加载数据中没有，尝试其他语言
      const fallbackKey = `${courseId}-${language === 'zh' ? 'en' : 'zh'}`;
      if (this.questionData[fallbackKey]) {
        const data = this.questionData[fallbackKey];
        this.cache.set(cacheKey, data);
        return data;
      }
      
      throw new Error(`No questions found for course ${courseId} in language ${language}`);
    } catch (error) {
      console.error("Error loading questions:", error);
      throw error;
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

    // 暂时返回默认考试配置
    const defaultConfig = {
      exams: [
        {
          id: 'midterm',
          title: 'Midterm Exam',
          description: 'Midterm examination',
          questionSelection: {
            strategy: 'random',
            count: 20,
            filters: {}
          }
        }
      ]
    };
    
    this.cache.set(cacheKey, defaultConfig);
    return defaultConfig;
  }

  /**
   * 根据考试配置选择题目
   * @param {string} courseId - 课程ID
   * @param {string} examId - 考试ID
   * @param {string} language - 语言代码 (zh/en)，默认为 zh
   * @returns {Promise<Array>} 选中的题目
   */
  async getExamQuestions(courseId, examId, language = "zh") {
    const [questionsData, examConfigData] = await Promise.all([
      this.getQuestions(courseId, language),
      this.getExamConfig(courseId),
    ]);

    const examConfig = examConfigData.exams.find((exam) => exam.id === examId);
    if (!examConfig) {
      throw new Error(`Exam ${examId} not found for course ${courseId}`);
    }

    return this.selectQuestions(
      questionsData.questions,
      examConfig.questionSelection
    );
  }

  /**
   * 获取课程内容
   * @param {string} courseId - 课程ID
   * @returns {Promise<Object>} 课程内容数据
   */
  async getCourseContent(courseId) {
    const cacheKey = `courseContent_${courseId}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // 暂时返回默认课程内容
    const defaultContent = {
      modules: [
        {
          id: 'module1',
          title: 'Introduction',
          content: 'Course introduction content...'
        }
      ]
    };
    
    this.cache.set(cacheKey, defaultContent);
    return defaultContent;
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
          id: 'exp1',
          title: 'Basic Experiment',
          description: 'Basic experiment description...'
        }
      ]
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
   */
  clearCache(courseId = null, language = null) {
    if (courseId) {
      if (language) {
        // 清除特定课程和语言的缓存
        this.cache.delete(`questions_${courseId}_${language}`);
        this.cache.delete(`examConfig_${courseId}`);
      } else {
        // 清除特定课程的所有语言缓存
        for (const key of this.cache.keys()) {
          if (
            key.startsWith(`questions_${courseId}_`) ||
            key === `examConfig_${courseId}`
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
