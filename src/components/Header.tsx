import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  userName?: string;
}

export function Header({ onMenuClick, userName = 'Usuário' }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl border-b border-[#E5E7EB]/60 z-[900] shadow-[0_1px_2px_0_rgb(0_0_0_/_0.03),_0_1px_3px_0_rgb(0_0_0_/_0.04)]">
      <div className="h-full px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Left - Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 text-[#374151] hover:bg-[#F1F3F5] rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] rounded-xl shadow-sm flex items-center justify-center">
              <div className="w-6 h-6 bg-white/20 rounded-lg"></div>
            </div>
            <span className="hidden sm:block text-lg font-bold bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent">
              Estoque TI
            </span>
          </div>
        </div>
        
        {/* Right - Notificações + User */}
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 text-[#6B7280] hover:text-[#111827] hover:bg-[#F1F3F5] rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white animate-pulse" />
          </button>
          
          <div className="flex items-center gap-3 pl-3 ml-3 border-l border-[#E5E7EB]">
            <div className="w-9 h-9 bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="hidden md:block text-[15px] font-medium text-[#374151]">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}