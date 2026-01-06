import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Material {
  id: number;
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

interface MaterialContextType {
  materials: Material[];
  addMaterial: (material: Omit<Material, 'id'>) => void;
  updateMaterial: (id: number, material: Partial<Material>) => void;
  deleteMaterial: (id: number) => void;
  getMaterialById: (id: number) => Material | undefined;
}

const MaterialContext = createContext<MaterialContextType | undefined>(undefined);

export function MaterialProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useState<Material[]>([
    { 
      id: 1, 
      foto: 'https://via.placeholder.com/40',
      nome: 'Notebook Dell Latitude 5420', 
      categoria: 'Notebooks', 
      codigo: 'PAT-2024-001',
      quantidade: 45,
      minimo: 20,
      local: 'Almoxarifado 1',
      descricao: 'Notebook corporativo para uso geral',
      fornecedor: 'Dell Computadores',
      valor: 4500
    },
    { 
      id: 2, 
      foto: 'https://via.placeholder.com/40',
      nome: 'Monitor LG 27" 4K', 
      categoria: 'Monitores', 
      codigo: 'PAT-2024-002',
      quantidade: 12,
      minimo: 15,
      local: 'TI - Prédio A',
      descricao: 'Monitor 4K para designers',
      fornecedor: 'LG Electronics',
      valor: 2200
    },
    { 
      id: 3, 
      foto: 'https://via.placeholder.com/40',
      nome: 'Mouse Logitech MX Master 3', 
      categoria: 'Periféricos', 
      codigo: 'PAT-2024-003',
      quantidade: 88,
      minimo: 30,
      local: 'Almoxarifado 2',
      descricao: 'Mouse ergonômico wireless',
      fornecedor: 'Logitech',
      valor: 450
    },
    { 
      id: 4, 
      foto: 'https://via.placeholder.com/40',
      nome: 'Teclado Mecânico Keychron K2', 
      categoria: 'Periféricos', 
      codigo: 'PAT-2024-004',
      quantidade: 5,
      minimo: 25,
      local: 'Almoxarifado 1',
      descricao: 'Teclado mecânico wireless',
      fornecedor: 'Keychron',
      valor: 600
    },
    { 
      id: 5, 
      foto: 'https://via.placeholder.com/40',
      nome: 'SSD Samsung 1TB', 
      categoria: 'Componentes', 
      codigo: 'PAT-2024-005',
      quantidade: 62,
      minimo: 40,
      local: 'Depósito Central',
      descricao: 'SSD NVMe M.2 1TB',
      fornecedor: 'Samsung',
      valor: 850
    },
    { 
      id: 6, 
      foto: 'https://via.placeholder.com/40',
      nome: 'Cabo HDMI 2.1 - 2m', 
      categoria: 'Cabos', 
      codigo: 'PAT-2024-006',
      quantidade: 150,
      minimo: 50,
      local: 'Almoxarifado 2',
      descricao: 'Cabo HDMI 2.1 certificado',
      fornecedor: 'Belkin',
      valor: 80
    },
    { 
      id: 7, 
      foto: 'https://via.placeholder.com/40',
      nome: 'Webcam Logitech C920', 
      categoria: 'Periféricos', 
      codigo: 'PAT-2024-007',
      quantidade: 28,
      minimo: 20,
      local: 'TI - Prédio B',
      descricao: 'Webcam Full HD 1080p',
      fornecedor: 'Logitech',
      valor: 550
    },
    { 
      id: 8, 
      foto: 'https://via.placeholder.com/40',
      nome: 'Memória RAM 16GB DDR4', 
      categoria: 'Componentes', 
      codigo: 'PAT-2024-008',
      quantidade: 95,
      minimo: 60,
      local: 'Depósito Central',
      descricao: 'Memória DDR4 3200MHz',
      fornecedor: 'Kingston',
      valor: 350
    },
  ]);

  const addMaterial = (material: Omit<Material, 'id'>) => {
    const newId = Math.max(...materials.map(m => m.id), 0) + 1;
    setMaterials([...materials, { ...material, id: newId }]);
  };

  const updateMaterial = (id: number, updatedData: Partial<Material>) => {
    setMaterials(materials.map(material => 
      material.id === id ? { ...material, ...updatedData } : material
    ));
  };

  const deleteMaterial = (id: number) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  const getMaterialById = (id: number) => {
    return materials.find(material => material.id === id);
  };

  return (
    <MaterialContext.Provider value={{
      materials,
      addMaterial,
      updateMaterial,
      deleteMaterial,
      getMaterialById
    }}>
      {children}
    </MaterialContext.Provider>
  );
}

export function useMaterials() {
  const context = useContext(MaterialContext);
  if (context === undefined) {
    throw new Error('useMaterials must be used within a MaterialProvider');
  }
  return context;
}
