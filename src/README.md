# Sistema de Gerenciamento de Estoque TI

Sistema completo e profissional para gerenciamento de estoque de materiais de TI, desenvolvido com React e Tailwind CSS.

## 🎨 Design System

### Princípios de Design

- **Sistema de espaçamento**: Escala de 8px (4px para textos)
- **Grid responsivo**: 
  - Desktop (≥1024px): 12 colunas, gutter 24px
  - Tablet: 8 colunas
  - Mobile: 4 colunas, margin 16px
- **Cores principais**:
  - Azul tecnológico: #1E40AF / #3B82F6
  - Tons neutros: #F9FAFB → #111827
- **Border radius**: 8px padrão
- **Tipografia**: Inter, escala 12/14/16/20/24/32px

### Z-index Tokens
- Header: 900
- Sidebar: 850
- Modal: 1000
- Tooltip: 1100

## 📦 Componentes Reutilizáveis

Todos os componentes seguem Auto Layout e são totalmente responsivos:

### Inputs
- **Button**: Variants (primary, secondary, ghost, danger) + States (default, hover, disabled)
- **Input**: Label + campo + helper/error, altura 44px
- **Select**: Dropdown com variants
- **Textarea**: Campo de texto multilinha

### Containers
- **Card**: Padding 16px, variants (default, info, success, warning, error)
- **Modal**: Max-width 720px, overlay escuro, scroll interno
- **Table**: Altura mínima 56px por linha, min-width por coluna

### Navegação
- **Header**: Fixo, 64px de altura
- **Sidebar**: 256px, responsiva com drawer no mobile
- **Badge**: Indicadores de status

## 📱 Telas Implementadas

### 1. Login & Cadastro
- Layout centralizado (380-420px)
- Campos: email, senha, nome (cadastro)
- Validação em tempo real
- Link "Esqueceu a senha"

### 2. Dashboard
- 4 cards de estatísticas
- Gráfico de movimentações por categoria
- Lista de movimentações recentes
- Alertas de estoque baixo
- Atalhos rápidos

### 3. Cadastro de Materiais
- Formulário em seções:
  - Informações Básicas
  - Identificação (nº série, patrimônio)
  - Estoque e Localização
  - Fornecedor e Aquisição
  - Upload de foto
- Grid 2 colunas (desktop), 1 coluna (mobile)
- Validação de campos obrigatórios

### 4. Consulta/Listagem
- Tabela completa com:
  - Foto, Nome, Categoria, Código, Quantidade, Status, Local, Ações
- Barra de busca
- Filtro por categoria
- Paginação
- Modo responsivo: tabela → cards no mobile

### 5. Edição de Item
- Mesmo layout do cadastro (pré-preenchido)
- Botão "Excluir" com modal de confirmação
- Painel lateral com histórico de movimentações
- Grid: 2 colunas (form) + 1 coluna (histórico)

### 6. Movimentação de Estoque
- Seleção de tipo: Entrada/Saída
- Campos: item, quantidade, motivo, data, observações
- Painel lateral com resumo do item
- Alertas de quantidade insuficiente
- Validação em tempo real

### 7. Alertas de Estoque
- Cards de estatísticas (Críticos/Alerta/Atenção)
- Lista de itens abaixo do mínimo
- Badge colorido por nível de criticidade
- Botão "Reposição Rápida"
- Barra de progresso visual

### 8. Relatórios
- Filtros: período, categoria, tipo
- Cards com totais
- Gráficos:
  - Movimentações por categoria
  - Top 5 itens mais movimentados
  - Movimentações no período
- Exportação: PDF, CSV, Excel

### 9. Configurações
- Perfil: foto, nome, email, cargo, telefone
- Segurança: alterar senha
- Notificações: preferências de e-mail e push
- Tema: modo claro/escuro
- Botão de logout

## 🎯 Regras de Design Aplicadas

### ✅ Nada Sobreposto
- Todos os layouts usam Auto Layout
- Min-width definida para colunas de tabela
- Espaço reservado para mensagens de erro (min-height: 20px)
- Modais com overflow interno
- Sem posicionamento absoluto desnecessário

### ✅ Responsividade Total
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (≥1024px)
- Grid adaptativo por dispositivo
- Tabelas viram cards no mobile
- Sidebar vira drawer no mobile
- Formulários empilham verticalmente

### ✅ Estados Interativos
- Hover states em botões, cards, linhas de tabela
- Focus states com ring azul
- Disabled states com opacidade reduzida
- Loading states em botões
- Skeleton loaders (preparado para implementação)

### ✅ Acessibilidade
- Labels para todos os inputs
- Estados de foco visíveis
- Contraste adequado de cores
- Áreas de clique adequadas (min 44px)
- Mensagens de erro descritivas

## 🚀 Tecnologias

- **React 18**: Componentes funcionais com hooks
- **Tailwind CSS 4.0**: Estilização utility-first
- **Lucide React**: Ícones consistentes
- **TypeScript**: Tipagem estática (ready)

## 📊 Dados Mockados

O sistema utiliza dados mockados para demonstração:
- 8 itens de estoque
- Histórico de movimentações
- Estatísticas e gráficos
- Notificações e alertas

## 🎨 Tokens CSS Customizados

Todas as cores, espaçamentos e outros tokens estão definidos em `/styles/globals.css` como variáveis CSS:

```css
--color-primary-500: #3B82F6
--spacing-3: 16px
--radius-md: 8px
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
```

## 📱 Grid System

### Desktop (≥1024px)
- Container max-width: 1200px
- 12 colunas
- Gutter: 24px
- Margin: 24-32px

### Tablet (768-1024px)
- 8 colunas
- Sidebar colapsada ou reduzida
- Cards em 6 colunas

### Mobile (<768px)
- 4 colunas
- Margin: 16px
- Stack vertical
- Drawer lateral

## 🎯 Próximos Passos Sugeridos

1. **Backend Integration**: Conectar com API REST
2. **Autenticação Real**: JWT tokens, refresh tokens
3. **Upload de Arquivos**: Implementar upload real de imagens
4. **Gráficos Avançados**: Integrar Recharts para gráficos interativos
5. **Filtros Avançados**: Múltiplos filtros simultâneos
6. **Exportação Real**: Gerar PDFs e CSVs reais
7. **Notificações Push**: Implementar WebSockets
8. **Histórico Completo**: Auditoria detalhada
9. **Permissões**: Controle de acesso por usuário
10. **Dark Mode**: Implementar tema escuro completo

## 📄 Licença

Sistema desenvolvido para demonstração de capacidades de design e desenvolvimento frontend.
