import React, { useState } from 'react';
import { TrendingUp, Calendar, MapPin, BarChart3, Target, Zap, Brain } from 'lucide-react';

const YieldPrediction = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('season-end');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const predictionData = {
    'season-end': {
      yield: '4.2 t/ha',
      confidence: '92%',
      range: '3.8 - 4.6 t/ha',
      factors: ['Favorable rainfall', 'Good vegetation health', 'Optimal temperature']
    },
    'mid-season': {
      yield: '3.9 t/ha',
      confidence: '85%',
      range: '3.5 - 4.3 t/ha',
      factors: ['Moderate rainfall', 'Average vegetation health', 'Temperature stress']
    },
    'harvest': {
      yield: '4.1 t/ha',
      confidence: '96%',
      range: '3.9 - 4.3 t/ha',
      factors: ['Harvest conditions good', 'Minimal disease pressure', 'Optimal maturity']
    }
  };

  const currentPrediction = predictionData[selectedPeriod as keyof typeof predictionData];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Yield Prediction Models</h1>
        <p className="text-gray-600">GPR-based yield forecasting with Gaussian processing framework</p>
      </div>

      {/* Prediction Controls */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Target className="h-5 w-5 text-green-600" />
          <span>Prediction Parameters</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prediction Period</label>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="mid-season">Mid-Season</option>
              <option value="season-end">Season End</option>
              <option value="harvest">Pre-Harvest</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Regions</option>
              <option value="north">Northern Zone</option>
              <option value="central">Central Zone</option>
              <option value="south">Southern Zone</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model Version</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>GPR v2.1 (Latest)</option>
              <option>GPR v2.0</option>
              <option>GPR v1.9</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prediction Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>GPR Model Output</span>
          </h2>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl">
                <h3 className="text-3xl font-bold">{currentPrediction.yield}</h3>
                <p className="text-green-100 mt-1">Predicted Yield</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-1">Confidence</h4>
                <p className="text-2xl font-bold text-blue-900">{currentPrediction.confidence}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-1">Range</h4>
                <p className="text-lg font-bold text-purple-900">{currentPrediction.range}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Key Factors</h4>
              <div className="space-y-2">
                {currentPrediction.factors.map((factor, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <span>Historical Comparison</span>
          </h2>
          
          <div className="space-y-4">
            {[
              { year: '2024 (Predicted)', yield: 4.2, color: 'bg-green-500', current: true },
              { year: '2023', yield: 3.8, color: 'bg-blue-400', current: false },
              { year: '2022', yield: 4.0, color: 'bg-blue-400', current: false },
              { year: '2021', yield: 3.6, color: 'bg-blue-400', current: false },
              { year: '5-Year Avg', yield: 3.7, color: 'bg-gray-400', current: false },
            ].map((item, index) => (
              <div key={index} className={`p-4 rounded-xl border-2 ${item.current ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${item.current ? 'text-green-800' : 'text-gray-700'}`}>
                    {item.year}
                  </span>
                  <span className={`text-lg font-bold ${item.current ? 'text-green-900' : 'text-gray-900'}`}>
                    {item.yield} t/ha
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${(item.yield / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vegetation Indices Grid */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-600" />
          <span>Vegetation Index Analysis</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vegetationIndices.map((index) => (
            <div key={index.name} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800 text-lg">{index.name}</h3>
                <div className={`w-4 h-4 rounded-full ${index.color.replace('bg-', 'bg-gradient-to-r from-').replace('-500', '-400 to-').replace('-500', '-600')}`}></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">{index.value}</span>
                  <span className="text-sm text-green-600 font-medium">Optimal</span>
                </div>
                <p className="text-xs text-gray-500 leading-tight">{index.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`${index.color} h-1.5 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(parseFloat(index.value) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;