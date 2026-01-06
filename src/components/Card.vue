<script setup lang="ts">
interface CardProps {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  noPadding?: boolean;
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  size: 'medium',
  noPadding: false
});

const variantStyles = {
  default: 'border-[#E5E7EB]/60 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)] hover:shadow-[0_4px_6px_-2px_rgb(0_0_0_/_0.05),_0_10px_15px_-3px_rgb(0_0_0_/_0.08)]',
  info: 'border-[#DBEAFE]/60 bg-gradient-to-br from-white to-[#EFF6FF]/30 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]',
  success: 'border-[#D1FAE5]/60 bg-gradient-to-br from-white to-[#ECFDF5]/30 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]',
  warning: 'border-[#FEF3C7]/60 bg-gradient-to-br from-white to-[#FFFBEB]/30 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]',
  error: 'border-[#FEE2E2]/60 bg-gradient-to-br from-white to-[#FEF2F2]/30 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]',
};

const sizeStyles = {
  small: props.noPadding ? '' : 'p-6',
  medium: props.noPadding ? '' : 'p-8',
  large: props.noPadding ? '' : 'p-10',
};
</script>

<template>
  <div 
    class="bg-white rounded-2xl border transition-all duration-300"
    :class="[variantStyles[variant], sizeStyles[size]]"
  >
    <slot />
  </div>
</template>
