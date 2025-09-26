#!/usr/bin/env python3
"""
NowGo AI Platform API - Example Client

This example demonstrates how to integrate with the NowGo AI Platform API
for intelligent AI cost optimization.

Author: Hélio Guilherme Dias Silva
"""

import requests
import json
from typing import Optional

class NowGoAIClient:
    """Client for NowGo AI Platform API"""
    
    def __init__(self, api_key: str, base_url: str = "http://localhost:8000"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def optimize_query(self, query: str, priority: str = "balanced", max_cost: Optional[float] = None):
        """
        Optimize AI query routing for cost and performance
        
        Args:
            query: The AI query to optimize
            priority: "cost", "speed", "quality", or "balanced"
            max_cost: Maximum cost per request (optional)
        
        Returns:
            API response with optimized routing
        """
        payload = {
            "query": query,
            "priority": priority
        }
        
        if max_cost:
            payload["max_cost"] = max_cost
        
        response = requests.post(
            f"{self.base_url}/optimize",
            headers=self.headers,
            json=payload
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"API Error: {response.status_code} - {response.text}")
    
    def get_usage_stats(self):
        """Get usage statistics"""
        response = requests.get(
            f"{self.base_url}/usage",
            headers=self.headers
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"API Error: {response.status_code} - {response.text}")
    
    def get_pricing_plans(self):
        """Get available pricing plans"""
        response = requests.get(f"{self.base_url}/pricing")
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"API Error: {response.status_code} - {response.text}")
    
    def get_available_models(self):
        """Get information about available AI models"""
        response = requests.get(f"{self.base_url}/models")
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"API Error: {response.status_code} - {response.text}")

def main():
    """Example usage of NowGo AI Platform API"""
    
    # Initialize client with demo API key
    client = NowGoAIClient("demo-key-123")
    
    print("🚀 NowGo AI Platform API Example\n")
    
    # Example 1: Simple query optimization
    print("1. Simple Query Optimization:")
    try:
        result = client.optimize_query("What is artificial intelligence?")
        print(f"   Selected Model: {result['selected_model']}")
        print(f"   Cost: ${result['cost']:.4f}")
        print(f"   Savings: {result['savings_percentage']}%")
        print(f"   Response: {result['response'][:100]}...\n")
    except Exception as e:
        print(f"   Error: {e}\n")
    
    # Example 2: Cost-optimized query
    print("2. Cost-Optimized Query:")
    try:
        result = client.optimize_query(
            "Summarize this document briefly",
            priority="cost",
            max_cost=0.001
        )
        print(f"   Selected Model: {result['selected_model']}")
        print(f"   Cost: ${result['cost']:.4f}")
        print(f"   Savings: {result['savings_percentage']}%\n")
    except Exception as e:
        print(f"   Error: {e}\n")
    
    # Example 3: Quality-focused query
    print("3. Quality-Focused Query:")
    try:
        result = client.optimize_query(
            "Write a detailed technical analysis of quantum computing algorithms",
            priority="quality"
        )
        print(f"   Selected Model: {result['selected_model']}")
        print(f"   Cost: ${result['cost']:.4f}")
        print(f"   Complexity: {result['complexity']}")
        print(f"   Response Time: {result['response_time']}s\n")
    except Exception as e:
        print(f"   Error: {e}\n")
    
    # Example 4: Get usage statistics
    print("4. Usage Statistics:")
    try:
        stats = client.get_usage_stats()
        print(f"   Total Queries: {stats['total_queries']}")
        print(f"   Total Cost: ${stats['total_cost']:.2f}")
        print(f"   Total Savings: ${stats['total_savings']:.2f}")
        print(f"   Avg Response Time: {stats['avg_response_time']}s\n")
    except Exception as e:
        print(f"   Error: {e}\n")
    
    # Example 5: Get pricing information
    print("5. Pricing Plans:")
    try:
        plans = client.get_pricing_plans()
        for plan in plans:
            print(f"   {plan['name']}: ${plan['price']}/month")
            print(f"   - {plan['requests_per_month']:,} requests/month")
            print(f"   - {plan['support_level']} support")
            print()
    except Exception as e:
        print(f"   Error: {e}\n")
    
    # Example 6: Get available models
    print("6. Available Models:")
    try:
        models_info = client.get_available_models()
        for model in models_info['models']:
            print(f"   {model['name']}: {model['description']}")
            print(f"   - Cost: ${model['cost_per_1k_tokens']:.4f}/1K tokens")
            print(f"   - Quality: {model['quality_score']:.1f}/1.0")
            print(f"   - Speed: {model['speed_score']:.1f}/1.0")
            print()
    except Exception as e:
        print(f"   Error: {e}\n")

if __name__ == "__main__":
    main()
