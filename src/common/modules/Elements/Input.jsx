import React, { useState } from "react";
import "./Input.css";

const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error = "",
  label = "",
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const classes = [
    "input-wrapper",
    isFocused ? "input-focused" : "",
    error ? "input-error" : "",
    disabled ? "input-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;
