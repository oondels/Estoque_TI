import React from 'react';
import { Card } from '../components/Card';
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
} from 'lucide-react';
import { Button } from '../components/Button';
import { useMaterials } from '../contexts/MaterialContext';
import { motion } from 'motion/react';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { materials } = useMaterials();
  
  // Calcular estatísticas reais
  const totalItens = materials.reduce((sum, m) => sum + m.quantidade, 0);
  const abaixoDoMinimo = materials.filter(m => m.quantidade < m.minimo).length;
  const valorTotal = materials.reduce((sum, m) => sum + (m.quantidade * (m.valor || 0)), 0);
  
  const stats = [
    { 
      label: 'Total de Itens', 
      value: totalItens.toString(), 
      change: '+12%', 
      trend: 'up',
      icon: Package,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-[#EFF6FF]'
    },
    { 
      label: 'Abaixo do Mínimo', 
      value: abaixoDoMinimo.toString(), 
      change: '-5%', 
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-[#FFFBEB]'
    },
    { 
      label: 'Movimentações (mês)', 
      value: '384', 
      change: '+18%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'text-[#10B981]',
      bgColor: 'bg-[#ECFDF5]'
    },
    { 
      label: 'Valor Total', 
      value: `R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 
      change: '+7%', 
      trend: 'up',
      icon: Activity,
      color: 'text-[#8B5CF6]',
      bgColor: 'bg-[#F5F3FF]'
    },
  ];

  const recentMovements = [
    { id: 1, item: 'Notebook Dell Latitude 5420', type: 'Saída', qty: 5, user: 'João Silva', date: '10/12/2025' },
    { id: 2, item: 'Mouse Logitech MX Master 3', type: 'Entrada', qty: 20, user: 'Maria Santos', date: '10/12/2025' },
    { id: 3, item: 'Monitor LG 27"', type: 'Saída', qty: 3, user: 'Pedro Costa', date: '09/12/2025' },
    { id: 4, item: 'Teclado Mecânico Keychron', type: 'Entrada', qty: 15, user: 'Ana Oliveira', date: '09/12/2025' },
  ];

  const shortcuts = [
    { label: 'Cadastrar Material', icon: Plus, page: 'cadastro', variant: 'primary' as const },
    { label: 'Consultar Itens', icon: List, page: 'listagem', variant: 'secondary' as const },
    { label: 'Relatórios', icon: FileText, page: 'relatorios', variant: 'secondary' as const },
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Header com animação */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-lg text-[#6B7280]">Visão geral do estoque de materiais de TI</p>
      </motion.div>

      {/* Stats Cards com animação escalonada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="h-full">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#111827]">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      <TrendIcon 
                        className={`w-4 h-4 ${stat.trend === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]'}`} 
                      />
                      <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-[#9CA3AF]">vs mês anterior</span>
                    </div>
                  </div>
                  <motion.div 
                    className={`${stat.bgColor} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0`}
                    style={{ backgroundColor: stat.bgColor.replace('bg-', ''), opacity: 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className={`w-7 h-7 ${stat.color}`} style={{ opacity: 1 }} />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Atalhos rápidos com animação */}
      <motion.div 
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {shortcuts.map((shortcut, index) => {
          const Icon = shortcut.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={shortcut.variant}
                size="lg"
                onClick={() => onNavigate(shortcut.page)}
              >
                <Icon className="w-5 h-5" />
                {shortcut.label}
              </Button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Grid de 2 colunas com animação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Movimentações Recentes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[#111827]">Movimentações Recentes</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('movimentacao')}
              >
                Ver todas
              </Button>
            </div>
            
            <div className="flex flex-col gap-5">
              {recentMovements.map((movement, idx) => (
                <motion.div 
                  key={movement.id}
                  className="flex items-start gap-5 pb-5 border-b border-[#F1F3F5] last:border-0 last:pb-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${movement.type === 'Entrada' ? 'text-[#10B981]' : 'text-[#EF4444]'}
                    `}
                    style={{ 
                      backgroundColor: movement.type === 'Entrada' ? '#ECFDF5' : '#FEF2F2',
                      opacity: 0.8
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {movement.type === 'Entrada' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-[#111827] mb-1.5 truncate">{movement.item}</p>
                    <p className="text-sm text-[#6B7280]">{movement.user} • {movement.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-lg font-bold ${movement.type === 'Entrada' ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                      {movement.type === 'Entrada' ? '+' : '-'}{movement.qty}
                    </p>
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wider font-medium">{movement.type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Gráfico com animação */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[#111827]">Movimentações por Categoria</h3>
              <select className="text-sm border border-[#E5E7EB] rounded-xl px-4 py-2.5 bg-white hover:border-[#2563EB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]">
                <option>Último mês</option>
                <option>Últimos 3 meses</option>
                <option>Último ano</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-6">
              {[
                { category: 'Notebooks', value: 45, color: '#2563EB' },
                { category: 'Monitores', value: 28, color: '#10B981' },
                { category: 'Periféricos', value: 62, color: '#F59E0B' },
                { category: 'Cabos e Acessórios', value: 38, color: '#8B5CF6' },
                { category: 'Componentes', value: 22, color: '#EF4444' },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#374151]">{item.category}</span>
                    <span className="text-sm font-bold text-[#111827]">{item.value}</span>
                  </div>
                  <div className="h-2 bg-[#F1F3F5] rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.9 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Alertas com animação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Card variant="warning">
          <div className="flex items-start gap-5">
            <motion.div 
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#F59E0B', opacity: 0.1 }}
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertTriangle className="w-6 h-6 text-[#F59E0B]" style={{ opacity: 1 }} />
            </motion.div>
            <div className="flex-1">
              <h4 className="font-semibold text-[#92400E] mb-2">Atenção: {abaixoDoMinimo} itens abaixo do estoque mínimo</h4>
              <p className="text-[15px] text-[#92400E] mb-5 leading-relaxed opacity-90">
                Alguns materiais precisam de reposição urgente para evitar ruptura de estoque.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="secondary" 
                  size="md"
                  onClick={() => onNavigate('alertas')}
                >
                  Ver itens críticos
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}