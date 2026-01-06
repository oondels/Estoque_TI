<script setup lang="ts">
import { computed } from 'vue';

interface TextareaProps {
  modelValue?: string;
  label?: string;
  error?: string;
  helper?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  required: false,
  rows: 4
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const hasError = computed(() => !!props.error);
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <label v-if="label" class="text-[15px] font-medium text-[#374151]">
      {{ label }}
    </label>
    
    <textarea
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      class="w-full min-h-[100px] rounded-xl border transition-all duration-200 text-[15px] text-[#374151] placeholder:text-[#9CA3AF] resize-y px-4 py-3 bg-white shadow-[0_1px_2px_0_rgb(0_0_0_/_0.02)] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20 focus:border-[#2563EB] disabled:bg-[#F8F9FA] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
      :class="hasError ? 'border-[#EF4444] focus:ring-[#EF4444] focus:ring-opacity-20 focus:border-[#EF4444]' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'"
    />
    
    <div class="min-h-[24px]">
      <span v-if="error" class="text-[13px] text-[#EF4444] font-medium">{{ error }}</span>
      <span v-else-if="helper" class="text-[13px] text-[#6B7280]">{{ helper }}</span>
    </div>
  </div>
</template>
