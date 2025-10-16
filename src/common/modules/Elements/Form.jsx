import React, { useState } from "react";
import "./Form.css";

const Form = ({
  children,
  onSubmit,
  initialValues = {},
  validation = {},
  className = "",
  ...props
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on blur
    if (validation[name]) {
      const error = validation[name](values[name]);
      if (error) {
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(validation).forEach((field) => {
      const error = validation[field](values[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validation).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(values);
    }
  };

  const formContext = {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  };

  const classes = ["form", className].filter(Boolean).join(" ");

  return (
    <form className={classes} onSubmit={handleSubmit} {...props}>
      <FormContext.Provider value={formContext}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

// Form Context for child components
const FormContext = React.createContext();

export const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form component");
  }
  return context;
};

export default Form;
