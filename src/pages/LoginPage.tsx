import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { LogIn, Mail, Lock, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center p-6">
      <div className="w-full max-w-[540px] animate-slide-up">
        {/* Logo e título com melhor espaçamento */}
        <div className="text-center mb-10">
          <div className="inline-flex w-20 h-20 bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] rounded-2xl items-center justify-center mb-6 shadow-lg">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#111827] mb-3">
            {isSignUp ? 'Criar Conta' : 'Estoque TI'}
          </h1>
          <p className="text-[#6B7280] text-[15px]">
            {isSignUp 
              ? 'Preencha os dados para criar sua conta' 
              : 'Faça login para gerenciar seu estoque'
            }
          </p>
        </div>

        {/* Card de login/cadastro com melhor visual - MAIOR */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] px-14 py-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {isSignUp && (
              <Input
                label="Nome completo"
                type="text"
                placeholder="Digite seu nome"
                icon={<User className="w-5 h-5" />}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            )}

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5" />}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {isSignUp && (
              <Input
                label="Confirmar senha"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5" />}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#6B7280] cursor-pointer hover:text-[#374151] transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#D1D5DB] text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] focus:ring-opacity-20" />
                  Lembrar-me
                </label>
                <button 
                  type="button"
                  className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <Button type="submit" fullWidth size="lg" className="mt-2">
              {isSignUp ? 'Criar conta' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[15px] text-[#6B7280] hover:text-[#374151] transition-colors"
            >
              {isSignUp ? 'Já tem uma conta? ' : 'Não tem uma conta? '}
              <span className="text-[#3B82F6] hover:text-[#2563EB] font-semibold">
                {isSignUp ? 'Fazer login' : 'Criar conta'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#6B7280] mt-8">
          © 2025 Estoque TI. Sistema de gerenciamento de materiais.
        </p>
      </div>
    </div>
  );
}