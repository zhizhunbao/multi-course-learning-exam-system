import React from "react";
import "./Loading.css";

const Loading = ({
  size = "medium",
  type = "spinner",
  text = "Loading...",
  overlay = false,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    small: "loading-sm",
    medium: "loading-md",
    large: "loading-lg",
  };

  const classes = [
    "loading",
    sizeClasses[size] || sizeClasses.medium,
    overlay ? "loading-overlay" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderSpinner = () => (
    <div className="loading-spinner">
      <div className="spinner-circle"></div>
    </div>
  );

  const renderDots = () => (
    <div className="loading-dots">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );

  const renderPulse = () => (
    <div className="loading-pulse">
      <div className="pulse-circle"></div>
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "spinner":
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={classes} {...props}>
      {renderLoader()}
      {text && <div className="loading-text">{text}</div>}
    </div>
  );
};

export default Loading;
