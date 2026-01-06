import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Movimentacao {
  id: string;
  tipo: 'entrada' | 'saida';
  materialCodigo: string;
  materialNome: string;
  quantidade: number;
  responsavel: string;
  observacoes: string;
  data: string;
  valor?: number;
  categoria?: string;
}

export const useMovimentacaoStore = defineStore('movimentacao', () => {
  const movimentacoes = ref<Movimentacao[]>([
    {
      id: '1',
      tipo: 'entrada',
      materialCodigo: 'NB-001',
      materialNome: 'Notebook Dell Latitude 5420',
      quantidade: 10,
      responsavel: 'João Silva',
      observacoes: 'Compra mensal',
      data: '2025-12-10',
      valor: 45000.00,
      categoria: 'Notebooks'
    },
    {
      id: '2',
      tipo: 'saida',
      materialCodigo: 'NB-001',
      materialNome: 'Notebook Dell Latitude 5420',
      quantidade: 5,
      responsavel: 'Maria Santos',
      observacoes: 'Alocação para equipe de vendas',
      data: '2025-12-15',
      valor: 22500.00,
      categoria: 'Notebooks'
    },
    {
      id: '3',
      tipo: 'entrada',
      materialCodigo: 'PER-001',
      materialNome: 'Mouse Logitech MX Master 3',
      quantidade: 20,
      responsavel: 'Pedro Costa',
      observacoes: 'Reposição de estoque',
      data: '2025-12-12',
      valor: 9000.00,
      categoria: 'Periféricos'
    },
    {
      id: '4',
      tipo: 'saida',
      materialCodigo: 'MON-001',
      materialNome: 'Monitor LG 27" 4K',
      quantidade: 3,
      responsavel: 'Ana Oliveira',
      observacoes: 'Setup home office',
      data: '2025-12-18',
      valor: 6300.00,
      categoria: 'Monitores'
    },
    {
      id: '5',
      tipo: 'entrada',
      materialCodigo: 'PER-002',
      materialNome: 'Teclado Mecânico Keychron K8',
      quantidade: 15,
      responsavel: 'Carlos Mendes',
      observacoes: 'Nova remessa',
      data: '2025-12-14',
      valor: 9750.00,
      categoria: 'Periféricos'
    },
    {
      id: '6',
      tipo: 'saida',
      materialCodigo: 'CAB-001',
      materialNome: 'Cabo HDMI 2.1 - 2m',
      quantidade: 25,
      responsavel: 'Juliana Souza',
      observacoes: 'Distribuição para salas de reunião',
      data: '2025-12-11',
      valor: 1125.00,
      categoria: 'Cabos e Acessórios'
    },
    {
      id: '7',
      tipo: 'entrada',
      materialCodigo: 'COMP-001',
      materialNome: 'SSD Samsung 1TB NVMe',
      quantidade: 30,
      responsavel: 'Ricardo Lima',
      observacoes: 'Upgrade de estoque',
      data: '2025-12-13',
      valor: 17400.00,
      categoria: 'Componentes'
    },
    {
      id: '8',
      tipo: 'saida',
      materialCodigo: 'COMP-001',
      materialNome: 'SSD Samsung 1TB NVMe',
      quantidade: 18,
      responsavel: 'Fernanda Alves',
      observacoes: 'Manutenção preventiva',
      data: '2025-12-19',
      valor: 10440.00,
      categoria: 'Componentes'
    },
  ]);

  // Adicionar movimentação
  const addMovimentacao = (movimentacao: Omit<Movimentacao, 'id'>) => {
    const newMovimentacao = {
      ...movimentacao,
      id: Date.now().toString(),
    };
    movimentacoes.value.push(newMovimentacao);
  };

  // Estatísticas
  const totalEntradas = computed(() => 
    movimentacoes.value
      .filter(m => m.tipo === 'entrada')
      .reduce((sum, m) => sum + m.quantidade, 0)
  );

  const totalSaidas = computed(() => 
    movimentacoes.value
      .filter(m => m.tipo === 'saida')
      .reduce((sum, m) => sum + m.quantidade, 0)
  );

  const valorTotalEntradas = computed(() => 
    movimentacoes.value
      .filter(m => m.tipo === 'entrada')
      .reduce((sum, m) => sum + (m.valor || 0), 0)
  );

  const valorTotalSaidas = computed(() => 
    movimentacoes.value
      .filter(m => m.tipo === 'saida')
      .reduce((sum, m) => sum + (m.valor || 0), 0)
  );

  // Filtrar movimentações
  const filterMovimentacoes = (filters: {
    dataInicio?: string;
    dataFim?: string;
    tipo?: string;
    categoria?: string;
  }) => {
    return movimentacoes.value.filter(m => {
      let match = true;

      if (filters.dataInicio && m.data < filters.dataInicio) {
        match = false;
      }

      if (filters.dataFim && m.data > filters.dataFim) {
        match = false;
      }

      if (filters.tipo && filters.tipo !== 'todos' && m.tipo !== filters.tipo) {
        match = false;
      }

      if (filters.categoria && filters.categoria !== 'todas' && m.categoria !== filters.categoria) {
        match = false;
      }

      return match;
    });
  };

  // Movimentações recentes (últimos 7 dias)
  const movimentacoesRecentes = computed(() => {
    const sete_dias_atras = new Date();
    sete_dias_atras.setDate(sete_dias_atras.getDate() - 7);
    const dataLimite = sete_dias_atras.toISOString().split('T')[0];
    
    return movimentacoes.value
      .filter(m => m.data >= dataLimite)
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
      .slice(0, 5);
  });

  // Movimentações por categoria
  const movimentacoesPorCategoria = computed(() => {
    const categorias: { [key: string]: number } = {};
    
    movimentacoes.value.forEach(m => {
      if (m.categoria) {
        categorias[m.categoria] = (categorias[m.categoria] || 0) + m.quantidade;
      }
    });

    return Object.entries(categorias)
      .map(([categoria, quantidade]) => ({ categoria, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  });

  return {
    movimentacoes,
    addMovimentacao,
    totalEntradas,
    totalSaidas,
    valorTotalEntradas,
    valorTotalSaidas,
    filterMovimentacoes,
    movimentacoesRecentes,
    movimentacoesPorCategoria
  };
});
