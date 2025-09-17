import React from "react";

export function Input({ className, ...props }) {
  return (
    <input
      className={`border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500
                  bg-white dark:bg-[#1E1E1E] 
                  text-gray-900 dark:text-[#EAEAEA] 
                  placeholder-gray-400 dark:placeholder-gray-500
                  ${className}`}
      {...props}
    />
  );
}
