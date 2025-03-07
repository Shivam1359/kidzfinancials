import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', message = 'Loading content...' }) => {
  const sizeClass = {
    small: 'spinner-small',
    medium: 'spinner',
    large: 'spinner-large'
  }[size] || 'spinner';

  return (
    <div className="loading-container" aria-busy="true" role="alert">
      <div className={sizeClass} aria-hidden="true"></div>
      <span className="visually-hidden">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
