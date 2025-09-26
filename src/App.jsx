import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  Brain, 
  DollarSign, 
  Zap, 
  Shield, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  BarChart3,
  Settings,
  Sparkles
} from 'lucide-react';

// Simulação do algoritmo de roteamento inteligente
const intelligentRouter = {
  analyzeComplexity: (query) => {
    const words = query.split(' ').length;
    const hasSpecialTerms = /technical|complex|analysis|detailed|comprehensive/i.test(query);
    const hasCode = /code|function|algorithm|programming/i.test(query);
    
    if (words > 50 || hasCode) return 'high';
    if (words > 20 || hasSpecialTerms) return 'medium';
    return 'low';
  },

  selectModel: (complexity, budget) => {
    const models = {
      'gpt-j': { cost: 0.0002, quality: 0.7, speed: 0.9 },
      'gpt-3.5': { cost: 0.002, quality: 0.85, speed: 0.8 },
      'gpt-4': { cost: 0.06, quality: 0.95, speed: 0.6 }
    };

    if (complexity === 'low' && budget === 'low') return 'gpt-j';
    if (complexity === 'high' || budget === 'high') return 'gpt-4';
    return 'gpt-3.5';
  },

  calculateSavings: (originalModel, selectedModel) => {
    const costs = {
      'gpt-j': 0.0002,
      'gpt-3.5': 0.002,
      'gpt-4': 0.06
    };
    
    const originalCost = costs[originalModel] || costs['gpt-4'];
    const selectedCost = costs[selectedModel];
    
    return Math.round(((originalCost - selectedCost) / originalCost) * 100);
  }
};

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({
    totalQueries: 1247,
    totalSavings: 87,
    avgResponseTime: 1.2,
    uptime: 99.9
  });

  const processQuery = async () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const complexity = intelligentRouter.analyzeComplexity(query);
    const selectedModel = intelligentRouter.selectModel(complexity, 'medium');
    const savings = intelligentRouter.calculateSavings('gpt-4', selectedModel);
    
    const mockResponse = complexity === 'high' 
      ? "Esta é uma resposta detalhada e técnica que requer o modelo mais avançado para garantir precisão e qualidade. O sistema automaticamente selecionou o GPT-4 para esta consulta complexa."
      : complexity === 'medium'
      ? "Esta é uma resposta balanceada que oferece boa qualidade com custo otimizado. O sistema selecionou o GPT-3.5 como a melhor opção custo-benefício."
      : "Esta é uma resposta simples e direta. O sistema otimizou o custo selecionando o GPT-J, mantendo a qualidade adequada para esta consulta.";

    setResult({
      response: mockResponse,
      selectedModel,
      complexity,
      savings,
      cost: selectedModel === 'gpt-j' ? 0.0002 : selectedModel === 'gpt-3.5' ? 0.002 : 0.06,
      responseTime: Math.random() * 2 + 0.5
    });
    
    setIsProcessing(false);
    
    // Atualizar estatísticas
    setStats(prev => ({
      ...prev,
      totalQueries: prev.totalQueries + 1,
      totalSavings: Math.round((prev.totalSavings * prev.totalQueries + savings) / (prev.totalQueries + 1))
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-cyan-400" />
                <span className="text-2xl font-bold text-white">NowGo AI</span>
                <Badge variant="secondary" className="bg-cyan-400/20 text-cyan-300 border-cyan-400/30">
                  Platform
                </Badge>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <Button className="bg-white text-cyan-600 hover:bg-gray-100 border border-white">
                Sign In
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Start Free Trial
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Badge className="bg-cyan-400/20 text-cyan-300 border-cyan-400/30 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Intelligent AI Cost Optimization
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Reduce AI Costs by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                98%
              </span>
              <br />
              Without Sacrificing Quality
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Our intelligent routing system automatically selects the optimal AI model for each query,
              delivering the same quality at a fraction of the cost. Transform your AI operations with
              smart cost optimization.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">{stats.totalSavings}%</div>
                  <div className="text-sm text-gray-400">Average Savings</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.avgResponseTime}s</div>
                  <div className="text-sm text-gray-400">Avg Response</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{stats.totalQueries.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Queries Processed</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{stats.uptime}%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg"
            >
              Try NowGo AI Now
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                See NowGo AI in Action
              </h2>
              <p className="text-gray-300">
                Try our intelligent routing system with your own queries
              </p>
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-cyan-400" />
                  Intelligent Query Processor
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enter your query and watch our system optimize the AI model selection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Textarea
                    placeholder="Enter your query here... (e.g., 'What is the weather today?' or 'Explain quantum computing in detail')"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400 min-h-[100px]"
                  />
                </div>
                
                <Button 
                  onClick={processQuery}
                  disabled={isProcessing || !query.trim()}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Process Query
                    </>
                  )}
                </Button>

                {result && (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    {/* Model Selection Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Selected Model</span>
                            <Badge variant="outline" className="border-cyan-400/50 text-cyan-300">
                              {result.selectedModel.toUpperCase()}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Complexity</span>
                            <Badge 
                              variant="outline" 
                              className={`${
                                result.complexity === 'high' ? 'border-red-400/50 text-red-300' :
                                result.complexity === 'medium' ? 'border-yellow-400/50 text-yellow-300' :
                                'border-green-400/50 text-green-300'
                              }`}
                            >
                              {result.complexity.toUpperCase()}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Cost Savings</span>
                            <Badge variant="outline" className="border-green-400/50 text-green-300">
                              {result.savings}%
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Response */}
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                          AI Response
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 leading-relaxed">{result.response}</p>
                        
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>Cost: ${result.cost.toFixed(4)}</span>
                            <span>Response Time: {result.responseTime.toFixed(1)}s</span>
                            <span>Model: {result.selectedModel}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Intelligent Features
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Advanced AI optimization technology that learns and adapts to deliver maximum value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Brain className="w-12 h-12 text-cyan-400 mb-4" />
                <CardTitle className="text-white">Smart Routing</CardTitle>
                <CardDescription className="text-gray-400">
                  Automatically selects the optimal AI model based on query complexity and requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <DollarSign className="w-12 h-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Cost Optimization</CardTitle>
                <CardDescription className="text-gray-400">
                  Reduce AI costs by up to 98% while maintaining the same quality and performance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Zap className="w-12 h-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">Real-time Processing</CardTitle>
                <CardDescription className="text-gray-400">
                  Lightning-fast response times with intelligent caching and optimization
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Enterprise Security</CardTitle>
                <CardDescription className="text-gray-400">
                  SOC2 compliant with end-to-end encryption and data privacy protection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Advanced Analytics</CardTitle>
                <CardDescription className="text-gray-400">
                  Comprehensive dashboards with ROI tracking and usage insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Settings className="w-12 h-12 text-gray-400 mb-4" />
                <CardTitle className="text-white">Easy Integration</CardTitle>
                <CardDescription className="text-gray-400">
                  Simple API integration with existing systems and workflows
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose NowGo AI?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Transform your AI operations with proven cost optimization technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">98% Cost Reduction</h3>
                  <p className="text-gray-400">
                    Dramatically reduce your AI operational costs without compromising on quality or performance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Instant Implementation</h3>
                  <p className="text-gray-400">
                    Deploy in minutes with our simple API integration. No complex setup or lengthy onboarding.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Continuous Learning</h3>
                  <p className="text-gray-400">
                    Our AI gets smarter over time, continuously optimizing model selection for better results.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Cost Comparison
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <span className="text-white">Traditional GPT-4 Only</span>
                  <span className="text-red-400 font-bold">$21,000/month</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <span className="text-white">With NowGo AI</span>
                  <span className="text-green-400 font-bold">$420/month</span>
                </div>
                
                <div className="text-center pt-4">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">$20,580</div>
                  <div className="text-gray-400">Monthly Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-black/10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan for your AI optimization needs. All plans include our intelligent routing technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm relative">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl mb-2">Starter</CardTitle>
                <div className="text-4xl font-bold text-cyan-400 mb-2">$99</div>
                <div className="text-gray-400">/month</div>
                <CardDescription className="text-gray-300 mt-4">
                  Perfect for small teams getting started with AI cost optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>10,000 API requests/month</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Smart AI model routing</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Real-time cost optimization</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Basic analytics dashboard</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Email support</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Up to 98% cost savings</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-white text-cyan-600 hover:bg-gray-100">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="bg-white/5 border-cyan-400/50 backdrop-blur-sm relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl mb-2">Professional</CardTitle>
                <div className="text-4xl font-bold text-cyan-400 mb-2">$299</div>
                <div className="text-gray-400">/month</div>
                <CardDescription className="text-gray-300 mt-4">
                  Ideal for growing companies with higher AI usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>50,000 API requests/month</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Everything in Starter</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Advanced analytics & insights</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Custom model preferences</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Webhook integrations</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Team collaboration tools</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm relative">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl mb-2">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-cyan-400 mb-2">$999</div>
                <div className="text-gray-400">/month</div>
                <CardDescription className="text-gray-300 mt-4">
                  For large organizations with enterprise requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>200,000 API requests/month</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Everything in Professional</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Custom integrations</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>SLA guarantees</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>On-premise deployment option</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Advanced security features</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>Custom model training</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-white text-cyan-600 hover:bg-gray-100">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* API Information */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">
              Powerful API for Developers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">FastAPI</h4>
                  <p className="text-gray-400 text-sm">High-performance API built with FastAPI</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Secure</h4>
                  <p className="text-gray-400 text-sm">API key authentication & rate limiting</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Analytics</h4>
                  <p className="text-gray-400 text-sm">Detailed usage stats & cost tracking</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Settings className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Easy Integration</h4>
                  <p className="text-gray-400 text-sm">RESTful API with comprehensive docs</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3">
                View API Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Optimize Your AI Costs?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of companies already saving thousands on AI operations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4">
                Start Free Trial
              </Button>
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100 border border-white px-8 py-4">
                Schedule Demo
              </Button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-cyan-400" />
              <span className="text-white font-semibold">NowGo AI Platform</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            © 2025 NowGo AI Platform. Built with intelligent AI cost optimization technology.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
