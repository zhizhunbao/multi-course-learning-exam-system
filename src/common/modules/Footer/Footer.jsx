import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>多课程学习与考试系统</h3>
            <p>亚岗昆学院在线学习平台</p>
            <p>提供高质量的编程课程和考试系统</p>
          </div>

          <div className="footer-section">
            <h4>快速链接</h4>
            <ul className="footer-links">
              <li>
                <a href="/courses">课程中心</a>
              </li>
              <li>
                <a href="/practice">练习题库</a>
              </li>
              <li>
                <a href="/exams">考试中心</a>
              </li>
              <li>
                <a href="/experiments">实验环境</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>学习资源</h4>
            <ul className="footer-links">
              <li>
                <a href="/help">帮助中心</a>
              </li>
              <li>
                <a href="/tutorials">使用教程</a>
              </li>
              <li>
                <a href="/faq">常见问题</a>
              </li>
              <li>
                <a href="/contact">联系我们</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>技术支持</h4>
            <ul className="footer-links">
              <li>
                <a href="/support">技术支持</a>
              </li>
              <li>
                <a href="/feedback">意见反馈</a>
              </li>
              <li>
                <a href="/bug-report">问题报告</a>
              </li>
              <li>
                <a href="/feature-request">功能建议</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>&copy; {currentYear} 亚岗昆学院. 保留所有权利.</p>
            <div className="footer-legal">
              <a href="/privacy">隐私政策</a>
              <span className="separator">|</span>
              <a href="/terms">服务条款</a>
              <span className="separator">|</span>
              <a href="/cookies">Cookie政策</a>
            </div>
          </div>

          <div className="footer-social">
            <span>关注我们:</span>
            <a href="#" className="social-link" aria-label="Facebook">
              📘
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              🐦
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              💼
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              📺
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
