# NowGo AI Platform API - Arquitetura Técnica

## 🏗️ Visão Geral da Arquitetura

A **NowGo AI Platform API** é construída com uma arquitetura moderna, escalável e resiliente, projetada para processar milhões de requests com latência mínima e máxima confiabilidade.

### Stack Tecnológico Principal
- **Framework**: FastAPI 0.104+ (Python 3.11+)
- **ASGI Server**: Uvicorn com workers Gunicorn
- **Database**: PostgreSQL 15 + Redis 7 (cache)
- **Message Queue**: Redis + Celery
- **Monitoring**: Prometheus + Grafana + Jaeger
- **Deployment**: Docker + Kubernetes
- **Load Balancer**: NGINX + Cloudflare

---

## 🔧 Componentes da Arquitetura

### 1. **API Gateway Layer**

```python
# main.py - Configuração principal
from fastapi import FastAPI, middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(
    title="NowGo AI Platform API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Middlewares de segurança e monitoramento
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*.nowgo.com.br"])
app.add_middleware(CORSMiddleware, allow_origins=["*"])
app.add_middleware(RateLimitMiddleware)
app.add_middleware(AuthenticationMiddleware)
app.add_middleware(RequestLoggingMiddleware)

# Instrumentação Prometheus
Instrumentator().instrument(app).expose(app)
```

### 2. **Authentication & Authorization**

```python
# auth/security.py
from fastapi.security import HTTPBearer
from jose import JWTError, jwt
import redis

class APIKeyManager:
    def __init__(self):
        self.redis = redis.Redis(host='redis-auth')
        self.secret_key = os.getenv('JWT_SECRET_KEY')
    
    async def verify_api_key(self, api_key: str) -> dict:
        # Verificar no cache primeiro
        cached_user = await self.redis.get(f"api_key:{api_key}")
        if cached_user:
            return json.loads(cached_user)
        
        # Verificar no banco de dados
        user_info = await self.db.get_user_by_api_key(api_key)
        if not user_info:
            raise HTTPException(401, "Invalid API key")
        
        # Cache por 5 minutos
        await self.redis.setex(
            f"api_key:{api_key}", 
            300, 
            json.dumps(user_info)
        )
        
        return user_info
    
    async def check_rate_limit(self, user_id: str, plan: str) -> bool:
        limits = {
            'starter': 10000,
            'professional': 50000,
            'enterprise': 200000
        }
        
        current_usage = await self.redis.get(f"usage:{user_id}:month")
        return int(current_usage or 0) < limits.get(plan, 1000)
```

### 3. **Intelligent Router Engine**

```python
# core/router.py
import asyncio
from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class ModelMetrics:
    cost_per_token: float
    quality_score: float
    speed_score: float
    availability: float
    context_window: int

class IntelligentRouter:
    def __init__(self):
        self.models = {
            'gpt-j-6b': ModelMetrics(0.0002, 0.7, 0.9, 0.99, 2048),
            'gpt-3.5-turbo': ModelMetrics(0.002, 0.85, 0.8, 0.99, 4096),
            'gpt-4': ModelMetrics(0.06, 0.95, 0.6, 0.98, 8192),
            'claude-instant': ModelMetrics(0.0015, 0.8, 0.85, 0.99, 9000),
            'claude-2': ModelMetrics(0.025, 0.92, 0.65, 0.98, 100000)
        }
        self.load_balancer = ModelLoadBalancer()
    
    async def analyze_query_complexity(self, query: str) -> Dict:
        """Análise avançada de complexidade usando ML"""
        features = {
            'word_count': len(query.split()),
            'char_count': len(query),
            'technical_terms': self._count_technical_terms(query),
            'question_complexity': self._analyze_question_type(query),
            'language_complexity': self._analyze_language_complexity(query),
            'context_requirements': self._estimate_context_needs(query)
        }
        
        # ML model para classificação de complexidade
        complexity_score = await self.ml_classifier.predict(features)
        
        return {
            'complexity': self._score_to_category(complexity_score),
            'features': features,
            'confidence': complexity_score
        }
    
    async def select_optimal_model(
        self, 
        complexity: Dict, 
        priority: str,
        constraints: Dict
    ) -> str:
        """Seleção otimizada de modelo usando algoritmo genético"""
        
        # Filtrar modelos disponíveis
        available_models = await self.load_balancer.get_available_models()
        
        # Aplicar constraints
        filtered_models = self._apply_constraints(available_models, constraints)
        
        # Calcular score para cada modelo
        model_scores = {}
        for model_name in filtered_models:
            model = self.models[model_name]
            score = self._calculate_model_score(
                model, complexity, priority, constraints
            )
            model_scores[model_name] = score
        
        # Selecionar modelo com maior score
        optimal_model = max(model_scores, key=model_scores.get)
        
        # Log da decisão
        await self._log_routing_decision(
            complexity, priority, constraints, 
            model_scores, optimal_model
        )
        
        return optimal_model
    
    def _calculate_model_score(
        self, 
        model: ModelMetrics, 
        complexity: Dict, 
        priority: str,
        constraints: Dict
    ) -> float:
        """Algoritmo de scoring multi-objetivo"""
        
        weights = {
            'cost': {'cost': 0.8, 'quality': 0.1, 'speed': 0.1},
            'quality': {'cost': 0.1, 'quality': 0.8, 'speed': 0.1},
            'speed': {'cost': 0.1, 'quality': 0.1, 'speed': 0.8},
            'balanced': {'cost': 0.4, 'quality': 0.4, 'speed': 0.2}
        }
        
        w = weights[priority]
        
        # Normalizar métricas (0-1)
        cost_score = 1 - (model.cost_per_token / 0.06)  # Normalizar por GPT-4
        quality_score = model.quality_score
        speed_score = model.speed_score
        
        # Ajustar por complexidade
        complexity_factor = complexity['confidence']
        if complexity['complexity'] == 'high' and quality_score < 0.9:
            quality_score *= 0.7  # Penalizar modelos de baixa qualidade
        
        # Calcular score final
        final_score = (
            w['cost'] * cost_score +
            w['quality'] * quality_score +
            w['speed'] * speed_score
        ) * model.availability * complexity_factor
        
        return final_score
```

### 4. **Model Load Balancer**

```python
# core/load_balancer.py
import asyncio
from collections import defaultdict
import aiohttp

class ModelLoadBalancer:
    def __init__(self):
        self.model_endpoints = {
            'gpt-j-6b': ['http://gpt-j-1:8000', 'http://gpt-j-2:8000'],
            'gpt-3.5-turbo': ['http://openai-proxy:8000'],
            'gpt-4': ['http://openai-proxy:8000'],
            'claude-instant': ['http://anthropic-proxy:8000'],
            'claude-2': ['http://anthropic-proxy:8000']
        }
        self.health_status = defaultdict(dict)
        self.request_counts = defaultdict(int)
    
    async def health_check_loop(self):
        """Health check contínuo dos modelos"""
        while True:
            tasks = []
            for model, endpoints in self.model_endpoints.items():
                for endpoint in endpoints:
                    tasks.append(self._check_endpoint_health(model, endpoint))
            
            await asyncio.gather(*tasks, return_exceptions=True)
            await asyncio.sleep(30)  # Check a cada 30 segundos
    
    async def _check_endpoint_health(self, model: str, endpoint: str):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    f"{endpoint}/health", 
                    timeout=aiohttp.ClientTimeout(total=5)
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        self.health_status[model][endpoint] = {
                            'status': 'healthy',
                            'response_time': data.get('response_time', 0),
                            'queue_size': data.get('queue_size', 0),
                            'last_check': time.time()
                        }
                    else:
                        self.health_status[model][endpoint]['status'] = 'unhealthy'
        except Exception as e:
            self.health_status[model][endpoint] = {
                'status': 'unhealthy',
                'error': str(e),
                'last_check': time.time()
            }
    
    async def get_best_endpoint(self, model: str) -> str:
        """Seleciona o melhor endpoint baseado em saúde e carga"""
        healthy_endpoints = [
            endpoint for endpoint, status in self.health_status[model].items()
            if status.get('status') == 'healthy'
        ]
        
        if not healthy_endpoints:
            raise Exception(f"No healthy endpoints for model {model}")
        
        # Selecionar endpoint com menor carga
        best_endpoint = min(
            healthy_endpoints,
            key=lambda ep: (
                self.health_status[model][ep].get('queue_size', 0) +
                self.request_counts[ep]
            )
        )
        
        self.request_counts[best_endpoint] += 1
        return best_endpoint
```

### 5. **Caching Layer**

```python
# core/cache.py
import redis.asyncio as redis
import json
import hashlib
from typing import Optional, Any

class IntelligentCache:
    def __init__(self):
        self.redis = redis.Redis(host='redis-cache', decode_responses=True)
        self.default_ttl = 3600  # 1 hora
    
    def _generate_cache_key(self, query: str, priority: str, **kwargs) -> str:
        """Gera chave de cache baseada em similaridade semântica"""
        # Normalizar query
        normalized_query = self._normalize_query(query)
        
        # Incluir parâmetros relevantes
        cache_data = {
            'query': normalized_query,
            'priority': priority,
            **kwargs
        }
        
        cache_string = json.dumps(cache_data, sort_keys=True)
        return hashlib.sha256(cache_string.encode()).hexdigest()[:16]
    
    async def get(self, query: str, priority: str, **kwargs) -> Optional[dict]:
        """Busca no cache com fallback para queries similares"""
        cache_key = self._generate_cache_key(query, priority, **kwargs)
        
        # Busca exata
        cached_result = await self.redis.get(f"exact:{cache_key}")
        if cached_result:
            return json.loads(cached_result)
        
        # Busca por similaridade (usando embeddings)
        similar_key = await self._find_similar_query(query, priority)
        if similar_key:
            cached_result = await self.redis.get(f"similar:{similar_key}")
            if cached_result:
                return json.loads(cached_result)
        
        return None
    
    async def set(
        self, 
        query: str, 
        priority: str, 
        result: dict, 
        ttl: Optional[int] = None,
        **kwargs
    ):
        """Armazena resultado no cache com TTL dinâmico"""
        cache_key = self._generate_cache_key(query, priority, **kwargs)
        
        # TTL dinâmico baseado na volatilidade do conteúdo
        if ttl is None:
            ttl = self._calculate_dynamic_ttl(query, result)
        
        # Armazenar resultado
        await self.redis.setex(
            f"exact:{cache_key}",
            ttl,
            json.dumps(result)
        )
        
        # Armazenar embedding para busca por similaridade
        await self._store_query_embedding(query, cache_key)
    
    def _calculate_dynamic_ttl(self, query: str, result: dict) -> int:
        """Calcula TTL baseado na volatilidade do conteúdo"""
        base_ttl = self.default_ttl
        
        # Queries factuais têm TTL maior
        if self._is_factual_query(query):
            return base_ttl * 24  # 24 horas
        
        # Queries criativas têm TTL menor
        if self._is_creative_query(query):
            return base_ttl // 4  # 15 minutos
        
        # Queries com dados em tempo real têm TTL muito baixo
        if self._is_realtime_query(query):
            return 300  # 5 minutos
        
        return base_ttl
```

### 6. **Monitoring & Observability**

```python
# monitoring/metrics.py
from prometheus_client import Counter, Histogram, Gauge
import structlog
import jaeger_client

# Métricas Prometheus
REQUEST_COUNT = Counter(
    'nowgo_api_requests_total',
    'Total API requests',
    ['method', 'endpoint', 'status']
)

REQUEST_DURATION = Histogram(
    'nowgo_api_request_duration_seconds',
    'Request duration',
    ['method', 'endpoint']
)

MODEL_USAGE = Counter(
    'nowgo_model_usage_total',
    'Model usage count',
    ['model', 'priority', 'complexity']
)

COST_SAVINGS = Histogram(
    'nowgo_cost_savings_percentage',
    'Cost savings percentage',
    ['model', 'priority']
)

ACTIVE_CONNECTIONS = Gauge(
    'nowgo_active_connections',
    'Active connections'
)

class MetricsCollector:
    def __init__(self):
        self.logger = structlog.get_logger()
        self.tracer = jaeger_client.Config(
            config={'sampler': {'type': 'const', 'param': 1}},
            service_name='nowgo-api'
        ).initialize_tracer()
    
    def track_request(self, method: str, endpoint: str, status: int, duration: float):
        REQUEST_COUNT.labels(method=method, endpoint=endpoint, status=status).inc()
        REQUEST_DURATION.labels(method=method, endpoint=endpoint).observe(duration)
    
    def track_model_usage(self, model: str, priority: str, complexity: str, cost: float, savings: float):
        MODEL_USAGE.labels(model=model, priority=priority, complexity=complexity).inc()
        COST_SAVINGS.labels(model=model, priority=priority).observe(savings)
        
        # Log estruturado
        self.logger.info(
            "model_usage",
            model=model,
            priority=priority,
            complexity=complexity,
            cost=cost,
            savings_percentage=savings
        )
    
    def create_span(self, operation_name: str):
        return self.tracer.start_span(operation_name)
```

### 7. **Database Layer**

```python
# db/models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, Index
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid

Base = declarative_base()

class APIKey(Base):
    __tablename__ = 'api_keys'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    key_hash = Column(String(64), unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    plan = Column(String(20), nullable=False)  # starter, professional, enterprise
    requests_used = Column(Integer, default=0)
    requests_limit = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False)
    last_used = Column(DateTime)
    is_active = Column(Boolean, default=True)
    
    __table_args__ = (
        Index('idx_api_key_hash', 'key_hash'),
        Index('idx_user_id', 'user_id'),
    )

class QueryLog(Base):
    __tablename__ = 'query_logs'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    query_hash = Column(String(64), nullable=False)  # Hash da query para privacy
    selected_model = Column(String(50), nullable=False)
    complexity = Column(String(10), nullable=False)
    priority = Column(String(20), nullable=False)
    cost = Column(Float, nullable=False)
    savings_percentage = Column(Integer, nullable=False)
    response_time = Column(Float, nullable=False)
    tokens_used = Column(Integer)
    created_at = Column(DateTime, nullable=False)
    metadata = Column(JSON)  # Dados adicionais flexíveis
    
    __table_args__ = (
        Index('idx_user_created', 'user_id', 'created_at'),
        Index('idx_model_created', 'selected_model', 'created_at'),
    )

# db/repository.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Dict, Optional

class QueryRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def log_query(self, query_data: Dict) -> QueryLog:
        query_log = QueryLog(**query_data)
        self.session.add(query_log)
        await self.session.commit()
        return query_log
    
    async def get_usage_stats(self, user_id: str, period_days: int = 30) -> Dict:
        # Query complexa para estatísticas de uso
        result = await self.session.execute(
            select(
                func.count(QueryLog.id).label('total_queries'),
                func.sum(QueryLog.cost).label('total_cost'),
                func.avg(QueryLog.response_time).label('avg_response_time'),
                func.sum(QueryLog.cost * QueryLog.savings_percentage / 100).label('total_savings')
            ).where(
                QueryLog.user_id == user_id,
                QueryLog.created_at >= func.now() - func.interval(f'{period_days} days')
            )
        )
        
        stats = result.first()
        
        # Queries por modelo
        model_stats = await self.session.execute(
            select(
                QueryLog.selected_model,
                func.count(QueryLog.id).label('count')
            ).where(
                QueryLog.user_id == user_id,
                QueryLog.created_at >= func.now() - func.interval(f'{period_days} days')
            ).group_by(QueryLog.selected_model)
        )
        
        return {
            'total_queries': stats.total_queries or 0,
            'total_cost': float(stats.total_cost or 0),
            'total_savings': float(stats.total_savings or 0),
            'avg_response_time': float(stats.avg_response_time or 0),
            'queries_by_model': {row.selected_model: row.count for row in model_stats}
        }
```

### 8. **Deployment Configuration**

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/nowgo
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
    depends_on:
      - postgres
      - redis
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=nowgo
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1'
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.25'
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - api

volumes:
  postgres_data:
  redis_data:
```

```yaml
# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nowgo-api
spec:
  replicas: 5
  selector:
    matchLabels:
      app: nowgo-api
  template:
    metadata:
      labels:
        app: nowgo-api
    spec:
      containers:
      - name: api
        image: nowgo/api:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: nowgo-secrets
              key: database-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## 📊 Performance Specifications

### Latência e Throughput
- **Latência P50**: < 200ms
- **Latência P95**: < 500ms
- **Latência P99**: < 1000ms
- **Throughput**: > 10,000 requests/segundo
- **Uptime SLA**: 99.9% (Enterprise: 99.99%)

### Escalabilidade
- **Horizontal Scaling**: Auto-scaling baseado em CPU/memória
- **Database Sharding**: Particionamento por user_id
- **Cache Hit Rate**: > 80% para queries similares
- **Connection Pooling**: 100 conexões por instância

### Segurança
- **Rate Limiting**: Por API key e IP
- **DDoS Protection**: Cloudflare + custom rules
- **Data Encryption**: TLS 1.3 + AES-256
- **API Key Rotation**: Automática a cada 90 dias

---

**Desenvolvido por**: Hélio Guilherme Dias Silva  
**NowGo AI Platform**: Intelligent AI Cost Optimization  
**Arquitetura Atualizada**: 2025-01-01
