<script setup lang="ts">
import { ref } from 'vue';
import { LogIn } from 'lucide-vue-next';
import Card from '../components/Card.vue';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';

const emit = defineEmits<{
  login: []
}>();

const email = ref('admin@estoque.com');
const password = ref('123456');

const handleLogin = () => {
  emit('login');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#EFF6FF] via-[#FFFFFF] to-[#F8F9FA] flex items-center justify-center p-6">
    <div 
      class="w-full max-w-md"
      v-motion
      :initial="{ opacity: 0, scale: 0.9 }"
      :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }"
    >
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center">
          <div class="w-10 h-10 bg-white/20 rounded-xl"></div>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent mb-2">
          Estoque TI
        </h1>
        <p class="text-[#6B7280]">Sistema de gerenciamento de materiais</p>
      </div>

      <Card>
        <form @submit.prevent="handleLogin" class="space-y-6">
          <Input
            v-model="email"
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            required
          />

          <Input
            v-model="password"
            type="password"
            label="Senha"
            placeholder="••••••••"
            required
          />

          <Button type="submit" full-width size="lg">
            <LogIn :size="20" />
            Entrar no Sistema
          </Button>
        </form>
      </Card>
    </div>
  </div>
</template>
