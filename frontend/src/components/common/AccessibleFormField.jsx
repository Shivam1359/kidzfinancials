import React from 'react';

/**
 * AccessibleFormField - An accessible form field with proper labeling
 * @param {Object} props - Component props
 * @param {string} props.id - Unique ID for the form field
 * @param {string} props.label - Label text
 * @param {string} props.type - Input type (text, email, etc.)
 * @param {Function} props.onChange - Change handler
 * @param {string} [props.value] - Field value
 * @param {boolean} [props.required] - Whether the field is required
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.errorMessage] - Error message to display
 */
const AccessibleFormField = ({
  id,
  label,
  type = 'text',
  onChange,
  value = '',
  required = false,
  placeholder = '',
  errorMessage = '',
  className = '',
  labelClassName = '',
  inputClassName = '',
  ...props
}) => {
  const hasError = errorMessage.length > 0;
  const errorId = `${id}-error`;
  
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id} className={labelClassName}>
        {label}
        {required && <span aria-hidden="true" className="required-indicator">*</span>}
        <span className="visually-hidden">{required ? '(required)' : '(optional)'}</span>
      </label>
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className={`${inputClassName} ${hasError ? 'input-error' : ''}`}
        {...props}
      />
      
      {hasError && (
        <div id={errorId} className="error-message" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default AccessibleFormField;
