<script setup lang="ts">
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default'
});

const variantStyles = {
  default: 'bg-[#F1F3F5] text-[#374151] ring-1 ring-[#E5E7EB]/50',
  success: 'bg-[#ECFDF5] text-[#166534] ring-1 ring-[#86EFAC]/30',
  warning: 'bg-[#FFFBEB] text-[#92400E] ring-1 ring-[#FCD34D]/30',
  error: 'bg-[#FEF2F2] text-[#991B1B] ring-1 ring-[#FCA5A5]/30',
  info: 'bg-[#EFF6FF] text-[#1E40AF] ring-1 ring-[#93C5FD]/30',
};
</script>

<template>
  <span 
    class="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold"
    :class="variantStyles[variant]"
  >
    <slot />
  </span>
</template>
