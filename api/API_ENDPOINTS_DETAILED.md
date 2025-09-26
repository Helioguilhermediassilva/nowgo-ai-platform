# NowGo AI Platform API - Endpoints Detalhados

## 📋 Visão Geral da API

A **NowGo AI Platform API** oferece roteamento inteligente de queries para modelos de IA, otimizando custos em até **99%** mantendo qualidade. Construída com **FastAPI** para máxima performance e escalabilidade.

**Base URL**: `https://api.nowgo.com.br` (produção) | `http://localhost:8000` (desenvolvimento)

---

## 🔐 Autenticação

### Método de Autenticação
- **Tipo**: Bearer Token (API Key)
- **Header**: `Authorization: Bearer {api_key}`
- **Formato**: JWT ou string simples

### Rate Limiting por Plano
- **Starter**: 10,000 requests/mês
- **Professional**: 50,000 requests/mês  
- **Enterprise**: 200,000 requests/mês

---

## 🚀 Endpoints Principais

### 1. **POST /optimize** - Otimização Inteligente de Queries

**Descrição**: Endpoint principal que analisa uma query e roteia para o modelo AI mais eficiente baseado em critérios de custo, qualidade e velocidade.

#### Request
```http
POST /optimize
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "query": "string (required)",
  "priority": "balanced|cost|speed|quality (optional, default: balanced)",
  "max_cost": "float (optional)",
  "user_id": "string (optional)",
  "context": "string (optional)",
  "temperature": "float (optional, 0.0-2.0)",
  "max_tokens": "integer (optional)"
}
```

#### Response
```json
{
  "response": "string - Resposta gerada pela IA",
  "selected_model": "string - Modelo selecionado (gpt-j, gpt-3.5, gpt-4, claude-instant, claude-2)",
  "complexity": "low|medium|high - Complexidade detectada",
  "cost": "float - Custo da requisição em USD",
  "savings_percentage": "integer - % de economia vs GPT-4",
  "response_time": "float - Tempo de resposta em segundos",
  "request_id": "string - ID único da requisição",
  "timestamp": "string - ISO timestamp",
  "tokens_used": "integer - Tokens consumidos",
  "confidence_score": "float - Confiança na seleção do modelo"
}
```

#### Casos de Uso
- **Chatbots**: Roteamento automático baseado na complexidade da pergunta
- **Content Generation**: Otimização de custo para geração em massa
- **Technical Support**: Priorização de qualidade para queries complexas
- **Data Analysis**: Balanceamento custo/qualidade para análises

#### Algoritmo de Seleção
1. **Análise de Complexidade**:
   - Contagem de palavras
   - Detecção de termos técnicos
   - Identificação de tarefas criativas
   - Análise de contexto

2. **Seleção por Prioridade**:
   - `cost`: Menor custo possível
   - `speed`: Resposta mais rápida
   - `quality`: Melhor qualidade
   - `balanced`: Otimização custo/qualidade

---

### 2. **GET /usage** - Estatísticas de Uso

**Descrição**: Retorna estatísticas detalhadas de uso da API para o usuário autenticado.

#### Request
```http
GET /usage
Authorization: Bearer {api_key}
```

#### Response
```json
{
  "total_queries": "integer - Total de queries processadas",
  "total_cost": "float - Custo total em USD",
  "total_savings": "float - Economia total vs GPT-4",
  "avg_response_time": "float - Tempo médio de resposta",
  "queries_by_model": {
    "gpt-j": "integer",
    "gpt-3.5": "integer", 
    "gpt-4": "integer",
    "claude-instant": "integer",
    "claude-2": "integer"
  },
  "queries_by_complexity": {
    "low": "integer",
    "medium": "integer",
    "high": "integer"
  },
  "period": "string - Período das estatísticas",
  "remaining_requests": "integer - Requests restantes no período",
  "reset_date": "string - Data de reset do limite"
}
```

#### Casos de Uso
- **Dashboard Analytics**: Visualização de métricas de uso
- **Cost Monitoring**: Monitoramento de gastos em tempo real
- **Performance Tracking**: Análise de performance da API
- **Billing Integration**: Integração com sistemas de cobrança

---

### 3. **GET /pricing** - Planos de Preços

**Descrição**: Retorna informações sobre todos os planos de preços disponíveis.

#### Request
```http
GET /pricing
```

#### Response
```json
[
  {
    "name": "string - Nome do plano",
    "price": "float - Preço mensal em USD",
    "requests_per_month": "integer - Limite de requests",
    "features": ["array de strings - Features incluídas"],
    "support_level": "string - Nível de suporte",
    "sla_uptime": "float - SLA de uptime (%)",
    "rate_limit_per_minute": "integer - Limite por minuto",
    "custom_models": "boolean - Suporte a modelos customizados",
    "webhook_support": "boolean - Suporte a webhooks",
    "analytics_retention": "integer - Dias de retenção de dados"
  }
]
```

#### Casos de Uso
- **Pricing Page**: Exibição de planos no site
- **Upgrade Flow**: Comparação de planos para upgrade
- **Sales Integration**: Informações para equipe de vendas

---

### 4. **GET /models** - Modelos Disponíveis

**Descrição**: Lista todos os modelos de IA disponíveis com suas características.

#### Request
```http
GET /models
```

#### Response
```json
{
  "models": [
    {
      "name": "string - Nome do modelo",
      "description": "string - Descrição do modelo",
      "cost_per_1k_tokens": "float - Custo por 1K tokens",
      "quality_score": "float - Score de qualidade (0-1)",
      "speed_score": "float - Score de velocidade (0-1)",
      "max_tokens": "integer - Máximo de tokens suportados",
      "context_window": "integer - Janela de contexto",
      "languages": ["array - Idiomas suportados"],
      "use_cases": ["array - Casos de uso recomendados"],
      "availability": "string - Status de disponibilidade"
    }
  ]
}
```

#### Casos de Uso
- **Model Selection**: Interface para seleção manual de modelos
- **Documentation**: Documentação técnica dos modelos
- **Capacity Planning**: Planejamento de capacidade

---

### 5. **POST /batch** - Processamento em Lote

**Descrição**: Processa múltiplas queries em uma única requisição para maior eficiência.

#### Request
```http
POST /batch
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "queries": [
    {
      "id": "string - ID único da query",
      "query": "string - Query a ser processada",
      "priority": "string - Prioridade opcional"
    }
  ],
  "global_priority": "string - Prioridade global opcional",
  "callback_url": "string - URL para callback opcional"
}
```

#### Response
```json
{
  "batch_id": "string - ID do lote",
  "status": "processing|completed|failed",
  "results": [
    {
      "id": "string - ID da query original",
      "response": "string - Resposta gerada",
      "selected_model": "string - Modelo usado",
      "cost": "float - Custo individual",
      "status": "success|failed",
      "error": "string - Erro se houver"
    }
  ],
  "total_cost": "float - Custo total do lote",
  "total_savings": "float - Economia total",
  "processing_time": "float - Tempo total de processamento"
}
```

#### Casos de Uso
- **Content Generation**: Geração em massa de conteúdo
- **Data Processing**: Processamento de grandes datasets
- **Report Generation**: Geração automatizada de relatórios

---

### 6. **GET /batch/{batch_id}** - Status do Lote

**Descrição**: Consulta o status de um processamento em lote.

#### Request
```http
GET /batch/{batch_id}
Authorization: Bearer {api_key}
```

#### Response
```json
{
  "batch_id": "string",
  "status": "processing|completed|failed",
  "progress": "float - Progresso (0-100%)",
  "completed_queries": "integer",
  "total_queries": "integer",
  "estimated_completion": "string - Tempo estimado",
  "results": "array - Resultados disponíveis"
}
```

---

### 7. **POST /webhook** - Configuração de Webhooks

**Descrição**: Configura webhooks para notificações automáticas.

#### Request
```http
POST /webhook
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "url": "string - URL do webhook",
  "events": ["array - Eventos para notificar"],
  "secret": "string - Chave secreta opcional"
}
```

#### Eventos Disponíveis
- `query.completed` - Query processada
- `batch.completed` - Lote processado
- `usage.limit_reached` - Limite de uso atingido
- `billing.payment_due` - Pagamento pendente

---

### 8. **GET /analytics** - Analytics Avançadas

**Descrição**: Retorna analytics detalhadas (apenas Professional/Enterprise).

#### Request
```http
GET /analytics?period=7d&granularity=hour
Authorization: Bearer {api_key}
```

#### Response
```json
{
  "period": "string",
  "granularity": "string",
  "metrics": {
    "queries_over_time": [
      {
        "timestamp": "string",
        "count": "integer",
        "cost": "float",
        "avg_response_time": "float"
      }
    ],
    "model_performance": {
      "gpt-j": {
        "usage_percentage": "float",
        "avg_cost": "float",
        "avg_response_time": "float",
        "success_rate": "float"
      }
    },
    "cost_optimization": {
      "total_savings": "float",
      "savings_by_model": "object",
      "optimization_rate": "float"
    }
  }
}
```

---

### 9. **POST /feedback** - Feedback de Qualidade

**Descrição**: Permite enviar feedback sobre a qualidade das respostas.

#### Request
```http
POST /feedback
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "request_id": "string - ID da requisição original",
  "rating": "integer - Rating 1-5",
  "feedback": "string - Feedback textual opcional",
  "expected_model": "string - Modelo que deveria ter sido usado"
}
```

---

### 10. **GET /health** - Health Check

**Descrição**: Verifica a saúde da API e dos modelos.

#### Request
```http
GET /health
```

#### Response
```json
{
  "status": "healthy|degraded|unhealthy",
  "version": "string",
  "uptime": "float - Uptime em segundos",
  "models_status": {
    "gpt-j": "available|unavailable|degraded",
    "gpt-3.5": "available|unavailable|degraded",
    "gpt-4": "available|unavailable|degraded"
  },
  "response_time": "float",
  "timestamp": "string"
}
```

---

## 🔧 Funcionalidades Avançadas

### Rate Limiting Inteligente
- **Burst Allowance**: Permite picos temporários
- **Fair Usage**: Distribuição equitativa entre usuários
- **Graceful Degradation**: Redução gradual de qualidade em sobrecarga

### Caching Inteligente
- **Query Similarity**: Cache baseado em similaridade de queries
- **Model-Specific**: Cache otimizado por modelo
- **TTL Dinâmico**: TTL baseado na volatilidade do conteúdo

### Monitoramento e Observabilidade
- **Distributed Tracing**: Rastreamento completo de requisições
- **Metrics Collection**: Coleta de métricas em tempo real
- **Error Tracking**: Rastreamento e alertas de erros

### Segurança
- **API Key Rotation**: Rotação automática de chaves
- **Request Signing**: Assinatura de requisições críticas
- **Audit Logging**: Log completo para auditoria

---

## 📊 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Requisição inválida |
| 401 | Não autorizado |
| 403 | Acesso negado |
| 404 | Recurso não encontrado |
| 429 | Rate limit excedido |
| 500 | Erro interno do servidor |
| 503 | Serviço indisponível |

---

## 🚀 SDKs e Integrações

### SDKs Oficiais
- **Python**: `pip install nowgo-ai`
- **JavaScript/Node.js**: `npm install nowgo-ai`
- **Go**: `go get github.com/nowgo-ai/go-sdk`
- **Java**: Maven/Gradle disponível

### Integrações
- **Zapier**: Automação sem código
- **Webhook.site**: Teste de webhooks
- **Postman**: Collection oficial
- **OpenAPI/Swagger**: Especificação completa

---

**Desenvolvido por**: Hélio Guilherme Dias Silva  
**NowGo AI Platform**: Intelligent AI Cost Optimization  
**Documentação Atualizada**: 2025-01-01
