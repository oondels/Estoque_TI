# 🧪 TESTE AGORA - Relatórios REALMENTE Funcionais

## ⚠️ ANTES DE TESTAR

```bash
# 1. INSTALE AS DEPENDÊNCIAS (OBRIGATÓRIO!)
npm install

# Se der erro, tente:
npm install --force

# 2. INICIE O SERVIDOR
npm run dev

# 3. ABRA O NAVEGADOR
http://localhost:5173
```

---

## ✅ TESTE 1: FILTROS (30 segundos)

1. **Acesse Relatórios**
   - Menu lateral > Relatórios
   - ✅ Veja o resumo geral (Total de Itens, Valor, Movimentações)

2. **Clique "Últimos 7 dias"**
   - ✅ Toast aparece: "✓ Período de 7 dias selecionado"
   - ✅ Campos Data Início e Data Fim preenchem automaticamente
   - ✅ Contador atualiza (ex: "45 materiais • 12 movimentações")

3. **Clique "Limpar Filtros"**
   - ✅ Toast: "✓ Filtros limpos"
   - ✅ Campos voltam ao padrão
   - ✅ Contador mostra tudo novamente

**SE ISSO FUNCIONOU, OS FILTROS ESTÃO OK! ✅**

---

## ✅ TESTE 2: EXPORTAR CSV (1 minuto)

1. **Exportar Relatório de Estoque**
   - Role até "1. Relatório de Estoque"
   - Clique no botão "Exportar CSV"
   - ✅ Toast: "Gerando CSV..."
   - ✅ Arquivo baixa: `Estoque_2025-12-27.csv`
   - ✅ Toast: "✓ CSV exportado com sucesso!"

2. **Abrir o arquivo**
   - Abra o CSV no Excel ou Google Sheets
   - ✅ Veja colunas: Nome, Categoria, Código, Quantidade, etc.
   - ✅ Veja dados dos materiais

**SE O ARQUIVO BAIXOU E ABRIU, CSV FUNCIONA! ✅**

---

## ✅ TESTE 3: EXPORTAR EXCEL (1 minuto)

1. **Exportar Relatório de Movimentações**
   - Role até "2. Relatório de Movimentações"
   - Clique no botão "Exportar Excel"
   - ✅ Toast: "Gerando Excel..."
   - ✅ Arquivo baixa: `Movimentacoes_2025-12-27.xls`
   - ✅ Toast: "✓ Excel exportado com sucesso!"

2. **Abrir o arquivo**
   - Abra o .xls no Microsoft Excel
   - ✅ Veja tabela formatada com cores
   - ✅ Veja dados de movimentações

**SE O ARQUIVO BAIXOU E ABRIU, EXCEL FUNCIONA! ✅**

---

## ✅ TESTE 4: EXPORTAR PDF (1 minuto)

**IMPORTANTE**: PDF precisa das bibliotecas jsPDF instaladas.

1. **Se ainda não instalou**:
   ```bash
   npm install jspdf jspdf-autotable
   ```

2. **Exportar Relatório Financeiro**
   - Role até "3. Relatório Financeiro"
   - Clique no botão "Exportar PDF"
   - ✅ Toast: "Gerando PDF..."
   - ✅ Arquivo baixa: `Financeiro_2025-12-27.pdf`
   - ✅ Toast: "✓ PDF exportado com sucesso!"

3. **Abrir o arquivo**
   - Abra o PDF
   - ✅ Veja título formatado
   - ✅ Veja tabela profissional
   - ✅ Veja dados financeiros

**SE DER ERRO "jsPDF not found":**
- Execute: `npm install jspdf jspdf-autotable`
- Reinicie: `npm run dev`
- Tente novamente

**SE O ARQUIVO BAIXOU, PDF FUNCIONA! ✅**

---

## ✅ TESTE 5: FILTROS COMBINADOS (2 minutos)

1. **Configure filtros**:
   - Data Início: 01/12/2025
   - Data Fim: 20/12/2025
   - Categoria: Periféricos
   - Tipo: Apenas Entradas

2. **Clique "Aplicar Filtros"**
   - ✅ Toast: "✓ Filtros aplicados!"
   - ✅ Contador atualiza (ex: "8 materiais • 2 movimentações")

3. **Exporte CSV do Relatório de Movimentações**
   - ✅ Arquivo baixa
   - ✅ Abra e veja: APENAS Entradas de Periféricos entre 01-20/12

**SE O ARQUIVO TEM APENAS OS DADOS FILTRADOS, FUNCIONA! ✅**

---

## ✅ TESTE 6: TODOS OS BOTÕES (3 minutos)

### Relatório 1: Estoque
- [ ] PDF baixa
- [ ] CSV baixa
- [ ] Excel baixa

### Relatório 2: Movimentações
- [ ] PDF baixa
- [ ] CSV baixa
- [ ] Excel baixa

### Relatório 3: Financeiro
- [ ] PDF baixa
- [ ] CSV baixa
- [ ] Excel baixa

### Relatório 4: Completo
- [ ] PDF baixa
- [ ] CSV baixa
- [ ] Excel baixa

**Total: 12 botões de exportação**

---

## 🐛 PROBLEMAS COMUNS

### Problema 1: "Nada acontece ao clicar"
**Solução**:
```bash
# Abra o Console do Navegador (F12)
# Veja se há erros em vermelho
# Copie o erro e me envie
```

### Problema 2: "jsPDF not found"
**Solução**:
```bash
npm install jspdf jspdf-autotable --force
npm run dev
```

### Problema 3: "Página em branco"
**Solução**:
```bash
# Verifique se o servidor está rodando
# Veja se há erros no terminal
# Tente: Ctrl+C e depois npm run dev
```

### Problema 4: "Filtros não atualizam"
**Solução**:
- Recarregue a página (F5)
- Limpe o cache (Ctrl+Shift+R)
- Verifique o Console (F12)

### Problema 5: "CSV não abre no Excel"
**Solução**:
- Clique direito no arquivo > Abrir com > Excel
- Ou arraste o arquivo para dentro do Excel

---

## 📊 O QUE DEVE FUNCIONAR

### ✅ FILTROS
- [x] Data Início (campo date)
- [x] Data Fim (campo date)
- [x] Categoria (dropdown)
- [x] Tipo (dropdown)
- [x] Botão "Últimos 7 dias"
- [x] Botão "Últimos 30 dias"
- [x] Botão "Últimos 90 dias"
- [x] Botão "Mês Atual"
- [x] Botão "Aplicar Filtros"
- [x] Botão "Limpar Filtros"
- [x] Contador de resultados

### ✅ EXPORTAÇÕES
- [x] CSV (sempre funciona no navegador)
- [x] Excel (sempre funciona no navegador)
- [x] PDF (precisa de npm install)

### ✅ TOASTS
- [x] Toast ao clicar em atalhos
- [x] Toast ao aplicar filtros
- [x] Toast ao limpar filtros
- [x] Toast "Gerando..." ao exportar
- [x] Toast de sucesso
- [x] Toast de erro (se vazio)

---

## 🎯 RESULTADO ESPERADO

Ao final dos testes, você deve ter:
- ✅ 12 arquivos baixados (PDF/CSV/Excel × 4 relatórios)
- ✅ Todos os filtros funcionando
- ✅ Toasts aparecendo
- ✅ Contador atualizando
- ✅ Arquivos com dados corretos

---

## 📝 CHECKLIST FINAL

Marque o que funcionou:

- [ ] Resumo geral mostra dados
- [ ] Filtro Data Início funciona
- [ ] Filtro Data Fim funciona
- [ ] Filtro Categoria funciona
- [ ] Filtro Tipo funciona
- [ ] Atalho "Últimos 7 dias" funciona
- [ ] Atalho "Últimos 30 dias" funciona
- [ ] Atalho "Últimos 90 dias" funciona
- [ ] Atalho "Mês Atual" funciona
- [ ] Botão "Aplicar Filtros" funciona
- [ ] Botão "Limpar Filtros" funciona
- [ ] Contador atualiza
- [ ] CSV de Estoque baixa
- [ ] Excel de Estoque baixa
- [ ] PDF de Estoque baixa
- [ ] CSV de Movimentações baixa
- [ ] Excel de Movimentações baixa
- [ ] PDF de Movimentações baixa
- [ ] CSV Financeiro baixa
- [ ] Excel Financeiro baixa
- [ ] PDF Financeiro baixa
- [ ] CSV Completo baixa
- [ ] Excel Completo baixa
- [ ] PDF Completo baixa
- [ ] Toasts aparecem
- [ ] Arquivos abrem corretamente

---

## 🚨 SE AINDA NÃO FUNCIONAR

**Me envie:**
1. Print do erro no Console (F12 > Console)
2. Print da página de Relatórios
3. Resultado de: `npm list jspdf`

**Vou corrigir IMEDIATAMENTE! 🔧**
