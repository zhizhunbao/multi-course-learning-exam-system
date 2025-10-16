import React, { useEffect } from "react";
import "./Modal.css";

const Modal = ({
  isOpen = false,
  onClose,
  title = "",
  children,
  size = "medium",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose?.();
    }
  };

  const sizeClasses = {
    small: "modal-small",
    medium: "modal-medium",
    large: "modal-large",
    fullscreen: "modal-fullscreen",
  };

  const classes = ["modal-overlay", className].filter(Boolean).join(" ");

  const modalClasses = ["modal", sizeClasses[size] || sizeClasses.medium]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={handleOverlayClick}>
      <div className={modalClasses}>
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {showCloseButton && (
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
