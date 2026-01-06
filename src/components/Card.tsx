import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
}

export function Card({ 
  children, 
  variant = 'default', 
  size = 'medium',
  className = '',
  onClick,
  noPadding = false
}: CardProps) {
  const baseStyles = 'bg-white rounded-2xl border transition-all duration-300';
  
  const variantStyles = {
    default: 'border-[#E5E7EB]/60 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)] hover:shadow-[0_4px_6px_-2px_rgb(0_0_0_/_0.05),_0_10px_15px_-3px_rgb(0_0_0_/_0.08)]',
    info: 'border-[#DBEAFE]/60 bg-gradient-to-br from-white to-[#EFF6FF]/30 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]',
    success: 'border-[#D1FAE5]/60 bg-gradient-to-br from-white to-[#ECFDF5]/30 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]',
    warning: 'border-[#FEF3C7]/60 bg-gradient-to-br from-white to-[#FFFBEB]/30 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]',
    error: 'border-[#FEE2E2]/60 bg-gradient-to-br from-white to-[#FEF2F2]/30 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]',
  };
  
  const sizeStyles = {
    small: noPadding ? '' : 'p-6',
    medium: noPadding ? '' : 'p-8',
    large: noPadding ? '' : 'p-10',
  };
  
  const interactiveStyles = onClick ? 'cursor-pointer hover:shadow-[0_8px_10px_-6px_rgb(0_0_0_/_0.06),_0_20px_25px_-5px_rgb(0_0_0_/_0.08)] hover:border-[#2563EB]/20 hover:scale-[1.01]' : '';
  
  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${interactiveStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}