#!/bin/bash

echo "🚀 NowGo AI Platform - Deploy Script"
echo "=================================="

# Verificar se está na pasta correta
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na pasta do projeto"
    exit 1
fi

echo "📦 Instalando dependências..."
npm install

echo "🏗️ Construindo aplicação..."
npm run build

echo "✅ Build concluído!"
echo ""
echo "🌐 Opções de Deploy:"
echo ""
echo "1️⃣ VERCEL (Recomendado):"
echo "   npm i -g vercel"
echo "   vercel login"
echo "   vercel --prod"
echo ""
echo "2️⃣ NETLIFY:"
echo "   npm i -g netlify-cli"
echo "   netlify login"
echo "   netlify deploy --prod --dir=dist"
echo ""
echo "3️⃣ SERVIDOR PRÓPRIO:"
echo "   Copie a pasta 'dist/' para seu servidor web"
echo ""
echo "📁 Arquivos prontos em: ./dist/"
echo "🎯 Aplicação pronta para deploy!"
