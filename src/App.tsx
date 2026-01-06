import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CadastroPage } from './pages/CadastroPage';
import { ListagemPage } from './pages/ListagemPage';
import { EdicaoPage } from './pages/EdicaoPage';
import { MovimentacaoPage } from './pages/MovimentacaoPage';
import { AlertasPage } from './pages/AlertasPage';
import { RelatoriosPage } from './pages/RelatoriosPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';
import { MaterialProvider } from './contexts/MaterialContext';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentItemId, setCurrentItemId] = useState<number | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    setSidebarOpen(false);
  };

  const handleNavigate = (page: string, itemId?: number) => {
    setCurrentPage(page);
    setCurrentItemId(itemId);
    setSidebarOpen(false);
  };

  // Renderizar página de login se não autenticado
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Renderizar página atual
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'cadastro':
        return <CadastroPage onNavigate={handleNavigate} />;
      case 'listagem':
        return <ListagemPage onNavigate={handleNavigate} />;
      case 'edicao':
        return <EdicaoPage onNavigate={handleNavigate} itemId={currentItemId} />;
      case 'movimentacao':
        return <MovimentacaoPage onNavigate={handleNavigate} />;
      case 'alertas':
        return <AlertasPage onNavigate={handleNavigate} />;
      case 'relatorios':
        return <RelatoriosPage onNavigate={handleNavigate} />;
      case 'configuracoes':
        return <ConfiguracoesPage onLogout={handleLogout} />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <MaterialProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#F3F4F6] to-[#F9FAFB]">
        <Toaster position="top-right" richColors closeButton />
        
        {/* Header */}
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          userName="João Silva"
        />

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content com animação de transição de página */}
        <main 
          className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}
        >
          <div className="container max-w-[1200px] py-8 lg:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </MaterialProvider>
  );
}