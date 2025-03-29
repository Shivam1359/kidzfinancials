import { useCallback, useState } from 'react';

/**
 * Custom hook for form validation with predefined validation rules
 * @param {Object} initialValues - Initial form values
 * @param {Function} validateFunction - Custom validation function
 * @returns {Object} - Form values, errors, handlers, and validation state
 */
const useFormValidation = (initialValues = {}, validateFunction = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common validation rules
  const validationRules = {
    required: (value) => (value ? '' : 'This field is required'),
    email: (value) => {
      if (!value) return '';
      return /^\S+@\S+\.\S+$/.test(value) ? '' : 'Valid email is required';
    },
    phone: (value) => {
      if (!value) return '';
      return /^\d{10}$/.test(value.replace(/\D/g, '')) ? '' : 'Valid 10-digit phone number is required';
    },
    minLength: (value, length) => {
      if (!value) return '';
      return value.length >= length ? '' : `Must be at least ${length} characters`;
    },
    maxLength: (value, length) => {
      if (!value) return '';
      return value.length <= length ? '' : `Must be at most ${length} characters`;
    }
  };

  // Validate a single field
  const validateField = useCallback((name, value) => {
    if (validateFunction) {
      return validateFunction(name, value);
    }
    return '';
  }, [validateFunction]);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
    
    // Validate the field
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [touched, validateField]);

  // Set a value programmatically
  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate the field
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  // Handle form submission
  const handleSubmit = useCallback((submitCallback) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate all fields
    const newErrors = {};
    let isValid = true;
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Check for errors
    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    
    if (isValid && submitCallback) {
      try {
        await submitCallback(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
    return isValid;
  }, [values, validateField]);

  // Reset the form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    setValue,
    handleSubmit,
    resetForm,
    isValid,
    validationRules
  };
};

export default useFormValidation; 