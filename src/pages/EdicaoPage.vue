<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Save, X, Archive, Barcode } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import Card from '../components/Card.vue';
import Input from '../components/Input.vue';
import Select from '../components/Select.vue';
import Button from '../components/Button.vue';
import { useMaterialStore } from '../stores/materialStore';

const emit = defineEmits<{ navigate: [page: string] }>();
const materialStore = useMaterialStore();

const loading = ref(true);

const formData = ref({
  codigo: '',
  nome: '',
  categoria: '',
  quantidade: '',
  minimo: '',
  local: '',
  valor: '',
  numeroSerie: '',
  patrimonio: '',
  criadoPor: ''
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

onMounted(() => {
  try {
    const codigo = localStorage.getItem('material_to_edit');
    if (!codigo) throw new Error('Código não fornecido');

    const material = materialStore.materials.find(m => m.codigo === codigo);
    if (!material) throw new Error('Material não encontrado');

    formData.value = {
      codigo: material.codigo,
      nome: material.nome,
      categoria: material.categoria,
      quantidade: String(material.quantidade),
      minimo: String(material.minimo),
      local: material.local || '',
      valor: material.valor ? String(material.valor) : '',
      numeroSerie: material.numeroSerie || '',
      patrimonio: material.patrimonio || '',
      criadoPor: material.criadoPor || ''
    };
    
    loading.value = false;
  } catch (e) {
    console.error(e);
    toast.error('Erro ao carregar item para edição.');
    emit('navigate', 'listagem');
  }
});

const handleSave = () => {
  try {
    materialStore.updateMaterial(formData.value.codigo, {
      nome: formData.value.nome,
      categoria: formData.value.categoria,
      quantidade: Number(formData.value.quantidade),
      minimo: Number(formData.value.minimo),
      local: formData.value.local,
      valor: Number(formData.value.valor),
      numeroSerie: formData.value.numeroSerie,
      patrimonio: formData.value.patrimonio
    });

    toast.success('Alterações salvas!');
    localStorage.removeItem('material_to_edit');
    emit('navigate', 'listagem');
  } catch (e: any) {
    toast.error(e.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="space-y-3">
      <h1 class="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent text-2xl font-bold">
        Editar Material
      </h1>
      <p v-if="formData.codigo" class="text-gray-500">Editando: <span class="font-mono font-bold">{{ formData.codigo }}</span></p>
    </div>

    <div v-if="loading" class="p-12 flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <form v-else @submit.prevent="handleSave" class="space-y-6 animate-in fade-in">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card class="md:col-span-2 border-l-4 border-l-orange-400">
          <div class="flex justify-between items-start mb-6">
            <div class="flex items-center gap-2">
              <Barcode class="text-orange-500" :size="20" />
              <h3 class="font-semibold text-gray-800">Dados Principais</h3>
            </div>
            <div class="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded" v-if="formData.criadoPor">
              Cadastrado por: {{ formData.criadoPor }}
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <Input v-model="formData.nome" label="Nome do Material *" required />
            </div>
            <Select v-model="formData.categoria" label="Categoria *" :options="categorias" required />
            <Input v-model="formData.numeroSerie" label="Número de Série" />
          </div>
        </Card>

        <Card class="md:col-span-2">
           <div class="flex items-center gap-2 mb-6">
            <Archive class="text-blue-500" :size="20" />
            <h3 class="font-semibold text-gray-800">Estoque e Local</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input v-model="formData.quantidade" label="Quantidade Atual" type="number" required />
            <Input v-model="formData.minimo" label="Mínimo (Alerta)" type="number" />
            <Select v-model="formData.local" label="Local" :options="locais" />
            <Input v-model="formData.valor" label="Valor Unit. (R$)" type="number" step="0.01" />
          </div>
        </Card>
      </div>

      <div class="flex justify-end gap-4">
        <Button type="button" variant="secondary" @click="emit('navigate', 'listagem')">
          <X :size="16" class="mr-2" /> Cancelar
        </Button>
        <Button type="submit">
          <Save :size="16" class="mr-2" /> Salvar Alterações
        </Button>
      </div>
    </form>
  </div>
</template>