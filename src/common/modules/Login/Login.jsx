import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../../context/AppContext";
import { GraduationCap, User, Globe } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 relative">
      {/* 语言切换按钮 */}
      <button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg shadow-md transition-colors duration-200"
        title={i18n.language === "en" ? "Switch to Chinese" : "切换到英文"}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {i18n.language === "en" ? "中文" : "EN"}
        </span>
      </button>

      <div className="max-w-md w-full">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-algonquin-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-algonquin-blue mb-2">
            {t("title")}
          </h1>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>

        {/* 登录表单 */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 姓名输入 */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <User className="w-4 h-4 inline mr-2" />
                {t("enterName")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t("namePlaceholder")}
                className={`input-field ${errors.name ? "border-red-500" : ""}`}
                autoComplete="name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              className="w-full bg-algonquin-blue hover:bg-blue-800 text-white py-3 px-4 rounded-lg transition-colors duration-200 text-lg font-semibold"
            >
              {t("loginButton")}
            </button>
          </form>

          {/* 说明文字 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">{t("welcome")}</p>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2024 {t("subtitle")}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
