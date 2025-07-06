"use client";
import React, { useState, forwardRef } from "react";

const TextArea = forwardRef(
  (
    {
      placeholder = "",
      value = "",
      onChange,
      disabled = false,
      error = false,
      errorMessage = "",
      label = "",
      required = false,
      className = "",
      rows = 4,
      maxLength,
      resize = "vertical",
      variant = "simple",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(value?.length || 0);

    const variants = {
      simple: "border border-[#ffad65] focus:border-[#ffad65]",
      outline: "border border-gray-300 focus:border-blue-500",
      filled:
        "bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500",
    };

    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    const handleFocus = (e) => {
      setIsFocused(true);
      if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      if (props.onBlur) props.onBlur(e);
    };

    const handleChange = (e) => {
      setCharCount(e.target.value.length);
      if (onChange) onChange(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full
            px-4 py-4
            text-lg sm:text-xl
            font-muller font-light
            bg-white
            placeholder:text-gray-600
            rounded-sm
            focus:outline-none
            transition-all duration-150 ease-in-out
            ${variants[variant]}
            ${resizeClasses[resize]}
            ${error ? "border-red-500 focus:border-red-500" : ""}
            ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}
            ${className}
          `.replace(/\s+/g, " ")}
          {...props}
        />

        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
        {maxLength && (
          <p
            className={`text-sm text-right mt-1 ${
              charCount > maxLength * 0.9 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
