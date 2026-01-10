<script setup lang="ts">
import { computed } from 'vue';
import { ChevronDown, AlertCircle } from 'lucide-vue-next';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  modelValue?: string;
  label?: string;
  error?: string;
  helper?: string;
  options: SelectOption[];
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<SelectProps>(), {
  disabled: false,
  required: false,
  options: () => [],
  placeholder: 'Selecione uma opção...'
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const hasError = computed(() => !!props.error);
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative group">
      <select
        :value="modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :disabled="disabled"
        :required="required"
        class="w-full h-[46px] rounded-xl border appearance-none transition-all duration-200 text-sm bg-white shadow-sm pl-4 pr-11 outline-none cursor-pointer
               disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200"
        :class="[
          hasError 
            ? 'border-red-300 text-red-900 focus:ring-4 focus:ring-red-100 focus:border-red-500' 
            : 'border-gray-200 text-gray-700 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
        ]"
      >
        <option value="" disabled selected class="text-gray-400">
          {{ placeholder }}
        </option>
        
        <option 
          v-for="option in props.options" 
          :key="option.value" 
          :value="option.value"
          class="text-gray-900 py-2"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none transition-transform duration-200 group-focus-within:rotate-180">
        <ChevronDown 
          :size="18" 
          :class="hasError ? 'text-red-400' : 'text-gray-400 group-hover:text-blue-500'" 
          stroke-width="2.5"
        />
      </div>
    </div>
    
    <div class="min-h-[20px] ml-1">
      <div v-if="error" class="flex items-center gap-1.5 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
        <AlertCircle :size="12" />
        <span>{{ error }}</span>
      </div>
      <span v-else-if="helper" class="text-xs text-gray-500">{{ helper }}</span>
    </div>
  </div>
</template>