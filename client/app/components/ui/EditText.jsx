"use client";
import React, { useState, forwardRef } from "react";

const EditText = forwardRef(
  (
    {
      placeholder = "",
      value = "",
      onChange,
      type = "text",
      disabled = false,
      error = false,
      errorMessage = "",
      label = "",
      required = false,
      className = "",
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const variants = {
      default: "border border-[#ffad65] focus:border-[#ffad65]",
      outline: "border border-gray-300 focus:border-blue-500",
      filled:
        "bg-gray-100 border-transparent focus:bg-white focus:border-blue-500",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base sm:text-lg md:text-xl",
      lg: "px-5 py-4 text-lg sm:text-xl md:text-2xl",
    };

    const handleFocus = (e) => {
      setIsFocused(true);
      if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      if (props.onBlur) props.onBlur(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={`w-full font-muller font-light bg-white 
              placeholder:text-gray-600 rounded-sm
              transition-all duration-150 ease-in-out 
              focus:outline-none 
              ${variants[variant]} 
              ${sizes[size]} 
              ${error ? "border-red-500" : ""} 
              ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""} 
              ${className}`.trim()}
            {...props}
          />

          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

EditText.displayName = "EditText";

export default EditText;
