import React, { useState, useEffect } from "react";
import { Button, Alert, Card } from "../../../common/modules/Elements";
import "./CodeEditor.css";

const CodeEditor = ({
  initialCode = "",
  language = "javascript",
  onCodeChange,
  onRun,
  onSave,
  readOnly = false,
  theme = "light",
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");
  const [lineNumbers, setLineNumbers] = useState([]);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    const lines = code.split("\n");
    setLineNumbers(lines.map((_, index) => index + 1));
  }, [code]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRun = async () => {
    if (!code.trim()) {
      setError("Please enter some code to run");
      return;
    }

    setIsRunning(true);
    setError("");
    setOutput("");

    try {
      // TODO: Replace with actual code execution API
      const response = await fetch("/api/execute-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const result = await response.json();

      if (result.success) {
        setOutput(result.output);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to execute code");
    } finally {
      setIsRunning(false);
    }

    onRun?.(code);
  };

  const handleSave = () => {
    onSave?.(code);
  };

  const handleFormat = () => {
    // Simple formatting for JavaScript
    if (language === "javascript") {
      try {
        const formatted = code
          .replace(/;/g, ";\n")
          .replace(/\{/g, "{\n")
          .replace(/\}/g, "\n}")
          .split("\n")
          .map((line) => line.trim())
          .join("\n");
        setCode(formatted);
        onCodeChange?.(formatted);
      } catch (err) {
        setError("Failed to format code");
      }
    }
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
    setError("");
    onCodeChange?.("");
  };

  const getLanguageMode = () => {
    switch (language) {
      case "javascript":
        return "javascript";
      case "python":
        return "python";
      case "java":
        return "java";
      case "cpp":
        return "cpp";
      default:
        return "text";
    }
  };

  return (
    <div className="code-editor">
      <Card className="editor-container">
        <div className="editor-header">
          <div className="editor-info">
            <span className="language-badge">{language}</span>
            <span className="line-count">{lineNumbers.length} lines</span>
          </div>

          <div className="editor-actions">
            <Button
              variant="secondary"
              size="small"
              onClick={handleFormat}
              disabled={readOnly}
            >
              Format
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={handleClear}
              disabled={readOnly}
            >
              Clear
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={handleSave}
              disabled={readOnly}
            >
              Save
            </Button>
            <Button
              variant="success"
              size="small"
              onClick={handleRun}
              loading={isRunning}
              disabled={readOnly}
            >
              Run
            </Button>
          </div>
        </div>

        <div className="editor-content">
          <div className="line-numbers">
            {lineNumbers.map((num) => (
              <div key={num} className="line-number">
                {num}
              </div>
            ))}
          </div>

          <textarea
            value={code}
            onChange={handleCodeChange}
            readOnly={readOnly}
            className={`code-textarea ${theme}`}
            placeholder={`Enter your ${language} code here...`}
            spellCheck={false}
          />
        </div>
      </Card>

      {(output || error) && (
        <Card className="output-container">
          <div className="output-header">
            <h4>Output</h4>
          </div>

          <div className="output-content">
            {error && <Alert type="error" message={error} />}
            {output && <pre className="output-text">{output}</pre>}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CodeEditor;
