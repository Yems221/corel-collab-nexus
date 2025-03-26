
import React from 'react';
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
};

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled, 
  onClick, 
  children, 
  type = 'button',
  fullWidth = false
}: ButtonProps) => {
  const baseClasses = "relative inline-flex items-center justify-center rounded-md transition-all duration-200 ease-in-out font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden active:scale-95";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  };
  
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-md"
  };

  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-md">
        <div className="absolute inset-0 transform origin-bottom opacity-25 transition-all duration-300 ease-in-out group-hover:opacity-10">
          <div className="h-full w-full scale-y-0 transform bg-white transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
        </div>
      </div>
    </button>
  );
};

export default Button;
