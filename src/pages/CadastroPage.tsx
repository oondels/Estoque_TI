import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Upload, Save, X } from 'lucide-react';
import { useMaterials } from '../contexts/MaterialContext';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface CadastroPageProps {
  onNavigate: (page: string) => void;
}

export function CadastroPage({ onNavigate }: CadastroPageProps) {
  const { addMaterial } = useMaterials();
  
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    descricao: '',
    numeroSerie: '',
    codigoPatrimonio: '',
    local: '',
    quantidadeAtual: '',
    quantidadeMinima: '',
    fornecedor: '',
    dataAquisicao: '',
    foto: null as File | null,
    valor: '',
  });

  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

  const categorias = [
    { value: '', label: 'Selecione...' },
    { value: 'notebooks', label: 'Notebooks' },
    { value: 'monitores', label: 'Monitores' },
    { value: 'perifericos', label: 'Periféricos' },
    { value: 'cabos', label: 'Cabos e Acessórios' },
    { value: 'componentes', label: 'Componentes' },
    { value: 'outros', label: 'Outros' },
  ];

  const locais = [
    { value: '', label: 'Selecione...' },
    { value: 'almoxarifado_1', label: 'Almoxarifado 1' },
    { value: 'almoxarifado_2', label: 'Almoxarifado 2' },
    { value: 'ti_predio_a', label: 'TI - Prédio A' },
    { value: 'ti_predio_b', label: 'TI - Prédio B' },
    { value: 'deposito', label: 'Depósito Central' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, foto: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criar novo material
    const newMaterial = {
      foto: imagemPreview || 'https://via.placeholder.com/40',
      nome: formData.nome,
      categoria: categorias.find(c => c.value === formData.categoria)?.label || formData.categoria,
      codigo: formData.codigoPatrimonio || `PAT-${Date.now()}`,
      quantidade: parseInt(formData.quantidadeAtual) || 0,
      minimo: parseInt(formData.quantidadeMinima) || 0,
      local: locais.find(l => l.value === formData.local)?.label || formData.local,
      descricao: formData.descricao,
      fornecedor: formData.fornecedor,
      valor: parseFloat(formData.valor) || 0,
    };

    addMaterial(newMaterial);
    toast.success('Material cadastrado com sucesso!', {
      description: `${newMaterial.nome} foi adicionado ao estoque.`,
    });
    
    // Resetar formulário
    setFormData({
      nome: '',
      categoria: '',
      descricao: '',
      numeroSerie: '',
      codigoPatrimonio: '',
      local: '',
      quantidadeAtual: '',
      quantidadeMinima: '',
      fornecedor: '',
      dataAquisicao: '',
      foto: null,
      valor: '',
    });
    setImagemPreview(null);
    
    // Navegar para listagem após 1 segundo
    setTimeout(() => {
      onNavigate('listagem');
    }, 1000);
  };

  const handleCancel = () => {
    toast.warning('Tem certeza que deseja cancelar?', {
      description: 'Os dados não serão salvos.',
      action: {
        label: 'Sim, cancelar',
        onClick: () => {
          toast.info('Cadastro cancelado');
          onNavigate('dashboard');
        },
      },
      cancel: {
        label: 'Continuar editando',
        onClick: () => {},
      },
    });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header com animação */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-3"
      >
        <h1 className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent">
          Cadastrar Material
        </h1>
        <p className="text-[#6B7280]">Preencha as informações do novo item de estoque</p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          {/* Seção 1: Informações Básicas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-7 bg-gradient-to-b from-[#2563EB] to-[#1E40AF] rounded-full"></div>
                <h3 className="font-semibold text-[#111827]">Informações Básicas</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nome do Material *"
                  placeholder="Ex: Notebook Dell Latitude 5420"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />

                <Select
                  label="Categoria *"
                  options={categorias}
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  required
                />

                <div className="md:col-span-2">
                  <Textarea
                    label="Descrição"
                    placeholder="Descreva as características e especificações do material"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Seção 2: Identificação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-7 bg-gradient-to-b from-[#10B981] to-[#059669] rounded-full"></div>
                <h3 className="font-semibold text-[#111827]">Identificação</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Número de Série"
                  placeholder="Ex: SN123456789"
                  value={formData.numeroSerie}
                  onChange={(e) => setFormData({ ...formData, numeroSerie: e.target.value })}
                />

                <Input
                  label="Código de Patrimônio"
                  placeholder="Ex: PAT-2024-001"
                  value={formData.codigoPatrimonio}
                  onChange={(e) => setFormData({ ...formData, codigoPatrimonio: e.target.value })}
                />
              </div>
            </Card>
          </motion.div>

          {/* Seção 3: Estoque e Localização */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-7 bg-gradient-to-b from-[#F59E0B] to-[#D97706] rounded-full"></div>
                <h3 className="font-semibold text-[#111827]">Estoque e Localização</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Local de Armazenamento *"
                  options={locais}
                  value={formData.local}
                  onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                  required
                />

                <Input
                  label="Quantidade Atual *"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={formData.quantidadeAtual}
                  onChange={(e) => setFormData({ ...formData, quantidadeAtual: e.target.value })}
                  required
                />

                <Input
                  label="Quantidade Mínima *"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={formData.quantidadeMinima}
                  onChange={(e) => setFormData({ ...formData, quantidadeMinima: e.target.value })}
                  helper="Sistema gerará alerta quando atingir este valor"
                  required
                />
              </div>
            </Card>
          </motion.div>

          {/* Seção 4: Fornecedor e Aquisição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-7 bg-gradient-to-b from-[#8B5CF6] to-[#7C3AED] rounded-full"></div>
                <h3 className="font-semibold text-[#111827]">Fornecedor e Aquisição</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Fornecedor"
                  placeholder="Nome do fornecedor"
                  value={formData.fornecedor}
                  onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
                />

                <Input
                  label="Valor Unitário (R$)"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                />

                <Input
                  label="Data de Aquisição"
                  type="date"
                  value={formData.dataAquisicao}
                  onChange={(e) => setFormData({ ...formData, dataAquisicao: e.target.value })}
                />
              </div>
            </Card>
          </motion.div>

          {/* Seção 5: Foto do Material */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-7 bg-gradient-to-b from-[#EC4899] to-[#DB2777] rounded-full"></div>
                <h3 className="font-semibold text-[#111827]">Foto do Material</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                {imagemPreview ? (
                  <motion.div 
                    className="relative w-48 h-48 rounded-xl border-2 border-[#E5E7EB] overflow-hidden shadow-md"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={imagemPreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <motion.button
                      type="button"
                      onClick={() => {
                        setImagemPreview(null);
                        setFormData({ ...formData, foto: null });
                      }}
                      className="absolute top-2 right-2 p-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <label className="w-48 h-48 border-2 border-dashed border-[#D1D5DB] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#3B82F6] hover:bg-[#F9FAFB] transition-all duration-300">
                    <Upload className="w-10 h-10 text-[#9CA3AF] mb-3" />
                    <span className="text-sm font-medium text-[#6B7280]">Clique para fazer upload</span>
                    <span className="text-xs text-[#9CA3AF] mt-1">PNG, JPG até 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-[#F9FAFB] to-[#F3F4F6] border-2 border-dashed border-[#E5E7EB]">
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={handleCancel}
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit">
                    <Save className="w-4 h-4" />
                    Salvar Material
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </form>
    </div>
  );
}