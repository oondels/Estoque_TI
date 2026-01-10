// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Usuario {
  id: string;
  nome: string;
  codigoCracha: string;
  cargo: string;
}

export const useAuthStore = defineStore('auth', () => {
  const usuarios = ref<Usuario[]>([
    { id: '1', nome: 'Hellen Verena', codigoCracha: '18783', cargo: 'Admin' },
    { id: '2', nome: 'Operador Estoque', codigoCracha: '999888', cargo: 'Operador' },
    { id: '3', nome: 'Suporte TI', codigoCracha: 'TI2024', cargo: 'Técnico' },
    // ADICIONE SEU USUÁRIO AQUI:
    { id: '4', nome: 'Meu Usuário', codigoCracha: '18784', cargo: 'Admin' },
  ]);

  const validarCracha = (codigo: string): Usuario | null => {
    if (!codigo) return null;
    
    // O .trim() remove espaços e 'enters' que o leitor envia junto
    const codigoLimpo = codigo.trim(); 
    
    console.log('Tentando validar:', codigoLimpo); // Ajuda a debugar (olhe no F12)

    const usuario = usuarios.value.find(u => u.codigoCracha === codigoLimpo);
    return usuario || null;
  };

  return {
    usuarios,
    validarCracha
  };
});