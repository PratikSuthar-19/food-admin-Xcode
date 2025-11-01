import React from "react";
import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "w-full px-4 py-2 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-all",
        className
      )}
      {...props}
    />
  );
};
