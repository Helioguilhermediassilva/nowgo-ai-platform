from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List
import time
import hashlib
import json
from datetime import datetime, timedelta
import uvicorn

app = FastAPI(
    title="NowGo AI Platform API",
    description="Intelligent AI Cost Optimization API - Route queries to optimal AI models",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Models
class QueryRequest(BaseModel):
    query: str
    max_cost: Optional[float] = None
    priority: Optional[str] = "balanced"  # "speed", "cost", "quality", "balanced"
    user_id: Optional[str] = None

class QueryResponse(BaseModel):
    response: str
    selected_model: str
    complexity: str
    cost: float
    savings_percentage: int
    response_time: float
    request_id: str
    timestamp: str

class UsageStats(BaseModel):
    total_queries: int
    total_cost: float
    total_savings: float
    avg_response_time: float
    queries_by_model: dict
    period: str

class PricingPlan(BaseModel):
    name: str
    price: float
    requests_per_month: int
    features: List[str]
    support_level: str

# Mock database (in production, use a real database)
API_KEYS = {
    "demo-key-123": {
        "plan": "starter",
        "requests_used": 0,
        "requests_limit": 1000,
        "user_id": "demo-user"
    }
}

PRICING_PLANS = {
    "starter": PricingPlan(
        name="Starter",
        price=99.0,
        requests_per_month=10000,
        features=[
            "Smart AI model routing",
            "Real-time cost optimization",
            "Basic analytics dashboard",
            "Email support",
            "Up to 98% cost savings"
        ],
        support_level="Email"
    ),
    "professional": PricingPlan(
        name="Professional", 
        price=299.0,
        requests_per_month=50000,
        features=[
            "Everything in Starter",
            "Advanced analytics & insights",
            "Custom model preferences",
            "Priority support",
            "Webhook integrations",
            "Team collaboration tools"
        ],
        support_level="Priority"
    ),
    "enterprise": PricingPlan(
        name="Enterprise",
        price=999.0,
        requests_per_month=200000,
        features=[
            "Everything in Professional",
            "Dedicated account manager",
            "Custom integrations",
            "SLA guarantees",
            "On-premise deployment option",
            "Advanced security features",
            "Custom model training"
        ],
        support_level="Dedicated"
    )
}

# AI Router Logic (Enhanced)
class IntelligentRouter:
    def __init__(self):
        self.models = {
            'gpt-j': {'cost': 0.0002, 'quality': 0.7, 'speed': 0.9, 'max_tokens': 2048},
            'gpt-3.5': {'cost': 0.002, 'quality': 0.85, 'speed': 0.8, 'max_tokens': 4096},
            'gpt-4': {'cost': 0.06, 'quality': 0.95, 'speed': 0.6, 'max_tokens': 8192},
            'claude-instant': {'cost': 0.0015, 'quality': 0.8, 'speed': 0.85, 'max_tokens': 9000},
            'claude-2': {'cost': 0.025, 'quality': 0.92, 'speed': 0.65, 'max_tokens': 100000}
        }
    
    def analyze_complexity(self, query: str) -> str:
        """Analyze query complexity"""
        words = len(query.split())
        
        # Technical indicators
        technical_terms = ['algorithm', 'code', 'function', 'programming', 'technical', 'analysis', 'detailed', 'comprehensive']
        has_technical = any(term in query.lower() for term in technical_terms)
        
        # Creative indicators  
        creative_terms = ['write', 'create', 'story', 'poem', 'creative', 'imagine', 'design']
        has_creative = any(term in query.lower() for term in creative_terms)
        
        # Reasoning indicators
        reasoning_terms = ['explain', 'why', 'how', 'analyze', 'compare', 'evaluate', 'solve']
        has_reasoning = any(term in query.lower() for term in reasoning_terms)
        
        if words > 100 or has_technical:
            return 'high'
        elif words > 30 or has_creative or has_reasoning:
            return 'medium'
        else:
            return 'low'
    
    def select_model(self, complexity: str, priority: str, max_cost: Optional[float] = None) -> str:
        """Select optimal model based on complexity and priority"""
        available_models = self.models.copy()
        
        # Filter by cost if specified
        if max_cost:
            available_models = {k: v for k, v in available_models.items() if v['cost'] <= max_cost}
        
        if not available_models:
            return 'gpt-j'  # Fallback to cheapest
        
        if priority == 'cost':
            return min(available_models, key=lambda x: available_models[x]['cost'])
        elif priority == 'speed':
            return max(available_models, key=lambda x: available_models[x]['speed'])
        elif priority == 'quality':
            return max(available_models, key=lambda x: available_models[x]['quality'])
        else:  # balanced
            if complexity == 'high':
                # Prefer quality for complex queries
                quality_models = {k: v for k, v in available_models.items() if v['quality'] >= 0.9}
                if quality_models:
                    return min(quality_models, key=lambda x: quality_models[x]['cost'])
                return 'gpt-4'
            elif complexity == 'medium':
                # Balance cost and quality
                return 'gpt-3.5' if 'gpt-3.5' in available_models else 'claude-instant'
            else:
                # Prefer cost for simple queries
                return min(available_models, key=lambda x: available_models[x]['cost'])
    
    def calculate_savings(self, selected_model: str, baseline_model: str = 'gpt-4') -> int:
        """Calculate cost savings vs baseline"""
        if selected_model not in self.models or baseline_model not in self.models:
            return 0
        
        selected_cost = self.models[selected_model]['cost']
        baseline_cost = self.models[baseline_model]['cost']
        
        if baseline_cost == 0:
            return 0
            
        savings = ((baseline_cost - selected_cost) / baseline_cost) * 100
        return max(0, int(savings))

router = IntelligentRouter()

# Authentication
async def verify_api_key(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify API key and return user info"""
    api_key = credentials.credentials
    
    if api_key not in API_KEYS:
        raise HTTPException(status_code=401, detail="Invalid API key")
    
    user_info = API_KEYS[api_key]
    
    # Check rate limits
    if user_info["requests_used"] >= user_info["requests_limit"]:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    
    return user_info

# API Endpoints
@app.get("/")
async def root():
    """API health check"""
    return {
        "message": "NowGo AI Platform API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs"
    }

@app.get("/pricing", response_model=List[PricingPlan])
async def get_pricing():
    """Get available pricing plans"""
    return list(PRICING_PLANS.values())

@app.post("/optimize", response_model=QueryResponse)
async def optimize_query(request: QueryRequest, user_info: dict = Depends(verify_api_key)):
    """
    Optimize AI query routing for cost and performance
    
    This endpoint analyzes your query and routes it to the most cost-effective
    AI model while maintaining quality standards.
    """
    start_time = time.time()
    
    # Analyze query
    complexity = router.analyze_complexity(request.query)
    selected_model = router.select_model(complexity, request.priority, request.max_cost)
    
    # Generate mock response (in production, call actual AI models)
    responses = {
        'high': f"This is a comprehensive analysis of your complex query: '{request.query[:50]}...'. The system has automatically selected {selected_model} to ensure optimal quality while managing costs effectively.",
        'medium': f"Here's a balanced response to your query: '{request.query[:50]}...'. Using {selected_model} provides the right mix of quality and cost efficiency for this type of request.",
        'low': f"Quick response: '{request.query[:50]}...'. The system optimized for cost by selecting {selected_model} while maintaining adequate quality for this simple query."
    }
    
    response_text = responses.get(complexity, responses['medium'])
    
    # Calculate metrics
    cost = router.models[selected_model]['cost']
    savings = router.calculate_savings(selected_model)
    response_time = time.time() - start_time
    
    # Generate request ID
    request_id = hashlib.md5(f"{request.query}{time.time()}".encode()).hexdigest()[:12]
    
    # Update usage (in production, use database)
    API_KEYS[user_info.get('api_key', 'demo-key-123')]["requests_used"] += 1
    
    return QueryResponse(
        response=response_text,
        selected_model=selected_model,
        complexity=complexity,
        cost=cost,
        savings_percentage=savings,
        response_time=round(response_time, 3),
        request_id=request_id,
        timestamp=datetime.now().isoformat()
    )

@app.get("/usage", response_model=UsageStats)
async def get_usage_stats(user_info: dict = Depends(verify_api_key)):
    """Get usage statistics for the authenticated user"""
    # Mock stats (in production, query from database)
    return UsageStats(
        total_queries=user_info["requests_used"],
        total_cost=user_info["requests_used"] * 0.002,  # Average cost
        total_savings=user_info["requests_used"] * 0.058,  # Average savings
        avg_response_time=1.2,
        queries_by_model={
            "gpt-j": 45,
            "gpt-3.5": 35, 
            "gpt-4": 20
        },
        period="current_month"
    )

@app.get("/models")
async def get_available_models():
    """Get information about available AI models"""
    return {
        "models": [
            {
                "name": "gpt-j",
                "description": "Fast and cost-effective for simple queries",
                "cost_per_1k_tokens": 0.0002,
                "quality_score": 0.7,
                "speed_score": 0.9
            },
            {
                "name": "gpt-3.5",
                "description": "Balanced performance for most use cases",
                "cost_per_1k_tokens": 0.002,
                "quality_score": 0.85,
                "speed_score": 0.8
            },
            {
                "name": "gpt-4",
                "description": "Highest quality for complex tasks",
                "cost_per_1k_tokens": 0.06,
                "quality_score": 0.95,
                "speed_score": 0.6
            },
            {
                "name": "claude-instant",
                "description": "Fast Claude model for quick responses",
                "cost_per_1k_tokens": 0.0015,
                "quality_score": 0.8,
                "speed_score": 0.85
            },
            {
                "name": "claude-2",
                "description": "High-quality Claude model for complex tasks",
                "cost_per_1k_tokens": 0.025,
                "quality_score": 0.92,
                "speed_score": 0.65
            }
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
