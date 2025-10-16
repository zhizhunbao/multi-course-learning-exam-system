import { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Card, Button, Alert } from "/src/common/modules/Elements/index.js";
import { Eye, EyeOff } from "lucide-react";
import "./QuestionCard.css";

const QuestionCard = ({
  question,
  onAnswer,
  onNext,
  onPrevious,
  isFirst = false,
  isLast = false,
  userAnswer = null,
  showSubmitButton = true,
  showNavigationButtons = true,
  practiceMode = false, // 练习模式，不显示立即反馈
}) => {
  const { t } = useTranslation("practice");
  const [selectedAnswer, setSelectedAnswer] = useState(userAnswer);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      return;
    }

    const correct = checkAnswer(selectedAnswer);
    setIsCorrect(correct);

    if (!practiceMode) {
      setShowResult(true);
    }

    onAnswer?.(selectedAnswer, correct);
  };

  const checkAnswer = (answer) => {
    switch (question.type) {
      case "multiple-choice":
        return answer === question.correctAnswer;
      case "true-false":
        return answer === question.correctAnswer;
      case "text":
        // 对于文本题，检查是否包含正确答案中的关键词
        if (answer && question.correctAnswer) {
          const userAnswerLower = answer.toLowerCase();
          const correctAnswerLower = question.correctAnswer.toLowerCase();
          const keywords = correctAnswerLower
            .split(/[，。\s]+/)
            .filter((word) => word.length > 2);
          return keywords.some((keyword) => userAnswerLower.includes(keyword));
        }
        return false;
      case "fill-blank":
        return (
          answer.toLowerCase().trim() ===
          question.correctAnswer.toLowerCase().trim()
        );
      case "short-answer":
        return (
          answer.toLowerCase().trim() ===
          question.correctAnswer.toLowerCase().trim()
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    onNext?.();
  };

  const handlePrevious = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    onPrevious?.();
  };

  const renderMultipleChoice = () => (
    <div className="answer-options">
      {question.options &&
        question.options.map((option, index) => (
          <label key={index} className="option-label">
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => handleAnswerSelect(e.target.value)}
              disabled={showResult}
            />
            <span className="option-text">{option}</span>
          </label>
        ))}
    </div>
  );

  const renderFillBlank = () => (
    <div className="fill-blank">
      <p className="question-text">
        {question.text &&
          question.text.split("___").map((part, index) => (
            <span key={index}>
              {part}
              {index < question.text.split("___").length - 1 && (
                <input
                  type="text"
                  value={selectedAnswer || ""}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  disabled={showResult}
                  className="blank-input"
                  placeholder={t("placeholders.yourAnswer")}
                />
              )}
            </span>
          ))}
      </p>
    </div>
  );

  const renderShortAnswer = () => (
    <div className="short-answer">
      <textarea
        value={selectedAnswer || ""}
        onChange={(e) => handleAnswerSelect(e.target.value)}
        disabled={showResult}
        placeholder={t("placeholders.enterAnswer")}
        className="answer-textarea"
        rows={4}
      />
    </div>
  );

  const renderTrueFalse = () => (
    <div className="answer-options">
      {question.options &&
        question.options.map((option, index) => (
          <label key={index} className="option-label">
            <input
              type="radio"
              name="answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={(e) => handleAnswerSelect(parseInt(e.target.value))}
              disabled={showResult}
            />
            <span className="option-text">{option}</span>
          </label>
        ))}
    </div>
  );

  const renderText = () => (
    <div className="text-answer">
      <textarea
        value={selectedAnswer || ""}
        onChange={(e) => handleAnswerSelect(e.target.value)}
        disabled={showResult}
        placeholder={t("placeholders.enterAnswer")}
        className="answer-textarea"
        rows={4}
      />
    </div>
  );

  const renderProgramming = () => (
    <div className="programming-question">
      <div className="code-editor">
        <textarea
          value={selectedAnswer || ""}
          onChange={(e) => handleAnswerSelect(e.target.value)}
          disabled={showResult}
          placeholder={t("placeholders.writeCode")}
          className="code-textarea"
          rows={10}
        />
      </div>
    </div>
  );

  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple-choice":
        return renderMultipleChoice();
      case "true-false":
        return renderTrueFalse();
      case "text":
        return renderText();
      case "fill-blank":
        return renderFillBlank();
      case "short-answer":
        return renderShortAnswer();
      case "programming":
        return renderProgramming();
      default:
        return <p>{t("questionTypes.unsupported")}</p>;
    }
  };

  const renderAnswerDisplay = () => {
    if (!showAnswer) return null;

    return (
      <div className="answer-display">
        <div className="answer-section">
          <h4 className="answer-title">{t("answer.correctAnswer")}</h4>
          <div className="answer-content">
            {question.type === "multiple-choice" ||
            question.type === "true-false" ? (
              <p className="answer-text">
                {question.options && question.options[question.correctAnswer]
                  ? question.options[question.correctAnswer]
                  : question.correctAnswer}
              </p>
            ) : question.type === "fill-blank" ? (
              <p className="answer-text">{question.correctAnswer}</p>
            ) : question.type === "short-answer" || question.type === "text" ? (
              <p className="answer-text">{question.correctAnswer}</p>
            ) : question.type === "programming" ? (
              <pre className="answer-code">{question.correctAnswer}</pre>
            ) : (
              <p className="answer-text">{question.correctAnswer}</p>
            )}
          </div>
        </div>

        {question.explanation && (
          <div className="explanation-section">
            <h4 className="explanation-title">{t("answer.explanation")}</h4>
            <p className="explanation-text">{question.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="question-card">
      <div className="question-header">
        <h3>
          {t("progress.question")} {question.id}
        </h3>
        <span className="question-type">
          {t(`questionTypes.${question.type}`)}
        </span>
      </div>

      <div className="question-content">
        <p className="question-text">{question.question}</p>
        {renderQuestionContent()}
        {renderAnswerDisplay()}
      </div>

      {showResult && (
        <Alert
          type={isCorrect ? "success" : "error"}
          message={isCorrect ? t("feedback.correct") : t("feedback.incorrect")}
        />
      )}

      <div className="question-actions">
        {showNavigationButtons && (
          <div className="navigation-buttons">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={isFirst}
            >
              {t("actions.previous")}
            </Button>
            <Button variant="secondary" onClick={handleNext} disabled={isLast}>
              {t("actions.next")}
            </Button>
          </div>
        )}

        {/* 显示答案按钮 - 仅在练习模式下显示 */}
        {practiceMode && (
          <div className="show-answer-button">
            <Button
              variant="outline"
              onClick={handleShowAnswer}
              className="flex items-center"
            >
              {showAnswer ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  {t("actions.hideAnswer")}
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  {t("actions.showAnswer")}
                </>
              )}
            </Button>
          </div>
        )}

        {showSubmitButton && (
          <div className="submit-button">
            {!showResult ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
              >
                {t("actions.submit")}
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext} disabled={isLast}>
                {t("actions.continue")}
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    explanation: PropTypes.string,
  }).isRequired,
  onAnswer: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  userAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showSubmitButton: PropTypes.bool,
  showNavigationButtons: PropTypes.bool,
  practiceMode: PropTypes.bool,
};

export default QuestionCard;
