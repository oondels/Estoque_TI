import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ListChecks, 
  ArrowDownUp, 
  AlertTriangle, 
  FileText, 
  Settings,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'cadastro', label: 'Cadastrar Material', icon: Package },
  { id: 'listagem', label: 'Consultar Itens', icon: ListChecks },
  { id: 'movimentacao', label: 'Movimentação', icon: ArrowDownUp },
  { id: 'alertas', label: 'Alertas', icon: AlertTriangle },
  { id: 'relatorios', label: 'Relatórios', icon: FileText },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar({ isOpen, onClose, currentPage, onNavigate, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 z-[840] animate-fade-in backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 bg-white border-r border-[#E5E7EB]/60 z-[850] 
          shadow-[0_4px_6px_-2px_rgb(0_0_0_/_0.05),_0_10px_15px_-3px_rgb(0_0_0_/_0.08)]
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'w-72'}
        `}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Header mobile */}
          <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
            <span className="text-lg font-bold text-[#111827]">Menu</span>
            <button
              onClick={onClose}
              className="p-2 text-[#6B7280] hover:bg-white hover:text-[#111827] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Botão de colapsar - Desktop only */}
          {onToggleCollapse && (
            <div className="hidden lg:flex items-center justify-end px-4 py-3 border-b border-[#E5E7EB]">
              <button
                onClick={onToggleCollapse}
                className="p-2 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] rounded-lg transition-colors"
                title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
              >
                {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
            </div>
          )}
          
          {/* Menu items */}
          <nav className="flex-1 p-4">
            <ul className="flex flex-col gap-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      className={`
                        w-full flex items-center rounded-xl
                        transition-all duration-200 text-left font-medium
                        ${isCollapsed ? 'justify-center px-3 py-3.5' : 'gap-3 px-4 py-3.5'}
                        ${isActive 
                          ? 'bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] text-[#2563EB] shadow-sm' 
                          : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]'
                        }
                      `}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#3B82F6]' : ''}`} />
                      {!isCollapsed && <span className="text-[15px]">{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}