import React from 'react';

/**
 * AccessibleButton - An accessible button component
 * @param {Object} props - Component props
 * @param {string} [props.ariaLabel] - Accessible label for screen readers
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} [props.className] - Additional CSS classes
 */
const AccessibleButton = ({ 
  ariaLabel, 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  // Ensure buttons always have an accessible name
  const accessibleProps = {
    'aria-label': ariaLabel,
    role: 'button',
    tabIndex: disabled ? -1 : 0,
  };

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...accessibleProps}
      {...props}
    >
      {children}
    </button>
  );
};

export default AccessibleButton;
