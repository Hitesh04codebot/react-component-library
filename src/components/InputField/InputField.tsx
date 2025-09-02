import React, { useState } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  clearable = false,
  showPasswordToggle = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleClear = () => {
    setInternalValue('');
    if (onChange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-3 text-base',
    lg: 'py-3 px-4 text-lg',
  };

  // Variant classes
  const variantClasses = {
    filled: 'bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:border-transparent',
    outlined: 'bg-transparent border-gray-300 focus:ring-1',
    ghost: 'bg-transparent border-transparent border-b-gray-300 rounded-none focus:ring-0 focus:border-b-blue-500',
  };

  // State classes
  const stateClasses = `
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${invalid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}
  `;

  const inputClasses = `
    block w-full rounded-md border
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${stateClasses}
    transition-colors duration-200
  `;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label 
          className={`text-sm font-medium ${invalid ? 'text-red-600' : 'text-gray-700'}`}
          htmlFor={label.replace(/\s+/g, '-').toLowerCase()}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={label?.replace(/\s+/g, '-').toLowerCase()}
          type={inputType}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={inputClasses}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `${label}-help` : undefined}
        />
        
        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
        
        {/* Clear button */}
        {clearable && internalValue && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        {/* Password toggle */}
        {showPasswordToggle && isPasswordType && !loading && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <p 
          id={`${label}-help`}
          className={`text-xs ${invalid ? 'text-red-600' : 'text-gray-500'}`}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;