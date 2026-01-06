import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMaterials } from '../contexts/MaterialContext';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';

interface ListagemPageProps {
  onNavigate: (page: string, itemId?: number) => void;
}

export function ListagemPage({ onNavigate }: ListagemPageProps) {
  const { materials, deleteMaterial } = useMaterials();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Usar dados do contexto
  const mockData = materials;

  const categorias = [
    { value: '', label: 'Todas as categorias' },
    { value: 'notebooks', label: 'Notebooks' },
    { value: 'monitores', label: 'Monitores' },
    { value: 'perifericos', label: 'Periféricos' },
    { value: 'cabos', label: 'Cabos e Acessórios' },
    { value: 'componentes', label: 'Componentes' },
  ];

  // Aplicar filtros
  const filteredData = mockData.filter((item) => {
    // Filtro de busca (nome, código ou categoria)
    const matchesSearch = searchTerm === '' || 
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro de categoria
    const matchesCategory = categoryFilter === '' || 
      item.categoria.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Paginação com dados filtrados
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Recalcular total de páginas com dados filtrados
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Resetar para página 1 quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  const getStatusBadge = (quantidade: number, minimo: number) => {
    if (quantidade === 0) {
      return <Badge variant="error">Esgotado</Badge>;
    } else if (quantidade <= minimo) {
      return <Badge variant="warning">Baixo</Badge>;
    } else if (quantidade <= minimo * 1.5) {
      return <Badge variant="info">Adequado</Badge>;
    } else {
      return <Badge variant="success">Bom</Badge>;
    }
  };

  const columns = [
    {
      key: 'foto',
      label: 'Foto',
      minWidth: '70px',
      render: (value: string) => (
        <img src={value} alt="Material" className="w-10 h-10 rounded-lg object-cover" />
      ),
    },
    {
      key: 'nome',
      label: 'Nome',
      minWidth: '250px',
      render: (value: string) => (
        <span className="font-medium text-[#111827]">{value}</span>
      ),
    },
    {
      key: 'categoria',
      label: 'Categoria',
      minWidth: '140px',
    },
    {
      key: 'codigo',
      label: 'Código',
      minWidth: '140px',
      render: (value: string) => (
        <code className="text-sm text-[#6B7280] bg-[#F3F4F6] px-2 py-1 rounded">
          {value}
        </code>
      ),
    },
    {
      key: 'quantidade',
      label: 'Quantidade',
      minWidth: '120px',
      render: (value: number, row: any) => (
        <span className="font-medium">{value}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      minWidth: '120px',
      render: (_: any, row: any) => getStatusBadge(row.quantidade, row.minimo),
    },
    {
      key: 'local',
      label: 'Local',
      minWidth: '160px',
    },
    {
      key: 'acoes',
      label: 'Ações',
      minWidth: '110px',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('edicao', row.id);
            }}
            className="p-2 text-[#3B82F6] hover:bg-[#EFF6FF] rounded-lg transition-colors"
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.warning('Tem certeza que deseja excluir?', {
                description: `O item "${row.nome}" será removido permanentemente.`,
                action: {
                  label: 'Excluir',
                  onClick: () => {
                    deleteMaterial(row.id);
                    toast.success('Item excluído com sucesso!');
                  },
                },
                cancel: {
                  label: 'Cancelar',
                  onClick: () => {},
                },
              });
            }}
            className="p-2 text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors"
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header com animação */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] bg-clip-text text-transparent">
          Consultar Itens
        </h1>
        <p className="text-[#6B7280] mt-2">Visualize e gerencie todos os materiais do estoque</p>
      </motion.div>

      {/* Filtros com animação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome, código ou categoria..."
                icon={<Search className="w-5 h-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-64">
              <Select
                options={categorias}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
            </div>
            <Button variant="secondary">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>
          
          {/* Contador de resultados */}
          {(searchTerm || categoryFilter) && (
            <motion.div 
              className="mt-4 pt-4 border-t border-[#E5E7EB]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-[#6B7280]">
                <span className="font-semibold text-[#3B82F6]">{filteredData.length}</span> {filteredData.length === 1 ? 'item encontrado' : 'itens encontrados'}
                {filteredData.length !== mockData.length && (
                  <span className="text-[#9CA3AF]"> de {mockData.length} total</span>
                )}
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Tabela - Desktop */}
      <motion.div 
        className="hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="overflow-hidden p-0 hover:shadow-md transition-shadow">
          <Table 
            columns={columns}
            data={paginatedData}
            onRowClick={(row) => onNavigate('edicao', row.id)}
          />
        </Card>
      </motion.div>

      {/* Cards - Mobile com animações */}
      <div className="md:hidden flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {paginatedData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <Card 
                onClick={() => onNavigate('edicao', item.id)}
                className="cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex gap-4">
                  <motion.img 
                    src={item.foto} 
                    alt={item.nome}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border border-[#E5E7EB]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#111827] mb-1 truncate">
                      {item.nome}
                    </h4>
                    <p className="text-sm text-[#6B7280] mb-2">
                      {item.categoria} • {item.codigo}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#9CA3AF]">Quantidade</p>
                        <p className="font-medium text-[#111827]">{item.quantidade}</p>
                      </div>
                      <div>
                        {getStatusBadge(item.quantidade, item.minimo)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">{item.local}</span>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('edicao', item.id);
                      }}
                      className="p-2 text-[#3B82F6] hover:bg-[#EFF6FF] rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.warning('Tem certeza que deseja excluir?', {
                          description: `O item "${item.nome}" será removido permanentemente.`,
                          action: {
                            label: 'Excluir',
                            onClick: () => {
                              deleteMaterial(item.id);
                              toast.success('Item excluído com sucesso!');
                            },
                          },
                          cancel: {
                            label: 'Cancelar',
                            onClick: () => {},
                          },
                        });
                      }}
                      className="p-2 text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Paginação com animação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#6B7280] text-center sm:text-left">
              Mostrando <span className="font-medium text-[#111827]">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)}-{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> de{' '}
              <span className="font-medium text-[#111827]">{filteredData.length}</span> itens
              {filteredData.length !== mockData.length && (
                <span className="text-[#9CA3AF]"> (filtrado de {mockData.length})</span>
              )}
            </p>
            
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  // Mostrar no máximo 5 páginas
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <motion.button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`
                        w-9 h-9 rounded-lg text-sm font-medium transition-colors
                        ${currentPage === pageNum
                          ? 'bg-[#3B82F6] text-white shadow-md'
                          : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                        }
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {pageNum}
                    </motion.button>
                  );
                })}
              </div>
              
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}