<script setup lang="ts">
import { computed } from 'vue';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  List,
  FileText,
  Activity
} from 'lucide-vue-next';
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import { useMaterialStore } from '../stores/materialStore';
import { useMovimentacaoStore } from '../stores/movimentacaoStore';

const emit = defineEmits<{
  navigate: [page: string]
}>();

const materialStore = useMaterialStore();
const movimentacaoStore = useMovimentacaoStore();

// Calcular estatísticas REAIS
const totalItens = computed(() => 
  materialStore.materials.reduce((sum, m) => sum + m.quantidade, 0)
);

const abaixoDoMinimo = computed(() => 
  materialStore.materials.filter(m => m.quantidade < m.minimo).length
);

const valorTotal = computed(() => 
  materialStore.materials.reduce((sum, m) => sum + (m.quantidade * (m.valor || 0)), 0)
);

// Movimentações do mês (últimos 30 dias)
const movimentacoesMes = computed(() => {
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
  const dataLimite = trintaDiasAtras.toISOString().split('T')[0];
  
  return movimentacaoStore.movimentacoes.filter(m => m.data >= dataLimite);
});

const totalMovimentacoesMes = computed(() => movimentacoesMes.value.length);

const stats = computed(() => [
  { 
    label: 'Total de Itens', 
    value: totalItens.value.toString(), 
    change: '+12%', 
    trend: 'up',
    icon: Package,
    color: 'text-[#2563EB]',
    bgColor: '#EFF6FF'
  },
  { 
    label: 'Abaixo do Mínimo', 
    value: abaixoDoMinimo.value.toString(), 
    change: abaixoDoMinimo.value > 0 ? '+5%' : '-100%', 
    trend: abaixoDoMinimo.value > 0 ? 'up' : 'down',
    icon: AlertTriangle,
    color: 'text-[#F59E0B]',
    bgColor: '#FFFBEB'
  },
  { 
    label: 'Movimentações (mês)', 
    value: totalMovimentacoesMes.value.toString(), 
    change: '+18%', 
    trend: 'up',
    icon: TrendingUp,
    color: 'text-[#10B981]',
    bgColor: '#ECFDF5'
  },
  { 
    label: 'Valor Total', 
    value: `R$ ${valorTotal.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 
    change: '+7%', 
    trend: 'up',
    icon: Activity,
    color: 'text-[#8B5CF6]',
    bgColor: '#F5F3FF'
  },
]);

// Movimentações recentes REAIS
const recentMovements = computed(() => 
  movimentacaoStore.movimentacoesRecentes.map(m => ({
    id: m.id,
    item: m.materialNome,
    type: m.tipo === 'entrada' ? 'Entrada' : 'Saída',
    qty: m.quantidade,
    user: m.responsavel,
    date: new Date(m.data).toLocaleDateString('pt-BR')
  }))
);

const shortcuts = [
  { label: 'Cadastrar Material', icon: Plus, page: 'cadastro', variant: 'primary' as const },
  { label: 'Consultar Itens', icon: List, page: 'listagem', variant: 'secondary' as const },
  { label: 'Relatórios', icon: FileText, page: 'relatorios', variant: 'secondary' as const },
];

// Movimentações por categoria REAIS
const categoriesData = computed(() => {
  const data = movimentacaoStore.movimentacoesPorCategoria;
  const maxValue = Math.max(...data.map(d => d.quantidade), 100);
  
  const colors = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];
  
  return data.slice(0, 5).map((item, index) => ({
    category: item.categoria,
    value: Math.round((item.quantidade / maxValue) * 100),
    color: colors[index % colors.length]
  }));
});
</script>

<template>
  <div class="flex flex-col gap-12">
    <!-- Header -->
    <div 
      class="space-y-3"
      v-motion
      :initial="{ opacity: 0, y: -10 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
    >
      <h1 class="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent">
        Dashboard
      </h1>
      <p class="text-lg text-[#6B7280]">Visão geral do estoque de materiais de TI</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        v-motion
        :initial="{ opacity: 0, y: 20, scale: 0.95 }"
        :enter="{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 400, delay: index * 100 }
        }"
        :hover="{ y: -4, transition: { duration: 200 } }"
      >
        <Card class="h-full">
          <div class="flex items-start justify-between gap-6">
            <div class="flex-1 space-y-4">
              <p class="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">{{ stat.label }}</p>
              <p class="text-3xl font-bold text-[#111827]">{{ stat.value }}</p>
              <div class="flex items-center gap-2">
                <component 
                  :is="stat.trend === 'up' ? ArrowUpRight : ArrowDownRight"
                  :size="16"
                  :class="stat.trend === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]'"
                />
                <span 
                  class="text-sm font-semibold"
                  :class="stat.trend === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]'"
                >
                  {{ stat.change }}
                </span>
                <span class="text-sm text-[#9CA3AF]">vs mês anterior</span>
              </div>
            </div>
            <div 
              class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              :style="{ backgroundColor: stat.bgColor, opacity: 0.8 }"
            >
              <component :is="stat.icon" :size="28" :class="stat.color" />
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- Atalhos rápidos -->
    <div 
      class="flex flex-wrap gap-4"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 500 } }"
    >
      <div
        v-for="(shortcut, index) in shortcuts"
        :key="index"
        v-motion
        :hover="{ scale: 1.05 }"
        :tap="{ scale: 0.95 }"
      >
        <Button
          :variant="shortcut.variant"
          size="lg"
          @click="emit('navigate', shortcut.page)"
        >
          <component :is="shortcut.icon" :size="20" />
          {{ shortcut.label }}
        </Button>
      </div>
    </div>

    <!-- Grid de 2 colunas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Movimentações Recentes -->
      <div
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 600 } }"
      >
        <Card class="h-full">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-[#111827]">Movimentações Recentes</h3>
            <Button 
              variant="ghost" 
              size="sm"
              @click="emit('navigate', 'movimentacao')"
            >
              Ver todas
            </Button>
          </div>
          
          <div v-if="recentMovements.length > 0" class="flex flex-col gap-5">
            <div
              v-for="(movement, idx) in recentMovements"
              :key="movement.id"
              class="flex items-start gap-5 pb-5 border-b border-[#F1F3F5] last:border-0 last:pb-0"
              v-motion
              :initial="{ opacity: 0, x: -10 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: 700 + idx * 100 } }"
              :hover="{ x: 4, transition: { duration: 200 } }"
            >
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                :class="movement.type === 'Entrada' ? 'text-[#10B981]' : 'text-[#EF4444]'"
                :style="{ 
                  backgroundColor: movement.type === 'Entrada' ? '#ECFDF5' : '#FEF2F2',
                  opacity: 0.8
                }"
              >
                <component 
                  :is="movement.type === 'Entrada' ? ArrowUpRight : ArrowDownRight" 
                  :size="24" 
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[15px] font-semibold text-[#111827] mb-1.5 truncate">{{ movement.item }}</p>
                <p class="text-sm text-[#6B7280]">{{ movement.user }} • {{ movement.date }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <p 
                  class="text-lg font-bold"
                  :class="movement.type === 'Entrada' ? 'text-[#10B981]' : 'text-[#EF4444]'"
                >
                  {{ movement.type === 'Entrada' ? '+' : '-' }}{{ movement.qty }}
                </p>
                <p class="text-xs text-[#9CA3AF] uppercase tracking-wider font-medium">{{ movement.type }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-[#9CA3AF]">
            Nenhuma movimentação recente
          </div>
        </Card>
      </div>

      <!-- Gráfico -->
      <div
        v-motion
        :initial="{ opacity: 0, x: 20 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 600 } }"
      >
        <Card class="h-full">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-[#111827]">Movimentações por Categoria</h3>
            <select class="text-sm border border-[#E5E7EB] rounded-xl px-4 py-2.5 bg-white hover:border-[#2563EB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]">
              <option>Último mês</option>
              <option>Últimos 3 meses</option>
              <option>Último ano</option>
            </select>
          </div>
          
          <div v-if="categoriesData.length > 0" class="flex flex-col gap-6">
            <div
              v-for="(item, index) in categoriesData"
              :key="index"
              class="space-y-3"
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: 800 + index * 100 } }"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-[#374151]">{{ item.category }}</span>
                <span class="text-sm font-bold text-[#111827]">{{ item.value }}%</span>
              </div>
              <div class="h-2 bg-[#F1F3F5] rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-1000 ease-out"
                  :style="{ 
                    backgroundColor: item.color,
                    width: `${item.value}%`
                  }"
                />
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-[#9CA3AF]">
            Nenhum dado de movimentação
          </div>
        </Card>
      </div>
    </div>

    <!-- Alertas -->
    <div
      v-if="abaixoDoMinimo > 0"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 1200 } }"
    >
      <Card variant="warning">
        <div class="flex items-start gap-5">
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style="background-color: #F59E0B; opacity: 0.1"
          >
            <AlertTriangle :size="24" class="text-[#F59E0B]" style="opacity: 1" />
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-[#92400E] mb-2">
              Atenção: {{ abaixoDoMinimo }} itens abaixo do estoque mínimo
            </h4>
            <p class="text-[15px] text-[#92400E] mb-5 leading-relaxed opacity-90">
              Alguns materiais precisam de reposição urgente para evitar ruptura de estoque.
            </p>
            <div v-motion :hover="{ scale: 1.05 }" :tap="{ scale: 0.95 }">
              <Button 
                variant="secondary" 
                size="md"
                @click="emit('navigate', 'alertas')"
              >
                Ver itens críticos
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
