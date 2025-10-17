import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./Alert.css";

const Alert = ({
  type = "info",
  title = "",
  message = "",
  children,
  dismissible = false,
  autoClose = false,
  duration = 5000,
  onClose,
  className = "",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, handleClose]);

  if (!isVisible) return null;

  const typeClasses = {
    success: "alert-success",
    error: "alert-error",
    warning: "alert-warning",
    info: "alert-info",
  };

  const classes = [
    "alert",
    typeClasses[type] || typeClasses.info,
    dismissible ? "alert-dismissible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div className={classes} {...props}>
      <div className="alert-icon">{icons[type] || icons.info}</div>
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        <div className="alert-message">{message || children}</div>
      </div>
      {dismissible && (
        <button
          className="alert-close"
          onClick={handleClose}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
  dismissible: PropTypes.bool,
  autoClose: PropTypes.bool,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default Alert;
