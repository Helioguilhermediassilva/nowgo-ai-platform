# NowGo AI Platform - MVP

## 🚀 Deploy Independente - Opções Gratuitas

### **Opção 1: Vercel (Recomendado)**
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Fazer login
vercel login

# 3. Deploy (na pasta do projeto)
vercel --prod
```

### **Opção 2: Netlify**
```bash
# 1. Instalar Netlify CLI
npm i -g netlify-cli

# 2. Fazer login
netlify login

# 3. Deploy
netlify deploy --prod --dir=dist
```

### **Opção 3: GitHub Pages**
1. Criar repositório no GitHub
2. Push do código
3. Ativar GitHub Pages nas configurações
4. Usar branch `gh-pages` ou pasta `docs/`

### **Opção 4: Servidor Próprio**
```bash
# Build da aplicação
npm run build

# Servir arquivos estáticos (pasta dist/)
# Pode usar nginx, Apache, ou qualquer servidor web
```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
nowgo-ai-platform/
├── src/
│   ├── components/ui/     # Componentes UI (shadcn/ui)
│   ├── App.jsx           # Aplicação principal
│   ├── App.css           # Estilos
│   └── main.jsx          # Entry point
├── dist/                 # Build de produção
├── public/               # Arquivos estáticos
└── package.json          # Dependências
```

## ✨ Funcionalidades Implementadas

- **Algoritmo de Roteamento Inteligente**: Seleciona modelo ótimo baseado na complexidade
- **Demo Interativo**: Teste queries em tempo real
- **Métricas de Performance**: Economia, tempo de resposta, modelo selecionado
- **Interface Profissional**: Design consistente com identidade visual
- **Responsivo**: Funciona em desktop e mobile

## 🎯 Próximos Passos

1. **Deploy em plataforma gratuita** (Vercel recomendado)
2. **Testar com clientes piloto** do seu network
3. **Coletar feedback** sobre UX e funcionalidades
4. **Iterar rapidamente** baseado no uso real
5. **Evoluir para APIs reais** quando validado

## 🔧 Customizações

Para personalizar:
- **Cores**: Editar variáveis CSS em `src/App.css`
- **Conteúdo**: Modificar textos em `src/App.jsx`
- **Algoritmo**: Ajustar lógica em `intelligentRouter` object
- **Métricas**: Alterar estatísticas mockadas

## 📊 Dados Simulados

O MVP usa dados simulados para demonstração:
- Análise de complexidade baseada em palavras-chave
- Seleção de modelo baseada em regras simples
- Cálculo de economia vs. GPT-4 only
- Métricas de performance mockadas

## 🌐 Deploy Recomendado: Vercel

**Por que Vercel?**
- Deploy automático via Git
- HTTPS gratuito
- CDN global
- Zero configuração
- Domínio personalizado gratuito

**Passos simples:**
1. Push código para GitHub
2. Conectar repositório no Vercel
3. Deploy automático
4. URL pública instantânea

**Resultado:** Aplicação profissional acessível globalmente em minutos!


---

## 👨‍💻 Autor

**Hélio Guilherme Dias Silva**
- 🏆 Top 50 Global Innovator
- 🤝 NVIDIA Partner
- 🌍 International experience (UN, World Bank)
- 💼 US$ 8.5B+ mandates experience
- 🌱 Sustainability & AI expert

## 📄 Projeto

**NowGo AI Platform** - Intelligent AI Cost Optimization System  
**Versão**: 1.0.0 MVP  
**Licença**: MIT  
**Repositório**: https://github.com/Helioguilhermediassilva/nowgo-ai-platform

---

*Desenvolvido com ❤️ para revolucionar a otimização de custos de IA empresarial*
