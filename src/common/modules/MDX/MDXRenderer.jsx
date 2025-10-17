import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-dark.css";
import "../Markdown/MarkdownRenderer.css";
import "./MDXRenderer.css";

// 自定义代码块组件 - 增强版（带复制功能）
const CodeBlock = ({ className, children, ...props }) => {
  const language = className?.replace(/language-/, "") || "text";
  const codeContent =
    typeof children === "string" ? children : children?.toString() || "";

  const handleCopy = (e) => {
    navigator.clipboard
      .writeText(codeContent)
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
      <pre className={className} {...props}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

CodeBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

// 自定义图片组件（带懒加载和标题）
const Image = ({ src, alt, ...props }) => (
  <div className="image-wrapper">
    <img src={src} alt={alt} loading="lazy" {...props} />
    {alt && <p className="image-caption">{alt}</p>}
  </div>
);

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

// 自定义链接组件（外部链接新窗口打开）
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

Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

// 自定义标题组件（添加锚点，支持中文）
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

Heading.propTypes = {
  level: PropTypes.number.isRequired,
  children: PropTypes.node,
};

// MDX 组件映射
const components = {
  // 自定义代码块
  pre: ({ children }) => {
    return <>{children}</>;
  },
  code: ({ inline, className, children, ...props }) => {
    if (inline) {
      return (
        <code className="inline-code" {...props}>
          {children}
        </code>
      );
    }
    return (
      <CodeBlock className={className} {...props}>
        {children}
      </CodeBlock>
    );
  },

  // 自定义标题（添加锚点）
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,

  // 自定义表格（响应式包装）
  table: ({ children, ...props }) => (
    <div className="table-wrapper">
      <table {...props}>{children}</table>
    </div>
  ),

  // 自定义图片（懒加载 + 标题）
  img: Image,

  // 自定义链接（外部链接处理）
  a: Link,

  // 自定义引用块
  blockquote: ({ children, ...props }) => (
    <blockquote className="custom-blockquote" {...props}>
      {children}
    </blockquote>
  ),
};

const MDXRenderer = ({ mdxPath, className = "", onLoad }) => {
  const [MDXContent, setMDXContent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMDX = async () => {
      try {
        setLoading(true);
        setError(null);

        // 动态导入 MDX 文件
        const module = await import(/* @vite-ignore */ mdxPath);
        setMDXContent(() => module.default);

        if (onLoad) {
          onLoad();
        }
      } catch (err) {
        console.error("Failed to load MDX:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (mdxPath) {
      loadMDX();
    }
  }, [mdxPath, onLoad]);

  if (loading) {
    return (
      <div className="mdx-loading">
        <div className="loading-spinner"></div>
        <p>加载内容中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mdx-error">
        <h3>加载失败</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!MDXContent) {
    return null;
  }

  return (
    <div className={`markdown-body ${className}`}>
      <MDXProvider components={components}>
        <MDXContent />
      </MDXProvider>
    </div>
  );
};

MDXRenderer.propTypes = {
  mdxPath: PropTypes.string.isRequired,
  className: PropTypes.string,
  onLoad: PropTypes.func,
};

export default MDXRenderer;
