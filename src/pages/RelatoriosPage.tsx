import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  PieChart
} from 'lucide-react';

interface RelatoriosPageProps {
  onNavigate: (page: string) => void;
}

export function RelatoriosPage({ onNavigate }: RelatoriosPageProps) {
  const [filtros, setFiltros] = useState({
    dataInicio: '2025-01-01',
    dataFim: '2025-12-11',
    categoria: '',
    tipo: 'todos',
  });

  const categorias = [
    { value: '', label: 'Todas as categorias' },
    { value: 'notebooks', label: 'Notebooks' },
    { value: 'monitores', label: 'Monitores' },
    { value: 'perifericos', label: 'Periféricos' },
    { value: 'cabos', label: 'Cabos e Acessórios' },
    { value: 'componentes', label: 'Componentes' },
  ];

  const tiposRelatorio = [
    { value: 'todos', label: 'Todos os tipos' },
    { value: 'entradas', label: 'Apenas Entradas' },
    { value: 'saidas', label: 'Apenas Saídas' },
  ];

  const totais = [
    {
      label: 'Total de Movimentações',
      value: '384',
      icon: TrendingUp,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-[#EFF6FF]',
    },
    {
      label: 'Total de Entradas',
      value: '245',
      icon: ArrowUpRight,
      color: 'text-[#10B981]',
      bgColor: 'bg-[#ECFDF5]',
    },
    {
      label: 'Total de Saídas',
      value: '139',
      icon: ArrowDownRight,
      color: 'text-[#EF4444]',
      bgColor: 'bg-[#FEF2F2]',
    },
    {
      label: 'Valor Movimentado',
      value: 'R$ 1,8M',
      icon: Package,
      color: 'text-[#8B5CF6]',
      bgColor: 'bg-[#F5F3FF]',
    },
  ];

  const topItens = [
    { nome: 'Mouse Logitech MX Master 3', movimentacoes: 45, tipo: 'Saída' },
    { nome: 'Notebook Dell Latitude 5420', movimentacoes: 38, tipo: 'Entrada' },
    { nome: 'Monitor LG 27"', movimentacoes: 32, tipo: 'Saída' },
    { nome: 'Teclado Mecânico Keychron', movimentacoes: 28, tipo: 'Entrada' },
    { nome: 'SSD Samsung 1TB', movimentacoes: 24, tipo: 'Saída' },
  ];

  const movimentacoesPorCategoria = [
    { categoria: 'Periféricos', total: 125, percentual: 32 },
    { categoria: 'Notebooks', total: 98, percentual: 26 },
    { categoria: 'Monitores', total: 76, percentual: 20 },
    { categoria: 'Componentes', total: 52, percentual: 14 },
    { categoria: 'Cabos', total: 33, percentual: 8 },
  ];

  const handleExportar = (formato: string) => {
    alert(`Exportando relatório em formato ${formato.toUpperCase()}...`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Relatórios</h1>
        <p className="text-[#6B7280]">Análise e estatísticas do estoque</p>
      </div>

      {/* Filtros */}
      <Card>
        <h3 className="font-semibold text-[#111827] mb-4">Filtros</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            label="Data Início"
            type="date"
            value={filtros.dataInicio}
            onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
          />
          
          <Input
            label="Data Fim"
            type="date"
            value={filtros.dataFim}
            onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
          />
          
          <Select
            label="Categoria"
            options={categorias}
            value={filtros.categoria}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
          />
          
          <Select
            label="Tipo"
            options={tiposRelatorio}
            value={filtros.tipo}
            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          />
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#E5E7EB]">
          <Button onClick={() => handleExportar('pdf')}>
            <Download className="w-4 h-4" />
            Exportar PDF
          </Button>
          <Button variant="secondary" onClick={() => handleExportar('csv')}>
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
          <Button variant="secondary" onClick={() => handleExportar('excel')}>
            <Download className="w-4 h-4" />
            Exportar Excel
          </Button>
        </div>
      </Card>

      {/* Cards de Totais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {totais.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">{item.label}</p>
                  <p className="text-2xl font-bold text-[#111827]">{item.value}</p>
                </div>
                <div className={`${item.bgColor} ${item.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Grid 2 colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Movimentações por Categoria */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#6B7280]" />
              <h3 className="font-semibold text-[#111827]">Movimentações por Categoria</h3>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            {movimentacoesPorCategoria.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#6B7280]">{item.categoria}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#111827]">{item.total}</span>
                    <span className="text-xs text-[#9CA3AF]">({item.percentual}%)</span>
                  </div>
                </div>
                <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
                    style={{ width: `${item.percentual}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#111827]">Total</span>
              <span className="text-sm font-bold text-[#111827]">
                {movimentacoesPorCategoria.reduce((acc, item) => acc + item.total, 0)} movimentações
              </span>
            </div>
          </div>
        </Card>

        {/* Top 5 Itens Mais Movimentados */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#6B7280]" />
            <h3 className="font-semibold text-[#111827]">Top 5 Itens Mais Movimentados</h3>
          </div>
          
          <div className="flex flex-col gap-3">
            {topItens.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 pb-3 border-b border-[#E5E7EB] last:border-0"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F3F4F6] text-[#6B7280] font-semibold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111827] truncate">
                    {item.nome}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    {item.movimentacoes} movimentações
                  </p>
                </div>
                
                <div className={`
                  px-2 py-1 rounded-md text-xs font-medium flex-shrink-0
                  ${item.tipo === 'Entrada' 
                    ? 'bg-[#ECFDF5] text-[#166534]' 
                    : 'bg-[#FEE2E2] text-[#991B1B]'
                  }
                `}>
                  {item.tipo}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Gráfico de Linha - Simulação */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#6B7280]" />
            <h3 className="font-semibold text-[#111827]">Movimentações no Período</h3>
          </div>
          <select className="text-sm border border-[#E5E7EB] rounded-lg px-3 py-1.5">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Últimos 90 dias</option>
            <option>Último ano</option>
          </select>
        </div>
        
        {/* Gráfico simulado com barras CSS */}
        <div className="flex items-end justify-between gap-2 h-48">
          {[
            { label: 'Seg', entradas: 15, saidas: 8 },
            { label: 'Ter', entradas: 22, saidas: 12 },
            { label: 'Qua', entradas: 18, saidas: 15 },
            { label: 'Qui', entradas: 28, saidas: 10 },
            { label: 'Sex', entradas: 25, saidas: 18 },
            { label: 'Sáb', entradas: 10, saidas: 5 },
            { label: 'Dom', entradas: 8, saidas: 3 },
          ].map((dia, index) => {
            const maxValue = 30;
            const alturaEntrada = (dia.entradas / maxValue) * 100;
            const alturaSaida = (dia.saidas / maxValue) * 100;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center gap-1 flex-1">
                  <div 
                    className="w-full bg-[#10B981] rounded-t-md transition-all hover:opacity-80 cursor-pointer"
                    style={{ height: `${alturaEntrada}%` }}
                    title={`Entradas: ${dia.entradas}`}
                  />
                  <div 
                    className="w-full bg-[#EF4444] rounded-t-md transition-all hover:opacity-80 cursor-pointer"
                    style={{ height: `${alturaSaida}%` }}
                    title={`Saídas: ${dia.saidas}`}
                  />
                </div>
                <span className="text-xs text-[#6B7280]">{dia.label}</span>
              </div>
            );
          })}
        </div>
        
        {/* Legenda */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#10B981] rounded" />
            <span className="text-sm text-[#6B7280]">Entradas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#EF4444] rounded" />
            <span className="text-sm text-[#6B7280]">Saídas</span>
          </div>
        </div>
      </Card>

      {/* Resumo Geral */}
      <Card className="bg-[#F9FAFB]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <FileText className="w-6 h-6 text-[#3B82F6] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-[#111827] mb-1">Relatório Completo</h4>
              <p className="text-sm text-[#6B7280]">
                Período: {new Date(filtros.dataInicio).toLocaleDateString('pt-BR')} até {new Date(filtros.dataFim).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          <Button onClick={() => handleExportar('completo')}>
            <Download className="w-4 h-4" />
            Baixar Relatório Completo
          </Button>
        </div>
      </Card>
    </div>
  );
}
