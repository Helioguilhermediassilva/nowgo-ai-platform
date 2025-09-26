import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          NowGo AI Platform
        </h1>
        <p className="text-xl text-white text-center">
          Intelligent AI Cost Optimization Platform
        </p>
        <div className="text-center mt-8">
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
