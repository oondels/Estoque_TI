import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helper, className = '', disabled, ...props }, ref) => {
    const hasError = !!error;
    
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-[15px] font-medium text-[#374151]">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={`
            w-full min-h-[100px] rounded-xl border transition-all duration-200
            text-[15px] text-[#374151] placeholder:text-[#9CA3AF] resize-y
            px-4 py-3 bg-white shadow-[0_1px_2px_0_rgb(0_0_0_/_0.02)]
            focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20 focus:border-[#2563EB]
            disabled:bg-[#F8F9FA] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
            ${hasError ? 'border-[#EF4444] focus:ring-[#EF4444] focus:ring-opacity-20 focus:border-[#EF4444]' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'}
            ${className}
          `}
          disabled={disabled}
          {...props}
        />
        
        {/* Espaço reservado para helper/error - altura mínima 24px */}
        <div className="min-h-[24px]">
          {error && (
            <span className="text-[13px] text-[#EF4444] font-medium">{error}</span>
          )}
          {!error && helper && (
            <span className="text-[13px] text-[#6B7280]">{helper}</span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';