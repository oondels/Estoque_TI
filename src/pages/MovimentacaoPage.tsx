import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ArrowUpRight, ArrowDownRight, Save, X, Package } from 'lucide-react';

interface MovimentacaoPageProps {
  onNavigate: (page: string) => void;
}

export function MovimentacaoPage({ onNavigate }: MovimentacaoPageProps) {
  const [formData, setFormData] = useState({
    itemId: '',
    tipoMovimentacao: 'entrada',
    quantidade: '',
    motivo: '',
    data: new Date().toISOString().split('T')[0],
    observacoes: '',
  });

  const [itemSelecionado, setItemSelecionado] = useState<any>(null);

  const itens = [
    { value: '', label: 'Selecione um item...' },
    { value: '1', label: 'Notebook Dell Latitude 5420' },
    { value: '2', label: 'Monitor LG 27" 4K' },
    { value: '3', label: 'Mouse Logitech MX Master 3' },
    { value: '4', label: 'Teclado Mecânico Keychron K2' },
    { value: '5', label: 'SSD Samsung 1TB' },
  ];

  const tiposMovimentacao = [
    { value: 'entrada', label: 'Entrada' },
    { value: 'saida', label: 'Saída' },
  ];

  const motivos = {
    entrada: [
      { value: '', label: 'Selecione o motivo...' },
      { value: 'compra', label: 'Compra/Aquisição' },
      { value: 'devolucao', label: 'Devolução' },
      { value: 'transferencia', label: 'Transferência entre locais' },
      { value: 'doacao', label: 'Doação' },
      { value: 'outros', label: 'Outros' },
    ],
    saida: [
      { value: '', label: 'Selecione o motivo...' },
      { value: 'distribuicao', label: 'Distribuição/Alocação' },
      { value: 'manutencao', label: 'Manutenção' },
      { value: 'descarte', label: 'Descarte' },
      { value: 'transferencia', label: 'Transferência entre locais' },
      { value: 'emprestimo', label: 'Empréstimo' },
      { value: 'outros', label: 'Outros' },
    ],
  };

  // Mockup de dados do item selecionado
  const mockItems: any = {
    '1': {
      nome: 'Notebook Dell Latitude 5420',
      codigo: 'PAT-2024-001',
      categoria: 'Notebooks',
      quantidadeAtual: 45,
      quantidadeMinima: 20,
      local: 'Almoxarifado 1',
      foto: 'https://via.placeholder.com/150',
    },
    '2': {
      nome: 'Monitor LG 27" 4K',
      codigo: 'PAT-2024-002',
      categoria: 'Monitores',
      quantidadeAtual: 12,
      quantidadeMinima: 15,
      local: 'TI - Prédio A',
      foto: 'https://via.placeholder.com/150',
    },
  };

  const handleItemSelect = (itemId: string) => {
    setFormData({ ...formData, itemId });
    if (itemId && mockItems[itemId]) {
      setItemSelecionado(mockItems[itemId]);
    } else {
      setItemSelecionado(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Movimentação de ${formData.tipoMovimentacao} registrada com sucesso!`);
    onNavigate('dashboard');
  };

  const getQuantidadeResultante = () => {
    if (!itemSelecionado || !formData.quantidade) return itemSelecionado?.quantidadeAtual || 0;
    
    const qtd = parseInt(formData.quantidade);
    const atual = itemSelecionado.quantidadeAtual;
    
    if (formData.tipoMovimentacao === 'entrada') {
      return atual + qtd;
    } else {
      return Math.max(0, atual - qtd);
    }
  };

  const motivosOptions = formData.tipoMovimentacao === 'entrada' ? motivos.entrada : motivos.saida;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Movimentação de Estoque</h1>
        <p className="text-[#6B7280]">Registre entradas e saídas de materiais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário - 2 colunas */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Seção 1: Tipo de Movimentação */}
            <Card>
              <h3 className="font-semibold text-[#111827] mb-4">Tipo de Movimentação</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipoMovimentacao: 'entrada', motivo: '' })}
                  className={`
                    h-24 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2
                    ${formData.tipoMovimentacao === 'entrada'
                      ? 'border-[#10B981] bg-[#ECFDF5] text-[#10B981]'
                      : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB]'
                    }
                  `}
                >
                  <ArrowUpRight className="w-8 h-8" />
                  <span className="font-medium">Entrada</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipoMovimentacao: 'saida', motivo: '' })}
                  className={`
                    h-24 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2
                    ${formData.tipoMovimentacao === 'saida'
                      ? 'border-[#EF4444] bg-[#FEF2F2] text-[#EF4444]'
                      : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB]'
                    }
                  `}
                >
                  <ArrowDownRight className="w-8 h-8" />
                  <span className="font-medium">Saída</span>
                </button>
              </div>
            </Card>

            {/* Seção 2: Seleção do Item */}
            <Card>
              <h3 className="font-semibold text-[#111827] mb-4">Selecionar Item</h3>
              
              <Select
                label="Item do Estoque *"
                options={itens}
                value={formData.itemId}
                onChange={(e) => handleItemSelect(e.target.value)}
                required
              />
            </Card>

            {/* Seção 3: Detalhes da Movimentação */}
            <Card>
              <h3 className="font-semibold text-[#111827] mb-4">Detalhes da Movimentação</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Quantidade *"
                  type="number"
                  placeholder="0"
                  min="1"
                  max={formData.tipoMovimentacao === 'saida' ? itemSelecionado?.quantidadeAtual : undefined}
                  value={formData.quantidade}
                  onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                  required
                />

                <Input
                  label="Data *"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                />

                <div className="md:col-span-2">
                  <Select
                    label="Motivo da Movimentação *"
                    options={motivosOptions}
                    value={formData.motivo}
                    onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Textarea
                    label="Observações"
                    placeholder="Informações adicionais sobre a movimentação (opcional)"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            {/* Botões de Ação */}
            <Card className="bg-[#F9FAFB]">
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={() => onNavigate('dashboard')}
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4" />
                  Registrar Movimentação
                </Button>
              </div>
            </Card>
          </form>
        </div>

        {/* Painel Lateral - Resumo do Item - 1 coluna */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-[#6B7280]" />
              <h3 className="font-semibold text-[#111827]">Resumo do Item</h3>
            </div>
            
            {itemSelecionado ? (
              <div className="flex flex-col gap-4">
                {/* Foto */}
                <img 
                  src={itemSelecionado.foto}
                  alt={itemSelecionado.nome}
                  className="w-full h-40 object-cover rounded-lg border border-[#E5E7EB]"
                />
                
                {/* Informações */}
                <div>
                  <h4 className="font-medium text-[#111827] mb-1">
                    {itemSelecionado.nome}
                  </h4>
                  <p className="text-sm text-[#6B7280] mb-3">
                    {itemSelecionado.categoria} • {itemSelecionado.codigo}
                  </p>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                      <span className="text-sm text-[#6B7280]">Local</span>
                      <span className="text-sm font-medium text-[#111827]">
                        {itemSelecionado.local}
                      </span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                      <span className="text-sm text-[#6B7280]">Qtd. Atual</span>
                      <span className="text-sm font-medium text-[#111827]">
                        {itemSelecionado.quantidadeAtual}
                      </span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                      <span className="text-sm text-[#6B7280]">Qtd. Mínima</span>
                      <span className="text-sm font-medium text-[#111827]">
                        {itemSelecionado.quantidadeMinima}
                      </span>
                    </div>
                    
                    {formData.quantidade && (
                      <div className="flex justify-between py-2 mt-2 bg-[#F9FAFB] rounded-lg px-3">
                        <span className="text-sm font-medium text-[#111827]">Qtd. Resultante</span>
                        <span className={`
                          text-sm font-bold
                          ${formData.tipoMovimentacao === 'entrada' 
                            ? 'text-[#10B981]' 
                            : 'text-[#EF4444]'
                          }
                        `}>
                          {getQuantidadeResultante()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Alerta se ficar abaixo do mínimo */}
                {formData.quantidade && 
                 getQuantidadeResultante() < itemSelecionado.quantidadeMinima && (
                  <Card variant="warning" size="small">
                    <p className="text-xs text-[#92400E]">
                      ⚠️ Esta movimentação deixará o estoque abaixo do mínimo recomendado.
                    </p>
                  </Card>
                )}
                
                {/* Alerta se quantidade insuficiente */}
                {formData.tipoMovimentacao === 'saida' && 
                 formData.quantidade && 
                 parseInt(formData.quantidade) > itemSelecionado.quantidadeAtual && (
                  <Card variant="error" size="small">
                    <p className="text-xs text-[#991B1B]">
                      ❌ Quantidade insuficiente em estoque.
                    </p>
                  </Card>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="w-12 h-12 text-[#D1D5DB] mb-3" />
                <p className="text-sm text-[#9CA3AF]">
                  Selecione um item para visualizar as informações
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
