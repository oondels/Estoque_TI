# 🚀 Sistema de Estoque TI - Vue.js 3

Sistema completo de gerenciamento de estoque de materiais de TI desenvolvido com **Vue.js 3**, **TypeScript**, **Pinia**, **Tailwind CSS** e **Vite**.

## ✨ Características

- ⚡ **Vue 3** com Composition API e `<script setup>`
- 🎨 **Design System** moderno com Tailwind CSS 4.0
- 📊 **Gerenciamento de Estado** com Pinia
- 🎭 **Animações** suaves com @vueuse/motion
- 🔔 **Notificações** elegantes com Sonner Vue
- 📱 **Responsivo** para desktop, tablet e mobile
- 🎯 **TypeScript** para type safety completo
- 🚀 **Vite** para desenvolvimento super rápido

## 🏗️ Estrutura do Projeto

```
├── components/          # Componentes reutilizáveis
│   ├── Badge.vue
│   ├── Button.vue
│   ├── Card.vue
│   ├── Header.vue
│   ├── Input.vue
│   ├── Select.vue
│   ├── Sidebar.vue
│   └── Textarea.vue
│
├── pages/              # Páginas da aplicação
│   ├── DashboardPage.vue
│   ├── CadastroPage.vue
│   ├── ListagemPage.vue
│   ├── MovimentacaoPage.vue
│   ├── AlertasPage.vue
│   ├── RelatoriosPage.vue
│   ├── ConfiguracoesPage.vue
│   └── LoginPage.vue
│
├── stores/             # Gerenciamento de estado (Pinia)
│   └── materialStore.ts
│
├── styles/             # Estilos globais
│   └── globals.css
│
├── App.vue             # Componente raiz
├── main.ts             # Ponto de entrada
└── index.html          # HTML template
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# ou com yarn
yarn install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# ou com yarn
yarn dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# ou com yarn
yarn build
```

### Preview da Build

```bash
# Visualizar build de produção
npm run preview

# ou com yarn
yarn preview
```

## 📦 Dependências Principais

- **vue**: ^3.4.0 - Framework progressivo
- **pinia**: ^2.1.7 - Gerenciamento de estado oficial
- **@vueuse/motion**: ^2.0.0 - Biblioteca de animações
- **lucide-vue-next**: ^0.294.0 - Ícones modernos
- **sonner-vue**: ^0.4.0 - Sistema de notificações

## 🎨 Design System

O projeto segue um design system rigoroso com:

- **Espaçamento**: Sistema de 8px
- **Grid**: Responsivo (12/8/4 colunas)
- **Cores**: Azul tecnológico (#2563EB/#1E40AF)
- **Tipografia**: Inter font family
- **Componentes**: Variants e estados bem definidos
- **Border Radius**: 12-16px para modernidade
- **Sombras**: Soft e difusas para profundidade

## 🎯 Funcionalidades

### Dashboard
- KPIs em tempo real com dados dinâmicos
- Gráficos de movimentações por categoria (dados reais)
- Alertas de estoque automáticos
- Atalhos rápidos para navegação
- Movimentações recentes dos últimos 7 dias

### Cadastro de Materiais
- Formulário completo com validação
- Upload de imagens com preview
- Categorização por tipo
- Informações detalhadas (fornecedor, valor, local)
- Integração com o store Pinia (dados persistem)

### Listagem de Itens
- Tabela responsiva (desktop) com todas as colunas
- Cards adaptados (mobile)
- **Filtros Funcionais**:
  - Busca por texto (nome, categoria, código, local)
  - Filtro por categoria (dropdown dinâmico)
  - Filtro por status (OK, Abaixo do Mínimo, Sem Estoque)
  - Contador de resultados filtrados
- **Exportação Real**:
  - PDF com formatação profissional (jsPDF + autotable)
  - CSV compatível com Excel (UTF-8)
  - Excel nativo (.xls)
  - Exporta apenas itens filtrados
- Ações: Ver, Editar, Excluir
- Confirmação antes de excluir

### Movimentação
- Registro de entradas e saídas
- **Validações**:
  - Não permite saída maior que estoque
  - Atualização automática do estoque
- **Histórico Completo com Filtros**:
  - Busca por material ou responsável
  - Filtro por data (início e fim)
  - Filtro por tipo (entrada/saída/todos)
  - Ordenação por data (mais recente primeiro)
- Cálculo automático de valores
- Integração com materialStore (atualiza estoque)

### Alertas
- **Categorização Automática**:
  - Materiais sem estoque (quantidade = 0)
  - Materiais abaixo do mínimo (quantidade < mínimo)
  - Mensagem quando tudo está OK
- Cards visuais por criticidade
- Contadores dinâmicos
- Navegação rápida

### Relatórios
- **Filtros Avançados**:
  - Data início e data fim
  - Categoria específica
  - Tipo de movimentação
  - Atalhos rápidos (7, 30, 90 dias)
  - Botão limpar filtros
  - Contador de resultados
- **4 Tipos de Relatórios**:
  1. **Estoque Completo**: Todos os materiais com valores
  2. **Movimentações**: Histórico filtrado de entradas/saídas
  3. **Financeiro**: Análise de custos e valores totais
  4. **Completo do Sistema**: Resumo consolidado de tudo
- **Exportação em 3 Formatos**:
  - PDF: Tabelas formatadas com cabeçalho e logo
  - CSV: Formato universal, UTF-8
  - Excel: Arquivo .xls nativo
- Nome de arquivo automático com data
- Download direto no navegador

### Configurações
- Perfil do usuário (nome, email, telefone)
- Preferências de notificações (checkboxes funcionais)
- Segurança (senha, 2FA)
- Botão salvar alterações

## 🔄 Migração de React para Vue

Este projeto foi completamente convertido de React para Vue.js 3 mantendo:

✅ Toda a funcionalidade original  
✅ Design visual idêntico  
✅ Animações e transições  
✅ Responsividade  
✅ Gerenciamento de estado  

### Mudanças Principais

| React | Vue 3 |
|-------|-------|
| Context API | Pinia Store |
| useState | ref/reactive |
| useEffect | watch/watchEffect |
| Framer Motion | @vueuse/motion |
| JSX | Template Syntax |
| Props spreading | v-bind |
| Sonner (React) | Sonner Vue |

## 📝 Convenções de Código

- **Composition API** com `<script setup>`
- **TypeScript** para tipagem forte
- **PascalCase** para componentes
- **camelCase** para variáveis e funções
- **Props** com interface TypeScript
- **Emits** tipados com defineEmits

## 🎨 Customização

### Cores Primárias

Edite `/styles/globals.css`:

```css
:root {
  --primary-500: #2563EB;  /* Azul principal */
  --primary-600: #1D4ED8;  /* Azul hover */
}
```

### Componentes

Todos os componentes são independentes e podem ser customizados individualmente em `/components/`.

## 📱 Responsividade

- **Mobile First**: Design otimizado para mobile
- **Breakpoints**: sm, md, lg, xl
- **Grid System**: Adapta colunas automaticamente
- **Tabelas**: Transformam em cards no mobile

## 🔐 Segurança

- Validação de formulários
- Type safety com TypeScript
- Sanitização de inputs
- Proteção de rotas (placeholder)

## 🚀 Performance

- **Vite**: Build ultra-rápido
- **Code Splitting**: Carregamento sob demanda
- **Tree Shaking**: Bundle otimizado
- **Lazy Loading**: Componentes sob demanda

## 📄 Licença

Este projeto é um sistema de demonstração educacional.

## 👨‍💻 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com Vue.js 3 + TypeScript + Tailwind CSS** 💚