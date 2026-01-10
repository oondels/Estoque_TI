<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { 
  Save, Archive, Barcode, Wand2, Scan, X, Lock, CheckCircle, Plus 
} from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import Card from '../components/Card.vue';
import Input from '../components/Input.vue';
import Select from '../components/Select.vue';
import Button from '../components/Button.vue';
import { useMaterialStore } from '../stores/materialStore';
import { useAuthStore } from '../stores/authStore';

const materialStore = useMaterialStore();
const authStore = useAuthStore();

// Controles
const showAuthModal = ref(false);
const showSuccessModal = ref(false);
const authInput = ref('');
const authInputRef = ref<HTMLInputElement | null>(null);
const usuarioLogado = ref<string>(''); // Armazena quem autorizou

const formData = ref({
  nome: '',
  categoria: '',
  quantidade: '',
  minimo: '',
  local: '',
  valor: '',
  codigoPrincipal: '', 
  numeroSerie: ''
});

const categorias = [
  { value: 'hardware', label: 'Hardware' },
  { value: 'perifericos', label: 'Periféricos' },
  { value: 'cabos', label: 'Cabos' },
  { value: 'rede', label: 'Rede' },
  { value: 'consumiveis', label: 'Consumíveis' },
  { value: 'outros', label: 'Outros' },
];

const locais = [
  { value: 'prateleira_nivel_01', label: 'Prateleira Nível 01' },
  { value: 'prateleira_nivel_02', label: 'Prateleira Nível 02' },
  { value: 'prateleira_nivel_03', label: 'Prateleira Nível 03' },
  { value: 'gaveta_01', label: 'Gaveta 01' },
  { value: 'gaveta_02', label: 'Gaveta 02' },
  { value: 'gaveta_03', label: 'Gaveta 03' },
  { value: 'organizador_01', label: 'Organizador 01' },
  { value: 'organizador_02', label: 'Organizador 02' },
];

const permiteGerarCodigo = computed(() => {
  return ['perifericos', 'cabos', 'consumiveis', 'outros'].includes(formData.value.categoria);
});

const gerarCodigoAutomatico = () => {
  if (!permiteGerarCodigo.value) return; 
  const random = Math.floor(100000 + Math.random() * 900000);
  const prefixo = formData.value.categoria === 'perifericos' ? 'PER' : 'GEN';
  formData.value.codigoPrincipal = `${prefixo}-${random}`;
};

const abrirModalAuth = () => {
  if (!formData.value.nome || !formData.value.codigoPrincipal || !formData.value.categoria || !formData.value.quantidade) {
    toast.error('Preencha os campos obrigatórios');
    return;
  }
  showAuthModal.value = true;
  authInput.value = '';
  nextTick(() => authInputRef.value?.focus());
};

const confirmarAuth = () => {
  const usuario = authStore.validarCracha(authInput.value);
  if (usuario) {
    usuarioLogado.value = usuario.nome; // Salva o nome
    showAuthModal.value = false;
    processarSalvamento(); 
  } else {
    toast.error('Crachá não autorizado');
    authInput.value = '';
    authInputRef.value?.focus();
  }
};

const processarSalvamento = () => {
  try {
    const isPatrimonio = !formData.value.codigoPrincipal.includes('-');

    materialStore.addMaterial({
      codigo: formData.value.codigoPrincipal,
      patrimonio: isPatrimonio ? formData.value.codigoPrincipal : undefined,
      numeroSerie: formData.value.numeroSerie,
      nome: formData.value.nome,
      categoria: formData.value.categoria,
      quantidade: Number(formData.value.quantidade),
      minimo: Number(formData.value.minimo),
      valor: Number(formData.value.valor),
      local: formData.value.local,
      criadoPor: usuarioLogado.value // Salva aqui
    });

    showSuccessModal.value = true;
    
    formData.value = {
      nome: '',
      categoria: '',
      quantidade: '',
      minimo: '',
      local: '',
      valor: '',
      codigoPrincipal: '',
      numeroSerie: ''
    };

  } catch (error: any) {
    toast.error(error.message);
  }
};
</script>

<template>
  <div class="space-y-6 relative">
    
    <div v-if="showAuthModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Lock class="text-blue-600" /> Confirmar Cadastro
          </h2>
          <button @click="showAuthModal = false"><X :size="24" class="text-gray-400" /></button>
        </div>
        <div class="flex flex-col items-center gap-4 py-4">
          <Scan :size="40" class="text-blue-600 animate-pulse" />
          <p class="text-center text-gray-600">Bipe seu crachá para assinar o cadastro.</p>
          <input ref="authInputRef" v-model="authInput" @keyup.enter="confirmarAuth" type="password" class="w-full text-center border-2 border-gray-300 rounded-lg py-2 px-4 focus:border-blue-500 outline-none" placeholder="Aguardando..." />
        </div>
      </div>
    </div>

    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border-t-8 border-green-500">
        <CheckCircle :size="48" class="text-green-600 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Sucesso!</h2>
        <p class="text-gray-600 mb-6">Material cadastrado por <strong>{{ usuarioLogado }}</strong>.</p>
        <button @click="showSuccessModal = false" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2">
          <Plus :size="20" /> Novo Cadastro
        </button>
      </div>
    </div>

    <div class="space-y-1">
      <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Cadastrar Material</h1>
    </div>

    <form @submit.prevent="abrirModalAuth" class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card class="md:col-span-2 border-l-4 border-l-blue-500">
          <div class="flex items-center gap-2 mb-6">
            <Barcode class="text-blue-500" :size="20" />
            <h3 class="font-semibold text-gray-800">Identificação</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2"><Input v-model="formData.nome" label="Nome *" required /></div>
            <Select v-model="formData.categoria" label="Categoria *" :options="categorias" required />
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Código/Patrimônio *</label>
              <div class="flex gap-2">
                <Input v-model="formData.codigoPrincipal" class="flex-1" required />
                <button type="button" @click="gerarCodigoAutomatico" :disabled="!permiteGerarCodigo" class="px-3 border rounded-lg bg-gray-50 hover:bg-gray-100"><Wand2 :size="18" /></button>
              </div>
            </div>
            <Input v-model="formData.numeroSerie" label="Nº Série" />
          </div>
        </Card>

        <Card class="md:col-span-2">
           <div class="flex items-center gap-2 mb-6">
            <Archive class="text-green-600" :size="20" />
            <h3 class="font-semibold text-gray-800">Estoque</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input v-model="formData.quantidade" label="Qtd *" type="number" required />
            <Input v-model="formData.minimo" label="Mínimo" type="number" />
            <Select v-model="formData.local" label="Local" :options="locais" />
            <Input v-model="formData.valor" label="Valor (R$)" type="number" step="0.01" />
          </div>
        </Card>
      </div>

      <div class="flex justify-end pt-4">
        <Button type="submit" size="lg"><Save :size="18" class="mr-2" /> Salvar</Button>
      </div>
    </form>
  </div>
</template>