<script setup lang="ts">
import { computed } from 'vue';
import { AlertTriangle } from 'lucide-vue-next';
import Card from '../components/Card.vue';
import Badge from '../components/Badge.vue';
import Button from '../components/Button.vue';
import { useMaterialStore } from '../stores/materialStore';

const emit = defineEmits<{
  navigate: [page: string]
}>();

const materialStore = useMaterialStore();

const materiaisAbaixoDoMinimo = computed(() =>
  materialStore.materials.filter(m => m.quantidade < m.minimo)
);

const materiaisSemEstoque = computed(() =>
  materialStore.materials.filter(m => m.quantidade === 0)
);
</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="space-y-3">
      <h1 class="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent">
        Alertas de Estoque
      </h1>
      <p class="text-[#6B7280]">Materiais que requerem atenção imediata</p>
    </div>

    <!-- Materiais sem estoque -->
    <Card variant="error" v-if="materiaisSemEstoque.length > 0">
      <div class="flex items-start gap-4 mb-6">
        <div class="w-12 h-12 bg-[#EF4444] bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertTriangle :size="24" class="text-[#EF4444]" />
        </div>
        <div>
          <h3 class="font-semibold text-[#991B1B] mb-1">Sem Estoque ({{ materiaisSemEstoque.length }})</h3>
          <p class="text-sm text-[#991B1B] opacity-90">Materiais completamente esgotados</p>
        </div>
      </div>

      <div class="space-y-3">
        <div
          v-for="material in materiaisSemEstoque"
          :key="material.codigo"
          class="flex items-center justify-between p-4 bg-white rounded-xl"
        >
          <div class="flex items-center gap-3">
            <img :src="material.foto" :alt="material.nome" class="w-12 h-12 rounded-lg object-cover" />
            <div>
              <p class="font-medium text-[#111827]">{{ material.nome }}</p>
              <p class="text-sm text-[#6B7280]">{{ material.categoria }}</p>
            </div>
          </div>
          <Badge variant="error">SEM ESTOQUE</Badge>
        </div>
      </div>
    </Card>

    <!-- Materiais abaixo do mínimo -->
    <Card variant="warning" v-if="materiaisAbaixoDoMinimo.length > 0">
      <div class="flex items-start gap-4 mb-6">
        <div class="w-12 h-12 bg-[#F59E0B] bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertTriangle :size="24" class="text-[#F59E0B]" />
        </div>
        <div>
          <h3 class="font-semibold text-[#92400E] mb-1">Abaixo do Mínimo ({{ materiaisAbaixoDoMinimo.length }})</h3>
          <p class="text-sm text-[#92400E] opacity-90">Materiais que necessitam reposição</p>
        </div>
      </div>

      <div class="space-y-3">
        <div
          v-for="material in materiaisAbaixoDoMinimo"
          :key="material.codigo"
          class="flex items-center justify-between p-4 bg-white rounded-xl"
        >
          <div class="flex items-center gap-3">
            <img :src="material.foto" :alt="material.nome" class="w-12 h-12 rounded-lg object-cover" />
            <div>
              <p class="font-medium text-[#111827]">{{ material.nome }}</p>
              <p class="text-sm text-[#6B7280]">
                Estoque: {{ material.quantidade }} / Mínimo: {{ material.minimo }}
              </p>
            </div>
          </div>
          <Badge variant="warning">BAIXO ESTOQUE</Badge>
        </div>
      </div>
    </Card>

    <Card v-if="materiaisAbaixoDoMinimo.length === 0 && materiaisSemEstoque.length === 0" variant="success">
      <div class="text-center py-8">
        <div class="w-16 h-16 bg-[#10B981] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertTriangle :size="32" class="text-[#10B981]" />
        </div>
        <h3 class="font-semibold text-[#166534] mb-2">Tudo em ordem!</h3>
        <p class="text-[#166534] opacity-90">Não há alertas de estoque no momento.</p>
      </div>
    </Card>
  </div>
</template>
