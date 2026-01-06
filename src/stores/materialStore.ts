import { defineStore } from 'pinia';
import { ref } from 'vue';

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
  const materials = ref<Material[]>([
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
    {
      foto: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop',
      nome: 'Monitor LG 27" 4K',
      categoria: 'Monitores',
      codigo: 'MON-001',
      quantidade: 8,
      minimo: 3,
      local: 'TI - Prédio A',
      descricao: 'Monitor UltraHD 27 polegadas',
      fornecedor: 'LG Electronics',
      valor: 2100.00
    },
    {
      foto: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=100&h=100&fit=crop',
      nome: 'Mouse Logitech MX Master 3',
      categoria: 'Periféricos',
      codigo: 'PER-001',
      quantidade: 25,
      minimo: 10,
      local: 'Almoxarifado 2',
      descricao: 'Mouse ergonômico sem fio',
      fornecedor: 'Logitech',
      valor: 450.00
    },
    {
      foto: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop',
      nome: 'Teclado Mecânico Keychron K8',
      categoria: 'Periféricos',
      codigo: 'PER-002',
      quantidade: 2,
      minimo: 5,
      local: 'TI - Prédio B',
      descricao: 'Teclado mecânico sem fio RGB',
      fornecedor: 'Keychron',
      valor: 650.00
    },
    {
      foto: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=100&h=100&fit=crop',
      nome: 'Cabo HDMI 2.1 - 2m',
      categoria: 'Cabos e Acessórios',
      codigo: 'CAB-001',
      quantidade: 50,
      minimo: 20,
      local: 'Depósito Central',
      descricao: 'Cabo HDMI 2.1 de alta velocidade',
      fornecedor: 'Elg',
      valor: 45.00
    },
    {
      foto: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=100&h=100&fit=crop',
      nome: 'SSD Samsung 1TB NVMe',
      categoria: 'Componentes',
      codigo: 'COMP-001',
      quantidade: 12,
      minimo: 8,
      local: 'Almoxarifado 1',
      descricao: 'SSD NVMe M.2 PCIe 4.0',
      fornecedor: 'Samsung',
      valor: 580.00
    }
  ]);

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
