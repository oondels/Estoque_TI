import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { 
  AlertTriangle, 
  AlertCircle, 
  Package, 
  TrendingDown,
  Plus,
  Edit
} from 'lucide-react';
import { useMaterials } from '../contexts/MaterialContext';
import { toast } from 'sonner';

interface AlertasPageProps {
  onNavigate: (page: string, itemId?: number) => void;
}

export function AlertasPage({ onNavigate }: AlertasPageProps) {
  const { materials, updateMaterial } = useMaterials();
  const [showReposicaoModal, setShowReposicaoModal] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);
  const [quantidadeReposicao, setQuantidadeReposicao] = useState('');

  // Filtrar materiais abaixo do mínimo
  const materiaisAbaixoMinimo = materials
    .filter(m => m.quantidade < m.minimo)
    .map(m => ({
      ...m,
      percentual: Math.round((m.quantidade / m.minimo) * 100),
      nivelCriticidade: m.quantidade === 0 ? 'critico' : m.quantidade < m.minimo * 0.5 ? 'critico' : 'atencao'
    }))
    .sort((a, b) => a.percentual - b.percentual);
  
  const alertasCriticos = materiaisAbaixoMinimo.filter(m => m.nivelCriticidade === 'critico');
  const alertasAtencao = materiaisAbaixoMinimo.filter(m => m.nivelCriticidade === 'atencao');

  const estatisticas = [
    { 
      label: 'Itens Críticos', 
      value: alertasCriticos.length,
      icon: AlertCircle,
      color: 'text-[#EF4444]',
      bgColor: 'bg-[#FEF2F2]'
    },
    { 
      label: 'Itens em Alerta', 
      value: alertasAtencao.length,
      icon: AlertTriangle,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-[#FFFBEB]'
    },
    { 
      label: 'Necessita Atenção', 
      value: materiaisAbaixoMinimo.length - alertasCriticos.length - alertasAtencao.length,
      icon: TrendingDown,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-[#EFF6FF]'
    },
  ];

  const getNivelBadge = (nivel: string) => {
    switch (nivel) {
      case 'critico':
        return <Badge variant="error">Crítico</Badge>;
      case 'alerta':
        return <Badge variant="warning">Alerta</Badge>;
      case 'atencao':
        return <Badge variant="info">Atenção</Badge>;
      default:
        return <Badge>Normal</Badge>;
    }
  };

  const handleReposicaoRapida = (item: any) => {
    setItemSelecionado(item);
    setQuantidadeReposicao((item.minimo - item.quantidade + 10).toString());
    setShowReposicaoModal(true);
  };

  const handleConfirmarReposicao = () => {
    if (itemSelecionado && quantidadeReposicao) {
      const novaQuantidade = itemSelecionado.quantidade + parseInt(quantidadeReposicao);
      updateMaterial(itemSelecionado.id, { quantidade: novaQuantidade });
      toast.success(`Movimentação de entrada registrada: +${quantidadeReposicao} unidades`);
    }
    setShowReposicaoModal(false);
    setItemSelecionado(null);
    setQuantidadeReposicao('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Alertas de Estoque</h1>
        <p className="text-[#6B7280]">Itens que precisam de reposição urgente</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {estatisticas.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <div className="flex items-center gap-4">
                <div className={`${stat.bgColor} ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Lista de Alertas - Desktop */}
      <div className="hidden md:flex flex-col gap-3">
        {alertasCriticos.map((item) => (
          <Card 
            key={item.id}
            variant={item.nivelCriticidade === 'critico' ? 'error' : item.nivelCriticidade === 'alerta' ? 'warning' : 'info'}
          >
            <div className="flex items-center gap-4">
              {/* Foto */}
              <img 
                src={item.foto}
                alt={item.nome}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              
              {/* Informações */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#111827] mb-1">{item.nome}</h4>
                    <p className="text-sm text-[#6B7280]">
                      {item.categoria} • {item.codigo} • {item.local}
                    </p>
                  </div>
                  {getNivelBadge(item.nivelCriticidade)}
                </div>
                
                {/* Barra de progresso */}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[#6B7280]">
                        {item.quantidade} de {item.minimo} unidades
                      </span>
                      <span className="text-sm font-medium text-[#111827]">{item.percentual}%</span>
                    </div>
                    <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          item.nivelCriticidade === 'critico' 
                            ? 'bg-[#EF4444]' 
                            : item.nivelCriticidade === 'alerta'
                            ? 'bg-[#F59E0B]'
                            : 'bg-[#3B82F6]'
                        }`}
                        style={{ width: `${item.percentual}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Ações */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  onClick={() => handleReposicaoRapida(item)}
                >
                  <Plus className="w-4 h-4" />
                  Reposição Rápida
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('edicao', item.id)}
                >
                  <Edit className="w-4 h-4" />
                  Editar Item
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Lista de Alertas - Mobile (Cards) */}
      <div className="md:hidden flex flex-col gap-4">
        {alertasCriticos.map((item) => (
          <Card 
            key={item.id}
            variant={item.nivelCriticidade === 'critico' ? 'error' : item.nivelCriticidade === 'alerta' ? 'warning' : 'info'}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <img 
                  src={item.foto}
                  alt={item.nome}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[#111827] mb-1">{item.nome}</h4>
                  <p className="text-sm text-[#6B7280] mb-2">{item.categoria}</p>
                  {getNivelBadge(item.nivelCriticidade)}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#6B7280]">
                    {item.quantidade} / {item.minimo}
                  </span>
                  <span className="text-sm font-medium">{item.percentual}%</span>
                </div>
                <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.nivelCriticidade === 'critico' 
                        ? 'bg-[#EF4444]' 
                        : item.nivelCriticidade === 'alerta'
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#3B82F6]'
                    }`}
                    style={{ width: `${item.percentual}%` }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  fullWidth
                  onClick={() => handleReposicaoRapida(item)}
                >
                  <Plus className="w-4 h-4" />
                  Repor
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('edicao', item.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de Reposição Rápida */}
      <Modal
        isOpen={showReposicaoModal}
        onClose={() => setShowReposicaoModal(false)}
        title="Reposição Rápida"
        maxWidth="sm"
        footer={
          <>
            <Button 
              variant="secondary"
              onClick={() => setShowReposicaoModal(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleConfirmarReposicao}>
              <Plus className="w-4 h-4" />
              Confirmar Entrada
            </Button>
          </>
        }
      >
        {itemSelecionado && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
              <img 
                src={itemSelecionado.foto}
                alt={itemSelecionado.nome}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-medium text-[#111827]">{itemSelecionado.nome}</h4>
                <p className="text-sm text-[#6B7280]">{itemSelecionado.codigo}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#F9FAFB] rounded-lg">
                <p className="text-xs text-[#9CA3AF] mb-1">Qtd. Atual</p>
                <p className="text-lg font-bold text-[#111827]">{itemSelecionado.quantidade}</p>
              </div>
              <div className="p-3 bg-[#F9FAFB] rounded-lg">
                <p className="text-xs text-[#9CA3AF] mb-1">Qtd. Mínima</p>
                <p className="text-lg font-bold text-[#111827]">{itemSelecionado.minimo}</p>
              </div>
            </div>
            
            <Input
              label="Quantidade para Reposição"
              type="number"
              min="1"
              value={quantidadeReposicao}
              onChange={(e) => setQuantidadeReposicao(e.target.value)}
              helper={`Sugestão: ${itemSelecionado.minimo - itemSelecionado.quantidade + 10} unidades`}
            />
            
            <Card variant="success" size="small">
              <p className="text-sm text-[#166534]">
                ✓ Novo estoque: <strong>{itemSelecionado.quantidade + parseInt(quantidadeReposicao || '0')}</strong> unidades
              </p>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
}