#!/usr/bin/env node

/**
 * 题目拆分脚本
 * 按章节和题型拆分题目数据
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
  inputDir: "public/data/questions",
  outputDir: "public/data/questions",
  languages: ["zh", "en"],
  chapters: {
    "chapter1-knowledge-representation": "知识表示",
    "chapter2-prolog-basics": "Prolog基础",
    "chapter3-prolog-debugging": "Prolog调试",
    "chapter5-prolog-lists-operators": "Prolog列表和操作符",
    "chapter6-prolog-negation": "Prolog否定",
    "chapter7-midterm-review": "期中复习",
  },
  questionTypes: {
    "multiple-choice": "选择题",
    "true-false": "判断题",
    text: "文本题",
  },
};

/**
 * 读取JSON文件
 */
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * 写入JSON文件
 */
function writeJsonFile(filePath, data) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Created: ${filePath}`);
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error.message);
  }
}

/**
 * 按章节拆分题目
 */
function splitByChapter(questions, courseId, language) {
  const chapterGroups = {};

  // 初始化章节组
  Object.keys(CONFIG.chapters).forEach((chapterKey) => {
    chapterGroups[chapterKey] = [];
  });

  // 按章节分组
  questions.forEach((question) => {
    const chapterTag = question.tags.find((tag) => tag.startsWith("chapter"));
    if (chapterTag && chapterGroups[chapterTag]) {
      chapterGroups[chapterTag].push(question);
    }
  });

  // 创建章节文件
  Object.entries(chapterGroups).forEach(([chapterKey, chapterQuestions]) => {
    if (chapterQuestions.length > 0) {
      const chapterData = {
        courseId,
        chapterId: chapterKey,
        title: CONFIG.chapters[chapterKey],
        description: `${CONFIG.chapters[chapterKey]}相关题目`,
        totalQuestions: chapterQuestions.length,
        lastUpdated: new Date().toISOString().split("T")[0],
        language,
        questions: chapterQuestions,
      };

      const fileName = `${courseId}-${chapterKey}-${language}.json`;
      const filePath = path.join(CONFIG.outputDir, "chapters", fileName);
      writeJsonFile(filePath, chapterData);
    }
  });
}

/**
 * 按题型拆分题目
 */
function splitByType(questions, courseId, language) {
  const typeGroups = {};

  // 初始化题型组
  Object.keys(CONFIG.questionTypes).forEach((typeKey) => {
    typeGroups[typeKey] = [];
  });

  // 按题型分组
  questions.forEach((question) => {
    if (typeGroups[question.type]) {
      typeGroups[question.type].push(question);
    }
  });

  // 创建题型文件
  Object.entries(typeGroups).forEach(([typeKey, typeQuestions]) => {
    if (typeQuestions.length > 0) {
      const typeData = {
        courseId,
        questionType: typeKey,
        title: `${CONFIG.questionTypes[typeKey]} - ${courseId}`,
        description: `${CONFIG.questionTypes[typeKey]}相关题目`,
        totalQuestions: typeQuestions.length,
        lastUpdated: new Date().toISOString().split("T")[0],
        language,
        questions: typeQuestions,
      };

      const fileName = `${courseId}-${typeKey}-${language}.json`;
      const filePath = path.join(CONFIG.outputDir, "types", fileName);
      writeJsonFile(filePath, typeData);
    }
  });
}

/**
 * 创建索引文件
 */
function createIndexFile(courseId, language, chapters, types) {
  const indexData = {
    courseId,
    language,
    title:
      language === "zh"
        ? "知识表示与推理"
        : "Knowledge Representation and Reasoning",
    description:
      language === "zh"
        ? "学习知识表示和推理的基础知识"
        : "Learn the fundamentals of knowledge representation and reasoning",
    lastUpdated: new Date().toISOString().split("T")[0],
    chapters: Object.entries(chapters).map(([chapterId, count]) => ({
      chapterId,
      title: CONFIG.chapters[chapterId],
      questionCount: count,
      fileName: `${courseId}-${chapterId}-${language}.json`,
    })),
    questionTypes: Object.entries(types).map(([type, count]) => ({
      type,
      title: CONFIG.questionTypes[type],
      questionCount: count,
      fileName: `${courseId}-${type}-${language}.json`,
    })),
    totalQuestions: Object.values(chapters).reduce(
      (sum, count) => sum + count,
      0
    ),
  };

  const fileName = `${courseId}-index-${language}.json`;
  const filePath = path.join(CONFIG.outputDir, fileName);
  writeJsonFile(filePath, indexData);
}

/**
 * 主函数
 */
function main() {
  console.log("🚀 Starting question splitting process...\n");

  CONFIG.languages.forEach((language) => {
    console.log(`📝 Processing ${language} questions...`);

    const inputFile = path.join(CONFIG.inputDir, `cst8503-${language}.json`);
    const data = readJsonFile(inputFile);

    if (!data || !data.questions) {
      console.error(`❌ No valid data found in ${inputFile}`);
      return;
    }

    const courseId = data.courseId;
    const questions = data.questions;

    console.log(`   Found ${questions.length} questions`);

    // 按章节拆分
    console.log("   📚 Splitting by chapters...");
    splitByChapter(questions, courseId, language);

    // 按题型拆分
    console.log("   🎯 Splitting by question types...");
    splitByType(questions, courseId, language);

    // 统计信息
    const chapterStats = {};
    const typeStats = {};

    questions.forEach((question) => {
      // 统计章节
      const chapterTag = question.tags.find((tag) => tag.startsWith("chapter"));
      if (chapterTag) {
        chapterStats[chapterTag] = (chapterStats[chapterTag] || 0) + 1;
      }

      // 统计题型
      typeStats[question.type] = (typeStats[question.type] || 0) + 1;
    });

    // 创建索引文件
    console.log("   📋 Creating index file...");
    createIndexFile(courseId, language, chapterStats, typeStats);

    console.log(`✅ Completed processing ${language} questions\n`);
  });

  console.log("🎉 Question splitting completed successfully!");
  console.log("\n📁 New file structure:");
  console.log("   public/data/questions/");
  console.log("   ├── chapters/          # 按章节拆分");
  console.log("   ├── types/             # 按题型拆分");
  console.log("   └── *-index-*.json     # 索引文件");
}

// 运行脚本
main();

export { main, CONFIG };
