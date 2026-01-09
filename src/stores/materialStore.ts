import { defineStore } from 'pinia';
import { ref, watch } from 'vue'; // Importações do Vue 3

export interface Material {
  foto: string;
  nome: string;
  categoria: string;
  codigo: string;
  quantidade: number;
  minimo: number;
  local: string;
  descricao?: string;
  fornecedor?: string;
  valor?: number;
}

export const useMaterialStore = defineStore('material', () => {
  // 1. Definição da lista padrão (Fallback)
  const defaultMaterials: Material[] = [
    {
      foto: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=100&h=100&fit=crop',
      nome: 'Notebook Dell Latitude 5420',
      categoria: 'Notebooks',
      codigo: 'NB-001',
      quantidade: 15,
      minimo: 5,
      local: 'Almoxarifado 1',
      descricao: 'Intel Core i5, 8GB RAM, 256GB SSD',
      fornecedor: 'Dell Brasil',
      valor: 4500.00
    },
    // ... (pode manter os outros itens padrão aqui se quiser)
  ];

  // 2. Lógica de Persistência (Vue 3 / LocalStorage)
  // Tenta buscar do localStorage ao iniciar
  const savedMaterials = localStorage.getItem('estoque_ti_materials');
  
  // Se tiver salvo, usa o salvo. Se não, usa o padrão.
  const materials = ref<Material[]>(savedMaterials ? JSON.parse(savedMaterials) : defaultMaterials);

  // 3. Watch (Vue 3) para salvar automaticamente sempre que mudar
  watch(materials, (newMaterials) => {
    localStorage.setItem('estoque_ti_materials', JSON.stringify(newMaterials));
  }, { deep: true }); // 'deep: true' é essencial para detectar mudanças dentro dos objetos do array

  // Ações
  const addMaterial = (material: Material) => {
    materials.value.push(material);
  };

  const updateMaterial = (codigo: string, updatedMaterial: Partial<Material>) => {
    const index = materials.value.findIndex(m => m.codigo === codigo);
    if (index !== -1) {
      materials.value[index] = { ...materials.value[index], ...updatedMaterial };
    }
  };

  const deleteMaterial = (codigo: string) => {
    materials.value = materials.value.filter(m => m.codigo !== codigo);
  };

  return {
    materials,
    addMaterial,
    updateMaterial,
    deleteMaterial
  };
});