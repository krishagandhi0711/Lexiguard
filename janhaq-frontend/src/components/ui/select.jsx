import React from "react";

export function Select({ value, onValueChange, children, className }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-[#EAEAEA] ${className}`}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <option disabled>{placeholder}</option>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
