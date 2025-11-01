import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; 
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  return (
    <div
      onClick={onClick} 
      className={`rounded-xl p-6 shadow-md transition-all duration-300 ${className} ${
        onClick ? "cursor-pointer hover:scale-[1.02]" : ""
      }`}
    >
      {children}
    </div>
  );
};

