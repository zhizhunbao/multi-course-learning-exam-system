import React from "react";
import "./Card.css";

const Card = ({
  children,
  title = "",
  subtitle = "",
  header = null,
  footer = null,
  variant = "default",
  hoverable = false,
  className = "",
  onClick,
  ...props
}) => {
  const variantClasses = {
    default: "card-default",
    primary: "card-primary",
    secondary: "card-secondary",
    success: "card-success",
    danger: "card-danger",
    warning: "card-warning",
    info: "card-info",
  };

  const classes = [
    "card",
    variantClasses[variant] || variantClasses.default,
    hoverable ? "card-hoverable" : "",
    onClick ? "card-clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={onClick} {...props}>
      {(header || title || subtitle) && (
        <div className="card-header">
          {header || (
            <>
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </>
          )}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
