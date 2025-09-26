# NowGo AI Platform API

## 🚀 Intelligent AI Cost Optimization API

Transform your AI operations with smart model routing that delivers up to 98% cost savings while maintaining quality.

## 📋 Quick Start

### Installation

```bash
pip install -r requirements.txt
```

### Run API Server

```bash
python main.py
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔑 Authentication

All API requests require an API key in the Authorization header:

```bash
curl -H "Authorization: Bearer your-api-key" \
     -H "Content-Type: application/json" \
     -X POST http://localhost:8000/optimize \
     -d '{"query": "Explain quantum computing"}'
```

### Demo API Key
For testing: `demo-key-123`

## 🎯 Core Endpoints

### POST /optimize
Optimize AI query routing for cost and performance.

**Request:**
```json
{
  "query": "Your AI query here",
  "priority": "balanced",
  "max_cost": 0.01
}
```

**Response:**
```json
{
  "response": "AI generated response",
  "selected_model": "gpt-3.5",
  "complexity": "medium",
  "cost": 0.002,
  "savings_percentage": 97,
  "response_time": 1.2,
  "request_id": "abc123",
  "timestamp": "2025-01-01T12:00:00"
}
```

### GET /pricing
Get available pricing plans.

### GET /usage
Get usage statistics for your API key.

### GET /models
Get information about available AI models.

## 💰 Pricing Plans

### Starter - $99/month
- 10,000 requests/month
- Smart AI model routing
- Basic analytics
- Email support

### Professional - $299/month
- 50,000 requests/month
- Advanced analytics
- Priority support
- Custom integrations

### Enterprise - $999/month
- 200,000 requests/month
- Dedicated account manager
- SLA guarantees
- On-premise deployment

## 🔧 Priority Options

- `cost`: Minimize cost (may reduce quality)
- `speed`: Maximize response speed
- `quality`: Maximize response quality
- `balanced`: Optimal cost/quality balance (default)

## 📊 Supported Models

- **GPT-J**: Ultra-low cost, good for simple queries
- **GPT-3.5**: Balanced performance and cost
- **GPT-4**: Highest quality for complex tasks
- **Claude Instant**: Fast Anthropic model
- **Claude-2**: High-quality Anthropic model

## 🛡️ Rate Limits

Rate limits vary by plan:
- Starter: 10,000 requests/month
- Professional: 50,000 requests/month  
- Enterprise: 200,000 requests/month

## 📈 Cost Optimization

The API automatically:
1. Analyzes query complexity
2. Selects optimal model based on priority
3. Routes to most cost-effective option
4. Tracks savings vs. GPT-4 baseline

## 🔒 Security

- API key authentication
- HTTPS encryption
- Rate limiting
- Request logging for security

## 📞 Support

- **Starter**: Email support
- **Professional**: Priority support
- **Enterprise**: Dedicated account manager

---

**Developed by**: Hélio Guilherme Dias Silva  
**NowGo AI Platform**: Intelligent AI Cost Optimization
