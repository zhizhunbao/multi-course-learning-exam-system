import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../../context/AppContext";
import { GraduationCap, Globe } from "lucide-react";
import "./Login.css";

const Login = () => {
  const { t, i18n } = useTranslation("login");
  const { login, addNotification } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({});

  // 语言切换函数
  const toggleLanguage = () => {
    const newLang = i18n.language === "zh-CN" ? "en" : "zh-CN";
    i18n.changeLanguage(newLang);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 清除对应字段的错误
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("enterName");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 创建用户对象
    const userData = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      loginTime: new Date().toISOString(),
    };

    // 登录用户
    login(userData);

    // 显示成功消息
    addNotification({
      type: "success",
      message: t("welcome") + ", " + userData.name,
    });

    // 重定向到仪表板
    navigate("/");
  };

  return (
    <div className="login-container">
      {/* 语言切换按钮 */}
      <button
        onClick={toggleLanguage}
        className="login-lang-btn"
        title={i18n.language === "en" ? "Switch to Chinese" : "切换到英文"}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {i18n.language === "en" ? "中文" : "EN"}
        </span>
      </button>

      <div className="login-content">
        {/* Logo和标题 */}
        <div className="login-header">
          <div className="login-logo">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="login-title">{t("title")}</h1>
          <p className="login-subtitle">{t("subtitle")}</p>
        </div>

        {/* 登录表单 */}
        <div className="login-form-wrapper">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="name" className="login-label">
                {t("enterName")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t("namePlaceholder")}
                className={`login-input ${
                  errors.name ? "login-input-error" : ""
                }`}
                autoComplete="name"
                autoFocus
              />
              {errors.name && <p className="login-error">{errors.name}</p>}
            </div>

            <button type="submit" className="login-submit-btn">
              {t("loginButton")}
            </button>
          </form>

          <div className="login-footer">
            <p className="login-footer-text">{t("welcome")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
