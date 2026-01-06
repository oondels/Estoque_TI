import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { 
  User, 
  Mail, 
  Lock, 
  Upload, 
  Save, 
  LogOut,
  Moon,
  Sun,
  Bell,
  Shield
} from 'lucide-react';

interface ConfiguracoesPageProps {
  onLogout: () => void;
}

export function ConfiguracoesPage({ onLogout }: ConfiguracoesPageProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: 'João Silva',
    email: 'joao.silva@empresa.com',
    cargo: 'Gerente de TI',
    telefone: '(11) 98765-4321',
  });

  const [alterarSenha, setAlterarSenha] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: '',
  });

  const [notificacoes, setNotificacoes] = useState({
    emailAlertas: true,
    emailMovimentacoes: false,
    emailRelatorios: true,
    pushAlertas: true,
  });

  const [avatarPreview] = useState('https://ui-avatars.com/api/?name=Joao+Silva&background=3B82F6&color=fff&size=128');

  const handleSalvarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Perfil atualizado com sucesso!');
  };

  const handleAlterarSenha = (e: React.FormEvent) => {
    e.preventDefault();
    if (alterarSenha.novaSenha !== alterarSenha.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Senha alterada com sucesso!');
    setAlterarSenha({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Configurações</h1>
        <p className="text-[#6B7280]">Gerencie suas preferências e informações pessoais</p>
      </div>

      {/* Perfil */}
      <Card>
        <h3 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Perfil
        </h3>
        
        <form onSubmit={handleSalvarPerfil}>
          <div className="flex flex-col gap-6">
            {/* Foto do Perfil */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <img 
                src={avatarPreview}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-[#E5E7EB]"
              />
              <div className="flex flex-col gap-2">
                <p className="text-sm text-[#6B7280]">Foto do perfil</p>
                <Button variant="secondary" size="sm" type="button">
                  <Upload className="w-4 h-4" />
                  Alterar Foto
                </Button>
                <p className="text-xs text-[#9CA3AF]">JPG, PNG até 2MB</p>
              </div>
            </div>

            {/* Dados Pessoais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome Completo"
                icon={<User className="w-5 h-5" />}
                value={dadosPessoais.nome}
                onChange={(e) => setDadosPessoais({ ...dadosPessoais, nome: e.target.value })}
              />

              <Input
                label="E-mail"
                type="email"
                icon={<Mail className="w-5 h-5" />}
                value={dadosPessoais.email}
                onChange={(e) => setDadosPessoais({ ...dadosPessoais, email: e.target.value })}
              />

              <Input
                label="Cargo"
                value={dadosPessoais.cargo}
                onChange={(e) => setDadosPessoais({ ...dadosPessoais, cargo: e.target.value })}
              />

              <Input
                label="Telefone"
                type="tel"
                value={dadosPessoais.telefone}
                onChange={(e) => setDadosPessoais({ ...dadosPessoais, telefone: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <Save className="w-4 h-4" />
                Salvar Perfil
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Segurança */}
      <Card>
        <h3 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Segurança
        </h3>
        
        <form onSubmit={handleAlterarSenha}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Senha Atual"
                  type="password"
                  icon={<Lock className="w-5 h-5" />}
                  placeholder="••••••••"
                  value={alterarSenha.senhaAtual}
                  onChange={(e) => setAlterarSenha({ ...alterarSenha, senhaAtual: e.target.value })}
                />
              </div>

              <Input
                label="Nova Senha"
                type="password"
                icon={<Lock className="w-5 h-5" />}
                placeholder="••••••••"
                value={alterarSenha.novaSenha}
                onChange={(e) => setAlterarSenha({ ...alterarSenha, novaSenha: e.target.value })}
                helper="Mínimo de 8 caracteres"
              />

              <Input
                label="Confirmar Nova Senha"
                type="password"
                icon={<Lock className="w-5 h-5" />}
                placeholder="••••••••"
                value={alterarSenha.confirmarSenha}
                onChange={(e) => setAlterarSenha({ ...alterarSenha, confirmarSenha: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <Save className="w-4 h-4" />
                Alterar Senha
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Notificações */}
      <Card>
        <h3 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notificações
        </h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
            <div>
              <p className="font-medium text-[#111827]">Alertas de estoque por e-mail</p>
              <p className="text-sm text-[#6B7280]">Receber notificações quando itens atingirem o mínimo</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificacoes.emailAlertas}
                onChange={(e) => setNotificacoes({ ...notificacoes, emailAlertas: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E5E7EB] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
            <div>
              <p className="font-medium text-[#111827]">Movimentações por e-mail</p>
              <p className="text-sm text-[#6B7280]">Receber resumo diário de movimentações</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificacoes.emailMovimentacoes}
                onChange={(e) => setNotificacoes({ ...notificacoes, emailMovimentacoes: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E5E7EB] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
            <div>
              <p className="font-medium text-[#111827]">Relatórios por e-mail</p>
              <p className="text-sm text-[#6B7280]">Receber relatórios mensais automaticamente</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificacoes.emailRelatorios}
                onChange={(e) => setNotificacoes({ ...notificacoes, emailRelatorios: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E5E7EB] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-[#111827]">Notificações push</p>
              <p className="text-sm text-[#6B7280]">Receber notificações no navegador</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificacoes.pushAlertas}
                onChange={(e) => setNotificacoes({ ...notificacoes, pushAlertas: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E5E7EB] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Preferências */}
      <Card>
        <h3 className="font-semibold text-[#111827] mb-4">Preferências</h3>
        
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon className="w-5 h-5 text-[#6B7280]" /> : <Sun className="w-5 h-5 text-[#6B7280]" />}
            <div>
              <p className="font-medium text-[#111827]">Modo Escuro</p>
              <p className="text-sm text-[#6B7280]">Ativar tema escuro na interface</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={(e) => setIsDarkMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E5E7EB] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
          </label>
        </div>
      </Card>

      {/* Sair */}
      <Card variant="error">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <LogOut className="w-6 h-6 text-[#EF4444] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-[#111827] mb-1">Sair da Conta</h4>
              <p className="text-sm text-[#6B7280]">
                Encerrar sessão e voltar para a tela de login
              </p>
            </div>
          </div>
          <Button 
            variant="danger"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </Card>

      {/* Modal de Confirmação de Logout */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirmar Saída"
        maxWidth="sm"
        footer={
          <>
            <Button 
              variant="secondary"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="danger"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Sair da Conta
            </Button>
          </>
        }
      >
        <p className="text-[#374151]">
          Tem certeza que deseja sair? Você precisará fazer login novamente para acessar o sistema.
        </p>
      </Modal>
    </div>
  );
}
