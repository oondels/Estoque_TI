import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Upload, Save, X, Trash2, History, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useMaterials } from '../contexts/MaterialContext';
import { toast } from 'sonner@2.0.3';

interface EdicaoPageProps {
  onNavigate: (page: string) => void;
  itemId?: number;
}

export function EdicaoPage({ onNavigate, itemId }: EdicaoPageProps) {
  const { getMaterialById, updateMaterial, deleteMaterial } = useMaterials();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const material = itemId ? getMaterialById(itemId) : null;
  
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
    valor: '',
  });

  const [imagemPreview, setImagemPreview] = useState('https://via.placeholder.com/200');
  
  // Carregar dados do material quando o componente montar ou itemId mudar
  useEffect(() => {
    if (material) {
      // Mapear categoria de volta para o valor
      const categoriaValue = categorias.find(c => c.label === material.categoria)?.value || '';
      const localValue = locais.find(l => l.label === material.local)?.value || '';
      
      setFormData({
        nome: material.nome,
        categoria: categoriaValue,
        descricao: material.descricao || '',
        numeroSerie: '',
        codigoPatrimonio: material.codigo,
        local: localValue,
        quantidadeAtual: material.quantidade.toString(),
        quantidadeMinima: material.minimo.toString(),
        fornecedor: material.fornecedor || '',
        dataAquisicao: '',
        valor: material.valor?.toString() || '',
      });
      setImagemPreview(material.foto);
    }
  }, [itemId, material]);

  // Histórico mockado
  const historico = [
    { 
      id: 1, 
      tipo: 'Entrada', 
      quantidade: 10, 
      motivo: 'Compra nova licitação',
      usuario: 'João Silva', 
      data: '10/12/2025 14:30' 
    },
    { 
      id: 2, 
      tipo: 'Saída', 
      quantidade: 5, 
      motivo: 'Distribuição departamento RH',
      usuario: 'Maria Santos', 
      data: '08/12/2025 10:15' 
    },
    { 
      id: 3, 
      tipo: 'Entrada', 
      quantidade: 20, 
      motivo: 'Reposição de estoque',
      usuario: 'Pedro Costa', 
      data: '01/12/2025 16:45' 
    },
    { 
      id: 4, 
      tipo: 'Saída', 
      quantidade: 8, 
      motivo: 'Distribuição novos funcionários',
      usuario: 'Ana Oliveira', 
      data: '25/11/2025 11:20' 
    },
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemId) {
      toast.error('ID do material não encontrado');
      return;
    }
    
    const updatedData = {
      nome: formData.nome,
      categoria: categorias.find(c => c.value === formData.categoria)?.label || formData.categoria,
      descricao: formData.descricao,
      codigo: formData.codigoPatrimonio,
      quantidade: parseInt(formData.quantidadeAtual) || 0,
      minimo: parseInt(formData.quantidadeMinima) || 0,
      local: locais.find(l => l.value === formData.local)?.label || formData.local,
      fornecedor: formData.fornecedor,
      valor: parseFloat(formData.valor) || 0,
      foto: imagemPreview,
    };
    
    updateMaterial(itemId, updatedData);
    toast.success('Material atualizado com sucesso!', {
      description: `As alterações em "${formData.nome}" foram salvas.`,
    });
    
    setTimeout(() => {
      onNavigate('listagem');
    }, 1000);
  };

  const handleDelete = () => {
    if (!itemId) return;
    
    deleteMaterial(itemId);
    toast.success('Material excluído com sucesso!', {
      description: `${formData.nome} foi removido do estoque.`,
    });
    setShowDeleteModal(false);
    
    setTimeout(() => {
      onNavigate('listagem');
    }, 800);
  };
  
  // Se não encontrar o material, mostrar mensagem
  if (itemId && !material) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Card>
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#111827] mb-2">Material não encontrado</h2>
            <p className="text-[#6B7280] mb-4">O material que você está tentando editar não existe.</p>
            <Button onClick={() => onNavigate('listagem')}>
              Voltar para Listagem
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] mb-1">Editar Material</h1>
          <p className="text-[#6B7280]">Atualize as informações do item de estoque</p>
        </div>
        <Button 
          variant="danger"
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash2 className="w-4 h-4" />
          Excluir
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário - 2 colunas */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Seção 1: Informações Básicas */}
            <Card>
              <h3 className="font-semibold text-[#111827] mb-4">Informações Básicas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Seção 2: Identificação */}
            <Card>
              <h3 className="font-semibold text-[#111827] mb-4">Identificação</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Seção 3: Estoque e Localização */}
            <Card>
              <h3 className="font-semibold text-[#111827] mb-4">Estoque e Localização</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Seção 4: Fornecedor e Aquisição */}
            <Card>
              <h3 className="font-semibold text-[#111827] mb-4">Fornecedor e Aquisição</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Seção 5: Foto do Material */}
            <Card>
              <h3 className="font-semibold text-[#111827] mb-4">Foto do Material</h3>
              
              <div className="flex items-center gap-4">
                <img 
                  src={imagemPreview} 
                  alt="Material" 
                  className="w-32 h-32 rounded-lg border-2 border-[#E5E7EB] object-cover"
                />
                <div className="flex flex-col gap-2">
                  <Button variant="secondary" size="sm">
                    <Upload className="w-4 h-4" />
                    Alterar Foto
                  </Button>
                  <p className="text-xs text-[#6B7280]">PNG, JPG até 5MB</p>
                </div>
              </div>
            </Card>

            {/* Botões de Ação */}
            <Card className="bg-[#F9FAFB]">
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={() => onNavigate('listagem')}
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4" />
                  Salvar Alterações
                </Button>
              </div>
            </Card>
          </form>
        </div>

        {/* Painel Lateral - Histórico - 1 coluna */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-[#6B7280]" />
              <h3 className="font-semibold text-[#111827]">Histórico de Movimentações</h3>
            </div>
            
            <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto">
              {historico.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-3 pb-3 border-b border-[#E5E7EB] last:border-0"
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    ${item.tipo === 'Entrada' 
                      ? 'bg-[#ECFDF5] text-[#10B981]' 
                      : 'bg-[#FEF2F2] text-[#EF4444]'
                    }
                  `}>
                    {item.tipo === 'Entrada' 
                      ? <ArrowUpRight className="w-5 h-5" /> 
                      : <ArrowDownRight className="w-5 h-5" />
                    }
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-sm font-medium text-[#111827]">
                        {item.tipo}
                      </span>
                      <span className={`
                        text-sm font-medium
                        ${item.tipo === 'Entrada' ? 'text-[#10B981]' : 'text-[#EF4444]'}
                      `}>
                        {item.tipo === 'Entrada' ? '+' : '-'}{item.quantidade}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] mb-1">{item.motivo}</p>
                    <p className="text-xs text-[#9CA3AF]">
                      {item.usuario} • {item.data}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Exclusão"
        maxWidth="sm"
        footer={
          <>
            <Button 
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="danger"
              onClick={handleDelete}
            >
              Excluir Permanentemente
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="text-[#374151]">
            Tem certeza que deseja excluir permanentemente o item{' '}
            <strong className="text-[#111827]">{formData.nome}</strong>?
          </p>
          <Card variant="warning" size="small">
            <p className="text-sm text-[#92400E]">
              ⚠️ Esta ação não pode ser desfeita. Todo o histórico de movimentações será perdido.
            </p>
          </Card>
        </div>
      </Modal>
    </div>
  );
}