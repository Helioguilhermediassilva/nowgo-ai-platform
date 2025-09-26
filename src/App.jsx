import React, { useState } from 'react';
import './App.css';

// Componentes básicos inline para evitar problemas de import
const Button = ({ children, className, onClick, ...props }) => (
  <button 
    className={`inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
    {children}
  </span>
);

const Input = ({ className, ...props }) => (
  <input 
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${className}`}
    {...props}
  />
);

const Textarea = ({ className, ...props }) => (
  <textarea 
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${className}`}
    {...props}
  />
);

// Ícones simples inline
const DollarSign = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const Zap = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

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
  
  selectModel: (complexity, priority = 'balanced') => {
    const models = {
      'GPT-J': { cost: 0.0002, quality: 0.7, speed: 0.9 },
      'GPT-3.5': { cost: 0.002, quality: 0.85, speed: 0.8 },
      'GPT-4': { cost: 0.06, quality: 0.95, speed: 0.6 }
    };
    
    if (priority === 'cost' && complexity === 'low') return 'GPT-J';
    if (priority === 'quality' || complexity === 'high') return 'GPT-4';
    return 'GPT-3.5';
  },
  
  calculateSavings: (selectedModel) => {
    const gpt4Cost = 0.06;
    const modelCosts = { 'GPT-J': 0.0002, 'GPT-3.5': 0.002, 'GPT-4': 0.06 };
    const savings = ((gpt4Cost - modelCosts[selectedModel]) / gpt4Cost) * 100;
    return Math.max(0, Math.round(savings));
  }
};

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptimize = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const complexity = intelligentRouter.analyzeComplexity(query);
    const selectedModel = intelligentRouter.selectModel(complexity, 'balanced');
    const savings = intelligentRouter.calculateSavings(selectedModel);
    
    setResult({
      query,
      complexity,
      selectedModel,
      savings,
      responseTime: Math.random() * 2 + 0.5,
      cost: selectedModel === 'GPT-J' ? 0.0002 : selectedModel === 'GPT-3.5' ? 0.002 : 0.06
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">NowGo AI</span>
                <Badge className="bg-cyan-400/20 text-cyan-300 border-cyan-400/30">
                  Platform
                </Badge>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#api-docs" className="text-gray-300 hover:text-white transition-colors">API Docs</a>
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
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Reduce AI Costs by{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              98%
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Intelligent AI model routing that automatically selects the most cost-effective model 
            for each query while maintaining quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 text-lg">
              Start Free Trial
            </Button>
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Interactive Demo */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  Try Our Intelligent Routing Algorithm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter your AI query here to see how much you can save..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                  />
                  <Button
                    onClick={handleOptimize}
                    disabled={!query.trim() || isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3"
                  >
                    {isLoading ? 'Optimizing...' : 'Optimize Query'}
                  </Button>
                </div>

                {result && (
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Analysis Results</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Complexity:</span>
                          <span className="text-white font-medium capitalize">{result.complexity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Selected Model:</span>
                          <span className="text-cyan-400 font-medium">{result.selectedModel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Response Time:</span>
                          <span className="text-white font-medium">{result.responseTime.toFixed(2)}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Cost per Query:</span>
                          <span className="text-white font-medium">${result.cost.toFixed(4)}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-green-400/30">
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Cost Savings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-400 mb-2">
                            {result.savings}%
                          </div>
                          <p className="text-gray-300">
                            Saved vs GPT-4 only approach
                          </p>
                          <p className="text-sm text-gray-400 mt-2">
                            Monthly savings on 10K queries: ${((0.06 - result.cost) * 10000).toFixed(0)}
                          </p>
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
      <section id="features" className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose NowGo AI Platform?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our intelligent routing system automatically optimizes your AI costs without sacrificing quality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Intelligent Routing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Our AI analyzes each query and automatically routes it to the most cost-effective model 
                  that can deliver the required quality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Massive Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Save up to 98% on AI costs compared to using premium models for all queries. 
                  Typical customers save $50,000+ annually.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Bank-grade security with SOC 2 compliance, end-to-end encryption, 
                  and complete data privacy protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include our intelligent routing technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold text-white">
                  $99<span className="text-lg font-normal text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">10,000 requests/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Intelligent routing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Email support</span>
                  </li>
                </ul>
                <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="bg-gradient-to-b from-cyan-500/20 to-blue-500/20 border-cyan-400/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-white text-2xl">Professional</CardTitle>
                <div className="text-4xl font-bold text-white">
                  $299<span className="text-lg font-normal text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">50,000 requests/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-white">
                  $999<span className="text-lg font-normal text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">200,000 requests/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">On-premise deployment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">SLA guarantee</span>
                  </li>
                </ul>
                <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 to-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Optimize Your AI Costs?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Join thousands of companies already saving up to 98% on AI costs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Start Free Trial
            </Button>
            <Button className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-cyan-100 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
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
