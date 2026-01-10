<script setup lang="ts">
import { computed } from 'vue';
import { 
  LayoutDashboard, 
  Package, 
  AlertTriangle, 
  ArrowRightLeft, 
  TrendingUp,
  TrendingDown 
} from 'lucide-vue-next';
import Card from '../components/Card.vue';
import { useMaterialStore } from '../stores/materialStore';
import { useMovimentacaoStore } from '../stores/movimentacaoStore';

const materialStore = useMaterialStore();
const movimentacaoStore = useMovimentacaoStore();

// --- CORREÇÃO DE DATA ---
const formatarData = (dataString: string) => {
  if (!dataString) return '-';
  const [ano, mes, dia] = dataString.split('-');
  return `${dia}/${mes}/${ano}`;
};

// Total de Materiais Cadastrados
const totalMateriais = computed(() => (materialStore.materials || []).length);

// Valor Total em Estoque
const valorTotalEstoque = computed(() => {
  const lista = materialStore.materials || [];
  return lista.reduce((acc, m) => acc + ((m.quantidade || 0) * (m.valor || 0)), 0);
});

// Itens com Estoque Baixo
const itensBaixoEstoque = computed(() => {
  const lista = materialStore.materials || [];
  return lista.filter(m => m.quantidade < m.minimo);
});

// Últimas Movimentações (Pega as 5 últimas)
const ultimasMovimentacoes = computed(() => {
  const lista = movimentacaoStore.movimentacoes || [];
  return [...lista]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5);
});

const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
};

// Dados para gráfico de pizza - Top 5 materiais por valor
const dadosGraficoPizza = computed(() => {
  const lista = materialStore.materials || [];
  return lista
    .map(m => ({
      nome: m.nome,
      valor: (m.quantidade || 0) * (m.valor || 0)
    }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 5);
});

// Dados para gráfico de barras - Movimentações
const dadosMovimentacoes = computed(() => {
  const lista = movimentacaoStore.movimentacoes || [];
  const entradas = lista.filter(m => m.tipo === 'entrada').length;
  const saidas = lista.filter(m => m.tipo === 'saida').length;
  return { entradas, saidas };
});

// Função para gerar o path do gráfico de pizza
const getSlicePath = (index: number, data: any[]) => {
  const total = data.reduce((acc, item) => acc + item.valor, 0);
  if (total === 0) return '';
  
  let startAngle = 0;
  for (let i = 0; i < index; i++) {
    startAngle += (data[i].valor / total) * 360;
  }
  
  const angle = (data[index].valor / total) * 360;
  const endAngle = startAngle + angle;
  
  const radius = 80;
  const startRad = (startAngle - 90) * Math.PI / 180;
  const endRad = (endAngle - 90) * Math.PI / 180;
  
  const x1 = radius * Math.cos(startRad);
  const y1 = radius * Math.sin(startRad);
  const x2 = radius * Math.cos(endRad);
  const y2 = radius * Math.sin(endRad);
  
  const largeArc = angle > 180 ? 1 : 0;
  
  return `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header Profissional -->
    <div class="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6 shadow-lg border-l-4 border-blue-500">
      <h1 class="text-3xl font-bold text-white">Dashboard</h1>
      <p class="text-slate-300 mt-1">Visão geral do estoque e movimentações</p>
    </div>

    <!-- Cards de Métricas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card class="bg-slate-800 border-slate-700 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total de Materiais</p>
            <h3 class="text-3xl font-bold text-white mt-2">{{ totalMateriais }}</h3>
          </div>
          <div class="p-3 bg-blue-600 rounded-lg">
            <Package class="text-white" :size="28" />
          </div>
        </div>
      </Card>

      <Card class="bg-slate-800 border-slate-700 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Valor em Estoque</p>
            <h3 class="text-2xl font-bold text-white mt-2">{{ formatarMoeda(valorTotalEstoque) }}</h3>
          </div>
          <div class="p-3 bg-emerald-600 rounded-lg">
            <TrendingUp class="text-white" :size="28" />
          </div>
        </div>
      </Card>

      <Card class="bg-slate-800 border-slate-700 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Estoque Crítico</p>
            <h3 class="text-3xl font-bold text-orange-400 mt-2">{{ itensBaixoEstoque.length }}</h3>
          </div>
          <div class="p-3 bg-orange-600 rounded-lg">
            <AlertTriangle class="text-white" :size="28" />
          </div>
        </div>
      </Card>

      <Card class="bg-slate-800 border-slate-700 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Movimentações</p>
            <h3 class="text-3xl font-bold text-white mt-2">
              {{ (movimentacaoStore.movimentacoes || []).length }}
            </h3>
          </div>
          <div class="p-3 bg-indigo-600 rounded-lg">
            <ArrowRightLeft class="text-white" :size="28" />
          </div>
        </div>
      </Card>
    </div>

    <!-- Gráficos e Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Gráfico de Pizza - Top 5 Materiais por Valor -->
      <Card class="bg-slate-800 border-slate-700">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <div class="w-1 h-6 bg-blue-500 rounded"></div>
          Top 5 Materiais por Valor
        </h3>
        <div class="relative" style="height: 300px;">
          <svg viewBox="0 0 200 200" class="w-full h-full">
            <template v-if="dadosGraficoPizza.length > 0">
              <g v-for="(item, index) in dadosGraficoPizza" :key="index">
                <path
                  :d="getSlicePath(index, dadosGraficoPizza)"
                  :fill="['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'][index]"
                  class="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  :transform="`translate(100, 100)`"
                />
              </g>
              <circle cx="100" cy="100" r="50" fill="#1e293b" />
            </template>
            <text v-else x="100" y="100" text-anchor="middle" fill="#94a3b8" font-size="12">
              Sem dados
            </text>
          </svg>
        </div>
        <div class="mt-4 space-y-2">
          <div v-for="(item, index) in dadosGraficoPizza" :key="index" 
               class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" 
                   :style="{backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'][index]}">
              </div>
              <span class="text-slate-300">{{ item.nome }}</span>
            </div>
            <span class="text-white font-semibold">{{ formatarMoeda(item.valor) }}</span>
          </div>
        </div>
      </Card>

      <!-- Gráfico de Barras - Entrada vs Saída -->
      <Card class="bg-slate-800 border-slate-700">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <div class="w-1 h-6 bg-emerald-500 rounded"></div>
          Movimentações: Entrada vs Saída
        </h3>
        <div class="space-y-6 pt-4">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-slate-300 font-medium">Entradas</span>
              <span class="text-emerald-400 font-bold text-xl">{{ dadosMovimentacoes.entradas }}</span>
            </div>
            <div class="w-full bg-slate-700 rounded-full h-8 overflow-hidden">
              <div 
                class="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
                :style="{width: dadosMovimentacoes.entradas > 0 ? `${(dadosMovimentacoes.entradas / ((dadosMovimentacoes.entradas + dadosMovimentacoes.saidas) || 1)) * 100}%` : '0%'}"
              >
                <TrendingUp :size="18" class="text-white" v-if="dadosMovimentacoes.entradas > 0" />
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-slate-300 font-medium">Saídas</span>
              <span class="text-orange-400 font-bold text-xl">{{ dadosMovimentacoes.saidas }}</span>
            </div>
            <div class="w-full bg-slate-700 rounded-full h-8 overflow-hidden">
              <div 
                class="bg-gradient-to-r from-orange-600 to-orange-500 h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
                :style="{width: dadosMovimentacoes.saidas > 0 ? `${(dadosMovimentacoes.saidas / ((dadosMovimentacoes.entradas + dadosMovimentacoes.saidas) || 1)) * 100}%` : '0%'}"
              >
                <TrendingDown :size="18" class="text-white" v-if="dadosMovimentacoes.saidas > 0" />
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-700">
            <div class="flex items-center justify-between">
              <span class="text-slate-400">Total de Movimentações</span>
              <span class="text-white font-bold text-2xl">
                {{ dadosMovimentacoes.entradas + dadosMovimentacoes.saidas }}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Alertas e Últimas Movimentações -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Alertas de Reposição -->
      <Card class="bg-slate-800 border-slate-700">
        <div class="flex items-center gap-2 mb-4">
          <div class="p-2 bg-orange-600 rounded-lg">
            <AlertTriangle class="text-white" :size="20" />
          </div>
          <h3 class="font-bold text-white text-lg">Alertas de Reposição</h3>
        </div>
        <div v-if="itensBaixoEstoque.length === 0" class="text-center py-12 text-slate-500">
           <p class="font-medium">✓ Sistema operando normalmente</p>
           <p class="text-sm mt-1">Nenhum item crítico detectado</p>
        </div>
        <div v-else class="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
          <div v-for="item in itensBaixoEstoque.slice(0, 5)" :key="item.codigo" 
               class="flex items-center justify-between p-4 bg-slate-700 rounded-lg border-l-4 border-orange-500 hover:bg-slate-600 transition-colors">
            <div>
              <p class="font-semibold text-white">{{ item.nome }}</p>
              <p class="text-xs text-slate-400 mt-1">Código: {{ item.codigo }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-2xl text-orange-400">{{ item.quantidade }}</p>
              <p class="text-xs text-slate-400">Mín: {{ item.minimo }}</p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Últimas Movimentações -->
      <Card class="bg-slate-800 border-slate-700">
        <div class="flex items-center gap-2 mb-4">
          <div class="p-2 bg-indigo-600 rounded-lg">
            <LayoutDashboard class="text-white" :size="20" />
          </div>
          <h3 class="font-bold text-white text-lg">Últimas Movimentações</h3>
        </div>

        <div v-if="ultimasMovimentacoes.length === 0" class="text-center py-12 text-slate-500">
          <p class="font-medium">Nenhum registro encontrado</p>
        </div>

        <div v-else class="space-y-3">
          <div v-for="mov in ultimasMovimentacoes" :key="mov.id" 
               class="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors border-l-2"
               :class="mov.tipo === 'entrada' ? 'border-emerald-500' : 'border-orange-500'">
            <div class="flex items-center gap-3">
              <div :class="mov.tipo === 'entrada' ? 'bg-emerald-600' : 'bg-orange-600'"
                   class="p-2 rounded-lg">
                <component :is="mov.tipo === 'entrada' ? TrendingUp : TrendingDown" :size="18" class="text-white" />
              </div>
              <div>
                <p class="font-semibold text-white">{{ mov.materialNome }}</p>
                <p class="text-xs text-slate-400">{{ formatarData(mov.data) }}</p>
              </div>
            </div>
            <span :class="mov.tipo === 'entrada' ? 'text-emerald-400 bg-emerald-900/30' : 'text-orange-400 bg-orange-900/30'" 
                  class="font-bold text-lg px-3 py-1 rounded">
              {{ mov.tipo === 'entrada' ? '+' : '-' }}{{ mov.quantidade }}
            </span>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #334155;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #64748b;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>