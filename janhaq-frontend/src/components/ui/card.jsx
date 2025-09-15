import React from "react";

export function Card({ children, className }) {
  return <div className={`rounded-2xl shadow-lg bg-white dark:bg-[#1E1E1E] ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }) {
  return <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h2 className={`text-lg font-bold text-gray-900 dark:text-[#EAEAEA] ${className}`}>{children}</h2>;
}

export function CardContent({ children, className }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
