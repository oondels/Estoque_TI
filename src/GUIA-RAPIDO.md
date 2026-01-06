# 🚀 Guia Rápido - Sistema de Estoque TI

## ▶️ Início Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Abrir navegador em
http://localhost:5173
```

---

## 📝 Testando Todas as Funcionalidades

### 1️⃣ LOGIN
- **Usuário**: admin@estoque.com
- **Senha**: 123456
- Clique em "Entrar no Sistema"

### 2️⃣ DASHBOARD
✅ O que você verá:
- **4 KPIs** com dados reais:
  - Total de Itens (soma de todos os materiais)
  - Abaixo do Mínimo (contador automático)
  - Movimentações do Mês (últimos 30 dias)
  - Valor Total (calculado em tempo real)
- **Movimentações Recentes**: Últimas 5 movimentações
- **Gráfico por Categoria**: Barras animadas com dados reais
- **Alerta**: Aparece se houver itens críticos

🔧 O que testar:
- Clique nos atalhos "Cadastrar Material", "Consultar Itens", "Relatórios"
- Observe os números mudarem conforme você cadastra ou move materiais

---

### 3️⃣ CADASTRAR MATERIAL

📍 **Menu > Cadastrar Material**

✅ Como testar:
1. Preencha os campos obrigatórios (*)
2. Faça upload de uma imagem (opcional)
3. Clique em "Salvar Material"
4. ✨ **Veja o toast de sucesso aparecer**
5. O material será adicionado à listagem automaticamente

🎯 Campos importantes:
- **Nome**: Ex: "Mouse Gamer RGB"
- **Categoria**: Escolha uma (ex: Periféricos)
- **Código**: Deixe vazio para gerar automático
- **Local**: Onde fica armazenado
- **Quantidade Atual**: Ex: 50
- **Quantidade Mínima**: Ex: 10 (para alertas)
- **Valor**: Ex: 150.00

---

### 4️⃣ CONSULTAR ITENS

📍 **Menu > Consultar Itens**

✅ **FILTROS FUNCIONAIS** (teste todos!):

#### Busca por Texto
- Digite "Notebook" → Filtra apenas notebooks
- Digite "MON-001" → Busca por código
- Digite "Almoxarifado" → Busca por local

#### Filtro por Categoria
- Selecione "Notebooks" → Mostra apenas notebooks
- Selecione "Periféricos" → Mostra apenas periféricos

#### Filtro por Status
- "Em Estoque" → Materiais OK
- "Abaixo do Mínimo" → Materiais críticos
- "Sem Estoque" → Materiais esgotados

#### Limpar Filtros
- Clique em "Limpar Filtros" → Reseta tudo

✅ **EXPORTAÇÃO** (teste os 3 formatos!):

1. **Exportar PDF**
   - Clique no botão "PDF"
   - ✨ Arquivo será baixado automaticamente
   - Nome: `Listagem_Materiais_2025-12-26.pdf`
   - Tabela formatada com cabeçalho e logo

2. **Exportar CSV**
   - Clique no botão "CSV"
   - Abre no Excel/Google Sheets
   - Encoding UTF-8

3. **Exportar Excel**
   - Clique no botão "Excel"
   - Arquivo .xls nativo
   - Abre direto no Microsoft Excel

💡 **Dica**: A exportação considera apenas os itens FILTRADOS!

✅ **AÇÕES**:
- **Ver** 👁️: Visualiza detalhes (em desenvolvimento)
- **Editar** ✏️: Edita o material (em desenvolvimento)
- **Excluir** 🗑️: Remove permanentemente (pede confirmação)

---

### 5️⃣ MOVIMENTAÇÃO DE ESTOQUE

📍 **Menu > Movimentação**

✅ **REGISTRAR MOVIMENTAÇÃO**:

#### Entrada (adicionar ao estoque)
1. Selecione "Entrada"
2. Escolha um material (mostra estoque atual)
3. Digite quantidade: Ex: 20
4. Responsável: Ex: "João Silva"
5. Data: Hoje
6. Observações: "Compra mensal"
7. Clique "Registrar Movimentação"
8. ✨ **Estoque é atualizado AUTOMATICAMENTE**

#### Saída (retirar do estoque)
1. Selecione "Saída"
2. Escolha um material
3. Digite quantidade: Ex: 5
4. ⚠️ **Não permite saída maior que estoque!**
5. Responsável: Ex: "Maria Santos"
6. Observações: "Alocação equipe vendas"
7. Clique "Registrar Movimentação"
8. ✨ **Estoque é atualizado AUTOMATICAMENTE**

✅ **HISTÓRICO COM FILTROS**:

#### Busca
- Digite nome do material ou responsável

#### Filtro por Data
- **Data Início**: Ex: 01/12/2025
- **Data Fim**: Ex: 31/12/2025
- Mostra apenas movimentações neste período

#### Filtro por Tipo
- "Entrada" → Apenas entradas
- "Saída" → Apenas saídas
- "Todos" → Tudo

#### Limpar Filtros
- Reseta tudo para ver histórico completo

🎯 **Resultado**: Tabela ordenada (mais recente primeiro)

---

### 6️⃣ ALERTAS

📍 **Menu > Alertas**

✅ O que você verá:

#### Card Vermelho - SEM ESTOQUE
- Materiais com quantidade = 0
- Criticidade ALTA
- Precisa reposição URGENTE

#### Card Amarelo - ABAIXO DO MÍNIMO
- Materiais com quantidade < mínimo
- Precisa reposição
- Estoque: X / Mínimo: Y

#### Card Verde - TUDO OK
- Aparece quando não há alertas
- Mensagem de sucesso

🎯 **Teste**: Faça uma saída que zere o estoque de um material e veja o alerta aparecer!

---

### 7️⃣ RELATÓRIOS (A PÁGINA MAIS COMPLETA!)

📍 **Menu > Relatórios**

✅ **FILTROS AVANÇADOS**:

#### Configurar Período
1. **Data Início**: Ex: 01/12/2025
2. **Data Fim**: Ex: 26/12/2025
3. **Categoria**: Escolha específica ou "Todas"
4. **Tipo**: Entrada, Saída ou Todos

#### Atalhos Rápidos
- **Últimos 7 dias** → Aplica automaticamente
- **Últimos 30 dias** → Aplica automaticamente
- **Últimos 90 dias** → Aplica automaticamente
- **Limpar Filtros** → Reseta tudo

#### Contador de Resultados
- Mostra: "X materiais • Y movimentações"
- Atualiza em tempo real

---

✅ **4 TIPOS DE RELATÓRIOS**:

### 📄 1. Relatório de Estoque Completo
**O que contém**:
- Nome, Categoria, Código
- Quantidade, Mínimo, Local
- Fornecedor, Valor Unitário
- Valor Total, Status

**Como exportar**:
1. Clique em "Exportar PDF" / "CSV" / "Excel"
2. Arquivo baixa automaticamente
3. Nome: `Estoque_Completo_2025-12-26.pdf`

**Teste**:
- Configure filtro de categoria
- Exporte → Veja que só exporta a categoria selecionada!

---

### 📊 2. Relatório de Movimentações
**O que contém**:
- Data, Tipo (Entrada/Saída)
- Material, Código, Categoria
- Quantidade, Responsável
- Valor, Observações

**Como exportar**:
1. Configure período (ex: últimos 7 dias)
2. Escolha tipo (ex: apenas Entradas)
3. Clique em "Exportar PDF" / "CSV" / "Excel"
4. Arquivo baixa com movimentações FILTRADAS

**Teste**:
- Filtre "Últimos 7 dias" + "Entrada"
- Exporte → Veja só entradas dos últimos 7 dias!

---

### 💰 3. Relatório Financeiro
**O que contém**:
- Categoria, Nome
- Quantidade
- Valor Unitário
- **Valor Total** (quantidade × valor)

**Como exportar**:
1. Clique em "Exportar PDF" / "CSV" / "Excel"
2. Perfeito para análise de custos!

**Teste**:
- Exporte e veja o valor total do seu estoque

---

### 📋 4. Relatório Completo do Sistema
**O que contém**:
- **RESUMO GERAL**:
  - Total de Itens
  - Valor Total
  - Abaixo do Mínimo
  - Sem Estoque
  - Total de Categorias
  - Total de Materiais
- **MOVIMENTAÇÕES**:
  - Total de Entradas
  - Total de Saídas
  - Saldo (Entradas - Saídas)

**Como exportar**:
1. Clique em "Baixar PDF Completo" / "CSV" / "Excel"
2. Relatório CONSOLIDADO de tudo!

**Teste**:
- Exporte e tenha uma visão 360° do sistema

---

### 8️⃣ CONFIGURAÇÕES

📍 **Menu > Configurações**

✅ O que você pode fazer:

#### Dados do Usuário
- Editar nome, email, telefone
- Clique em "Salvar Configurações"

#### Notificações
- ☑️ Notificações por E-mail
- ☑️ Alertas de Estoque Mínimo
- ☑️ Relatório de Movimentações
- **Checkboxes funcionam!** Marcam/desmarcam

#### Segurança
- Alterar Senha
- Autenticação em Dois Fatores

---

## 🎯 Fluxo Completo de Teste (5 minutos)

### Passo a Passo:

1. **LOGIN** → Entre no sistema

2. **DASHBOARD** → Veja os KPIs (ex: 103 itens, 2 abaixo do mínimo)

3. **CADASTRAR** → Adicione um novo material
   - Nome: "Webcam Logitech C920"
   - Categoria: Periféricos
   - Quantidade: 15
   - Mínimo: 5
   - Valor: 350.00
   - 💾 Salvar

4. **LISTAR** → Veja o material aparecer na listagem
   - Busque por "Webcam"
   - Exporte em PDF
   - Abra o PDF e veja!

5. **MOVIMENTAR** → Faça uma saída
   - Tipo: Saída
   - Material: Webcam Logitech C920
   - Quantidade: 3
   - Responsável: Seu nome
   - 📋 Registrar
   - ✨ Estoque atualiza de 15 para 12!

6. **DASHBOARD NOVAMENTE** → Veja os números mudarem
   - Total de itens aumentou
   - Movimentações do mês aumentou

7. **RELATÓRIOS** → Exporte tudo
   - Configure "Últimos 7 dias"
   - Exporte Movimentações em PDF
   - Veja sua movimentação de Webcam lá!

8. **ALERTAS** → Simule um alerta
   - Volte em Movimentação
   - Faça saída de 12 unidades da Webcam
   - Estoque zera!
   - Vá em Alertas → Veja aparecer em "SEM ESTOQUE"

---

## 💡 Dicas Pro

### Exportações
- ✅ PDFs ficam com formatação profissional
- ✅ CSVs abrem no Excel sem problemas
- ✅ Nomes de arquivo incluem data automaticamente

### Filtros
- ✅ Todos os filtros funcionam em conjunto
- ✅ Use "Limpar Filtros" quando precisar resetar
- ✅ Contador mostra resultados em tempo real

### Dados
- ✅ Tudo está sincronizado via Pinia
- ✅ Dados persistem durante navegação
- ✅ Atualização automática em todas as telas

### Validações
- ✅ Não permite saída maior que estoque
- ✅ Campos obrigatórios têm validação
- ✅ Confirmação antes de excluir

---

## 🐛 Troubleshooting

### Problema: "Nenhum material encontrado"
**Solução**: Clique em "Limpar Filtros" na busca

### Problema: "Exportação não funciona"
**Solução**: Verifique se instalou as dependências (`npm install`)

### Problema: "Dados não aparecem"
**Solução**: Recarregue a página (F5)

---

## ✨ Funcionalidades Escondidas

1. **Animações**: Todos os elementos têm animações suaves
2. **Hover States**: Passe o mouse nos cards e botões
3. **Toast Notifications**: Cada ação mostra feedback visual
4. **Responsivo**: Teste redimensionando o navegador
5. **Dark Hover**: Botões ficam mais escuros ao passar o mouse

---

## 🎉 Pronto para Usar!

Agora você sabe usar TODAS as funcionalidades do sistema.

**Lembre-se**: Tudo está funcionando de verdade!
- Filtros aplicam mudanças reais
- Exportações geram arquivos reais
- Dados são salvos no store
- Cálculos são automáticos

**Divirta-se testando! 🚀**
