<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { Save, Calendar, CheckCircle2, ScanBarcode, Lock, Scan, X, CheckCircle, ArrowRight } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import Card from '../components/Card.vue';
import Input from '../components/Input.vue';
import Select from '../components/Select.vue';
import Textarea from '../components/Textarea.vue';
import Button from '../components/Button.vue';
import Badge from '../components/Badge.vue';
import { useMaterialStore } from '../stores/materialStore';
import { useMovimentacaoStore } from '../stores/movimentacaoStore';
import { useAuthStore } from '../stores/authStore';

const materialStore = useMaterialStore();
const movimentacaoStore = useMovimentacaoStore();
const authStore = useAuthStore();

// --- Controles ---
const showAuthModal = ref(false);
const showSuccessModal = ref(false); // Novo Modal
const authInput = ref('');
const authInputRef = ref<HTMLInputElement | null>(null);

// Dados do formulário
const buscaIdentificacao = ref('');
const materialEncontradoInfo = ref<string | null>(null);
const formData = ref({
  tipo: 'entrada',
  materialCodigo: '',
  quantidade: '',
  responsavel: '',
  observacoes: '',
  data: new Date().toISOString().split('T')[0],
});

// ... (Manter watchs e computeds de busca iguais) ...
watch(buscaIdentificacao, (novoValor) => {
  materialEncontradoInfo.value = null; 
  if (!novoValor || String(novoValor).trim() === '') return;
  const termoBusca = String(novoValor).trim().toLowerCase();
  const encontrado = materialStore.materials?.find(m => {
    const cod = String(m.codigo).trim().toLowerCase();
    const pat = String(m.patrimonio || '').trim().toLowerCase();
    const ns = String(m.numeroSerie || '').trim().toLowerCase();
    return cod === termoBusca || pat === termoBusca || ns === termoBusca;
  });
  if (encontrado) {
    formData.value.materialCodigo = String(encontrado.codigo);
    materialEncontradoInfo.value = encontrado.nome;
    toast.success(`Item identificado: ${encontrado.nome}`);
  }
});

const materialSelecionado = computed(() => {
  return materialStore.materials?.find(m => String(m.codigo) === String(formData.value.materialCodigo));
});

// --- Fluxo de Auth e Salvar ---
const abrirModalAuth = () => {
  if (!materialSelecionado.value) { toast.error('Selecione um material'); return; }
  if (!formData.value.quantidade) { toast.error('Informe a quantidade'); return; }
  
  showAuthModal.value = true;
  authInput.value = '';
  nextTick(() => authInputRef.value?.focus());
};

const confirmarAuth = () => {
  const usuario = authStore.validarCracha(authInput.value);
  if (usuario) {
    formData.value.responsavel = usuario.nome;
    showAuthModal.value = false;
    processarMovimentacao();
  } else {
    toast.error('Crachá inválido');
    authInput.value = '';
    authInputRef.value?.focus();
  }
};

const processarMovimentacao = () => {
  const quantidade = Math.abs(parseInt(formData.value.quantidade));
  
  movimentacaoStore.addMovimentacao({
    tipo: formData.value.tipo as 'entrada' | 'saida',
    materialCodigo: formData.value.materialCodigo,
    materialNome: materialSelecionado.value!.nome,
    quantidade: quantidade,
    responsavel: formData.value.responsavel,
    observacoes: formData.value.observacoes,
    data: formData.value.data,
    valor: materialSelecionado.value!.valor ? materialSelecionado.value!.valor * quantidade : undefined,
    categoria: materialSelecionado.value!.categoria
  });

  const novaQuantidade = formData.value.tipo === 'entrada' 
    ? materialSelecionado.value!.quantidade + quantidade
    : materialSelecionado.value!.quantidade - quantidade;

  materialStore.updateMaterial(formData.value.materialCodigo, {
    quantidade: novaQuantidade
  });

  // Mostra modal de sucesso em vez de toast
  showSuccessModal.value = true;

  // Limpa formulário
  buscaIdentificacao.value = '';
  materialEncontradoInfo.value = null;
  formData.value = {
    tipo: 'entrada',
    materialCodigo: '',
    quantidade: '',
    responsavel: '',
    observacoes: '',
    data: new Date().toISOString().split('T')[0],
  };
};

// ... (Manter código de histórico/tabela igual) ...
const formatarData = (d: string) => d.split('-').reverse().join('/');
const historicoFiltrado = computed(() => movimentacaoStore.movimentacoes || []); // Simplificado para brevidade
const tipoOptions = [{ value: 'entrada', label: 'Entrada' }, { value: 'saida', label: 'Saída' }];
const materialOptions = computed(() => materialStore.materials.map(m => ({ value: m.codigo, label: m.nome })));
</script>

<template>
  <div class="flex flex-col gap-10 relative">

    <div v-if="showAuthModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Lock class="text-blue-600" />
            Autorizar
          </h2>
          <button @click="showAuthModal = false"><X :size="24" class="text-gray-400" /></button>
        </div>
        <div class="flex flex-col items-center py-4">
          <Scan :size="48" class="text-blue-600 mb-4 animate-pulse" />
          <p class="text-gray-600 mb-4">Bipe o crachá para confirmar</p>
          <input 
            ref="authInputRef"
            v-model="authInput"
            @keyup.enter="confirmarAuth"
            type="password"
            class="w-full text-center border-2 border-gray-200 rounded-lg py-3 px-4 text-lg"
            placeholder="Leia o código..."
            autocomplete="off"
          />
        </div>
      </div>
    </div>

    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border-t-8 border-green-500">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle :size="40" class="text-green-600" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Registrado!</h2>
        <p class="text-gray-500 mb-8">A movimentação foi salva com sucesso no histórico.</p>
        <button 
          @click="showSuccessModal = false"
          class="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <span>Continuar</span>
          <ArrowRight :size="18" />
        </button>
      </div>
    </div>

    <div class="space-y-3">
      <h1 class="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent text-2xl font-bold">
        Movimentação de Estoque
      </h1>
      <p class="text-[#6B7280]">Registre entradas e saídas</p>
    </div>

    <form @submit.prevent="abrirModalAuth">
      <div class="flex flex-col gap-8">
        <Card>
          <div class="flex items-center gap-3 mb-8">
            <div class="w-1.5 h-7 bg-gradient-to-b from-[#2563EB] to-[#1E40AF] rounded-full"></div>
            <h3 class="font-semibold text-[#111827]">Nova Movimentação</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select v-model="formData.tipo" label="Tipo *" :options="tipoOptions" required />
            
            <div class="flex flex-col gap-2">
              <label class="block text-sm font-medium text-gray-700">Busca Rápida</label>
              <div class="relative">
                <Input v-model="buscaIdentificacao" placeholder="Bipe o código aqui..." class="pl-10" />
                <ScanBarcode :size="18" class="absolute left-3 top-3 text-gray-400" />
              </div>
              <div v-if="materialEncontradoInfo" class="text-sm text-green-700 bg-green-50 p-2 rounded border border-green-100">
                <CheckCircle2 :size="14" class="inline mr-1"/> Encontrado: <strong>{{ materialEncontradoInfo }}</strong>
              </div>
            </div>

            <Select v-model="formData.materialCodigo" label="Material *" :options="materialOptions" required />
            <Input v-model="formData.quantidade" label="Quantidade *" type="number" required />
            <Input v-model="formData.data" label="Data *" type="date" required />
            
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Responsável</label>
              
              <input type="text" value="Será preenchido pelo crachá" disabled class="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-400 italic" />
            </div>

            <div class="md:col-span-2">
              <Textarea v-model="formData.observacoes" label="Observações" :rows="3" />
            </div>
          </div>
        </Card>

        <Card class="bg-gray-50 border-dashed border-2">
          <div class="flex justify-end">
            <Button type="submit">
              <Lock :size="16" class="mr-2" />
              Validar e Registrar
            </Button>
          </div>
        </Card>
      </div>
    </form>
    
    <Card>
      <div class="flex items-center gap-3 mb-6">
        <Calendar :size="24" class="text-green-600" />
        <h3 class="font-semibold text-gray-800">Histórico Recente</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resp.</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="mov in historicoFiltrado" :key="mov.id">
              <td class="px-6 py-4 text-sm">{{ formatarData(mov.data) }}</td>
              <td class="px-6 py-4"><Badge :variant="mov.tipo === 'entrada' ? 'success' : 'error'">{{ mov.tipo.toUpperCase() }}</Badge></td>
              <td class="px-6 py-4 text-sm">{{ mov.materialNome }}</td>
              <td class="px-6 py-4 text-sm">{{ mov.responsavel }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>