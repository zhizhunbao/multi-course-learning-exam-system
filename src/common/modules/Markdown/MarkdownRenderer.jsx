import { useMemo } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-dark.css"; // 改用深色主题
import "./MarkdownRenderer.css";

// 自定义代码块组件
const CodeBlock = ({ inline, className, children, ...props }) => {
  // 行内代码
  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  // 代码块
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

// 自定义 pre 组件（用于包装代码块）
const Pre = ({ children, ...props }) => {
  // 从 children 中提取 language 和代码内容
  const codeElement = children?.props;
  const match = /language-(\w+)/.exec(codeElement?.className || "");
  const language = match ? match[1] : "";
  const codeContent = codeElement?.children || "";

  const handleCopy = (e) => {
    const text =
      typeof codeContent === "string"
        ? codeContent
        : codeContent?.toString() || "";
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const btn = e.currentTarget;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        已复制!
      `;
        btn.style.color = "#27c93f";
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.color = "";
        }, 2000);
      })
      .catch(() => {
        // 静默处理错误
      });
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div className="code-block-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        {language && <div className="code-block-lang">{language}</div>}
        <button
          className="code-block-copy"
          onClick={handleCopy}
          title="复制代码"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect
              x="9"
              y="9"
              width="13"
              height="13"
              rx="2"
              ry="2"
              strokeWidth="2"
            />
            <path
              d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
              strokeWidth="2"
            />
          </svg>
          复制
        </button>
      </div>
      <pre {...props}>{children}</pre>
    </div>
  );
};

// 自定义表格组件
const Table = ({ children, ...props }) => (
  <div className="table-wrapper">
    <table {...props}>{children}</table>
  </div>
);

// 自定义链接组件
const Link = ({ href, children, ...props }) => {
  const isExternal = href && (href.startsWith("http") || href.startsWith("//"));

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

// 自定义图片组件
const Image = ({ src, alt, ...props }) => (
  <div className="image-wrapper">
    <img src={src} alt={alt} loading="lazy" {...props} />
    {alt && <p className="image-caption">{alt}</p>}
  </div>
);

// 自定义引用块组件
const Blockquote = ({ children, ...props }) => (
  <blockquote {...props}>{children}</blockquote>
);

// 自定义标题组件（为每个标题添加id以支持目录跳转）
const Heading = ({ level, children, ...props }) => {
  const text = children?.toString() || "";
  // 生成ID（移除特殊字符，转为小写，空格转为连字符）
  const id = text
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const Tag = `h${level}`;
  return (
    <Tag id={id} {...props}>
      {children}
    </Tag>
  );
};

const MarkdownRenderer = ({
  content,
  className = "",
  showToc = false,
  ...props
}) => {
  const components = useMemo(
    () => ({
      pre: Pre,
      code: CodeBlock,
      table: Table,
      a: Link,
      img: Image,
      blockquote: Blockquote,
      h1: (props) => <Heading level={1} {...props} />,
      h2: (props) => <Heading level={2} {...props} />,
      h3: (props) => <Heading level={3} {...props} />,
      h4: (props) => <Heading level={4} {...props} />,
      h5: (props) => <Heading level={5} {...props} />,
      h6: (props) => <Heading level={6} {...props} />,
    }),
    []
  );

  const remarkPlugins = useMemo(() => {
    const plugins = [
      remarkGfm, // GitHub Flavored Markdown
      remarkMath, // 数学公式
      remarkEmoji, // Emoji 支持
    ]; // 已移除 remarkRemoveMindmap

    if (showToc) {
      plugins.push([
        remarkToc,
        {
          heading: "目录|toc|table[ -]of[ -]contents?",
          tight: true,
          ordered: false,
        },
      ]);
    }

    return plugins;
  }, [showToc]);

  const rehypePlugins = useMemo(
    () => [
      rehypeRaw, // 原始 HTML 支持
      rehypeKatex, // 数学公式渲染
      [
        rehypeHighlight,
        {
          detect: true,
          ignoreMissing: true,
          subset: false,
        },
      ], // 代码高亮
    ],
    []
  );

  if (!content) {
    return <div className="markdown-renderer loading">内容正在加载中...</div>;
  }

  return (
    <div className={`markdown-renderer prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
        {...props}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

MarkdownRenderer.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
  showToc: PropTypes.bool,
};

CodeBlock.propTypes = {
  inline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

Pre.propTypes = {
  children: PropTypes.node,
};

Table.propTypes = {
  children: PropTypes.node,
};

Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

Blockquote.propTypes = {
  children: PropTypes.node,
};

Heading.propTypes = {
  level: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default MarkdownRenderer;
