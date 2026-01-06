import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  
  const variantStyles = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] hover:shadow-[0_4px_6px_-2px_rgb(0_0_0_/_0.05),_0_10px_15px_-3px_rgb(0_0_0_/_0.08)] focus:ring-[#2563EB]/30 disabled:bg-[#93C5FD] disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]',
    secondary: 'bg-white border-2 border-[#E5E7EB] text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#EFF6FF]/30 active:bg-[#EFF6FF]/50 focus:ring-[#2563EB]/20 disabled:bg-[#F9FAFB] disabled:text-[#D1D5DB] disabled:border-[#E5E7EB] disabled:cursor-not-allowed disabled:scale-100 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.02)]',
    ghost: 'bg-transparent text-[#374151] hover:bg-[#F1F3F5] hover:text-[#111827] active:bg-[#E5E7EB] focus:ring-[#9CA3AF]/20 disabled:text-[#D1D5DB] disabled:cursor-not-allowed disabled:scale-100',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] hover:shadow-[0_4px_6px_-2px_rgb(0_0_0_/_0.05),_0_10px_15px_-3px_rgb(0_0_0_/_0.08)] focus:ring-[#EF4444]/30 disabled:bg-[#FCA5A5] disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]',
  };
  
  const sizeStyles = {
    sm: 'h-10 px-4 text-[14px]',
    md: 'h-11 px-5 text-[15px]',
    lg: 'h-12 px-6 text-[15px]',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Carregando...
        </>
      ) : children}
    </button>
  );
}