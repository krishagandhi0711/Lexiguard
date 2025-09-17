import React from "react";

export function Textarea({ placeholder = "", className = "", ...props }) {
  return (
    <textarea
      placeholder={placeholder}
      className={`border rounded-md 
                  bg-white dark:bg-[#1E1E1E] 
                  text-gray-900 dark:text-[#EAEAEA] 
                  placeholder-gray-400 dark:placeholder-gray-500
                  px-3 py-2 w-full
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${className}`}
      {...props}
    />
  );
}
