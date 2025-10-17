/**
 * DataService 使用示例
 * 展示如何使用拆分后的题目数据
 */

import dataService from "../src/services/DataService.js";

// 示例：获取课程索引信息
async function getCourseIndexExample() {
  try {
    const index = await dataService.getCourseIndex("cst8503", "zh");
    console.log("课程索引:", index);

    // 显示章节信息
    console.log("\n章节列表:");
    index.chapters.forEach((chapter) => {
      console.log(`- ${chapter.title}: ${chapter.questionCount} 题`);
    });

    // 显示题型信息
    console.log("\n题型列表:");
    index.questionTypes.forEach((type) => {
      console.log(`- ${type.title}: ${type.questionCount} 题`);
    });
  } catch (error) {
    console.error("获取课程索引失败:", error);
  }
}

// 示例：获取特定章节的题目
async function getChapterQuestionsExample() {
  try {
    const chapterQuestions = await dataService.getChapterQuestions(
      "cst8503",
      "chapter2-prolog-basics",
      "zh"
    );
    console.log("Prolog基础章节题目:", chapterQuestions);
    console.log(`共 ${chapterQuestions.totalQuestions} 题`);
  } catch (error) {
    console.error("获取章节题目失败:", error);
  }
}

// 示例：获取特定题型的题目
async function getQuestionsByTypeExample() {
  try {
    const multipleChoiceQuestions = await dataService.getQuestionsByType(
      "cst8503",
      "multiple-choice",
      "zh"
    );
    console.log("选择题:", multipleChoiceQuestions);
    console.log(`共 ${multipleChoiceQuestions.totalQuestions} 题`);
  } catch (error) {
    console.error("获取题型题目失败:", error);
  }
}

// 示例：获取所有题目（保持向后兼容）
async function getAllQuestionsExample() {
  try {
    const allQuestions = await dataService.getQuestions("cst8503", "zh");
    console.log("所有题目:", allQuestions);
    console.log(`共 ${allQuestions.totalQuestions} 题`);
  } catch (error) {
    console.error("获取所有题目失败:", error);
  }
}

// 示例：组合使用 - 获取特定章节的特定题型题目
async function getCombinedExample() {
  try {
    // 先获取章节题目
    const chapterQuestions = await dataService.getChapterQuestions(
      "cst8503",
      "chapter2-prolog-basics",
      "zh"
    );

    // 然后过滤出选择题
    const multipleChoiceInChapter = chapterQuestions.questions.filter(
      (q) => q.type === "multiple-choice"
    );

    console.log("Prolog基础章节中的选择题:", multipleChoiceInChapter);
    console.log(`共 ${multipleChoiceInChapter.length} 题`);
  } catch (error) {
    console.error("获取组合题目失败:", error);
  }
}

// 运行示例
async function runExamples() {
  console.log("=== DataService 使用示例 ===\n");

  console.log("1. 获取课程索引信息");
  await getCourseIndexExample();

  console.log("\n2. 获取特定章节题目");
  await getChapterQuestionsExample();

  console.log("\n3. 获取特定题型题目");
  await getQuestionsByTypeExample();

  console.log("\n4. 获取所有题目");
  await getAllQuestionsExample();

  console.log("\n5. 组合使用示例");
  await getCombinedExample();
}

// 如果在浏览器环境中运行
if (typeof window !== "undefined") {
  window.runDataServiceExamples = runExamples;
} else {
  // 如果在Node.js环境中运行
  runExamples().catch(console.error);
}
