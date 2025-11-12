import { useTranslation } from "react-i18next";
import { FileText, Construction } from "lucide-react";

const ExamModule = () => {
  const { t } = useTranslation("exam");

  return (
    <div className="flex items-center justify-center h-[60vh] px-4">
      <div className="card max-w-xl w-full p-10 text-center space-y-6">
        <div className="flex items-center justify-center">
          <div className="relative">
            <FileText className="w-16 h-16 text-algonquin-red mx-auto" />
            <Construction className="w-8 h-8 text-gray-400 absolute -bottom-2 -right-2 bg-white rounded-full p-1" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("comingSoon.title")}
          </h1>
          <p className="text-gray-600">{t("comingSoon.description")}</p>
        </div>
        <p className="text-sm text-gray-500">{t("comingSoon.note")}</p>
      </div>
    </div>
  );
};

export default ExamModule;
