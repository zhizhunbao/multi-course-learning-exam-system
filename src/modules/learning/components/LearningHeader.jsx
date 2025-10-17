import { ChevronLeft } from "lucide-react";
import PropTypes from "prop-types";

const LearningHeader = ({ onBack }) => {
  return (
    <div className="bg-white px-6 py-3">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-0.5" />
          返回
        </button>
      </div>
    </div>
  );
};

LearningHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default LearningHeader;
