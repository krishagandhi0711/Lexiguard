import React from "react";

export function Button({ children, onClick, variant = "default", size = "md" }) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none";
  const variants = {
    default: "bg-blue-900 text-white hover:bg-blue-800",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  };
  const sizes = {
    md: "px-4 py-2 text-sm",
    icon: "p-2",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
}
