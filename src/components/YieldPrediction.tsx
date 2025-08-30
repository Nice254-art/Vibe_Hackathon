import React, { useState } from 'react';
import { TrendingUp, Droplets, Sun, AlertTriangle, Brain, Target, Calendar, MapPin } from 'lucide-react';

interface VegetationIndex {
  name: string;
  value: string;
  color: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

const YieldPrediction: React.FC = () => {
  const [selectedField, setSelectedField] = useState('all');
  
  const vegetationIndices: VegetationIndex[] = [
    {
      name: 'NDVI',
      value: '0.72',
      color: 'from-green-500 to-green-600',
      description: 'Normalized Difference Vegetation Index',
      trend: 'up'
    },
    {
      name: 'SARVI',
      value: '0.68',
      color: 'from-emerald-500 to-emerald-600',
      description: 'Soil Adjusted and Atmospherically Resistant Vegetation Index',
      trend: 'stable'
    },
    {
      name: 'EVI',
      value: '0.65',
      color: 'from-lime-500 to-lime-600',
      description: 'Enhanced Vegetation Index',
      trend: 'up'
    },
    {
      name: 'GCI',
      value: '0.82',
      color: 'from-teal-500 to-teal-600',
      description: 'Green Chlorophyll Index',
      trend: 'down'
    },
    {
      name: 'RVI',
      value: '3.2',
      color: 'from-orange-500 to-orange-600',
      description: 'Ratio Vegetation Index',
      trend: 'up'
    },
    {
      name: 'NPCRI',
      value: '0.45',
      color: 'from-red-500 to-red-600',
      description: 'Normalized Pigment Chlorophyll Ratio Index',
      trend: 'stable'
    },
    {
      name: 'NDMI',
      value: '0.58',
      color: 'from-cyan-500 to-cyan-600',
      description: 'Normalized Difference Moisture Index',
      trend: 'down'
    }
  ];

  const predictions = [
    { field: 'North Field', yield: 4.8, confidence: 92, area: 5.2, total: 25.0 },
    { field: 'South Field', yield: 3.9, confidence: 87, area: 3.8, total: 14.8 },
    { field: 'East Field', yield: 4.5, confidence: 89, area: 7.1, total: 32.0 },
    { field: 'West Field', yield: 4.2, confidence: 85, area: 4.5, total: 18.9 }
  ];

  const totalPredictedYield = predictions.reduce((sum, pred) => sum + pred.total, 0);
  const averageConfidence = predictions.reduce((sum, pred) => sum + pred.confidence, 0) / predictions.length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Yield Prediction</h1>
          <p className="text-gray-600">Machine learning-powered maize yield forecasting using satellite data</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Fields</option>
            {predictions.map((pred) => (
              <option key={pred.field} value={pred.field}>{pred.field}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Overall Prediction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
              Total Forecast
            </span>
          </div>
          <h3 className="text-3xl font-bold text-green-600 mb-2">{totalPredictedYield.toFixed(1)} tons</h3>
          <p className="text-gray-700 font-medium">Total Predicted Harvest</p>
          <p className="text-sm text-gray-600 mt-1">Across all monitored fields</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              AI Confidence
            </span>
          </div>
          <h3 className="text-3xl font-bold text-blue-600 mb-2">{averageConfidence.toFixed(0)}%</h3>
          <p className="text-gray-700 font-medium">Model Accuracy</p>
          <p className="text-sm text-gray-600 mt-1">Based on historical validation</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              Harvest Time
            </span>
          </div>
          <h3 className="text-3xl font-bold text-purple-600 mb-2">45 days</h3>
          <p className="text-gray-700 font-medium">Until Harvest</p>
          <p className="text-sm text-gray-600 mt-1">Estimated maturity date</p>
        </div>
      </div>

      {/* Field-by-Field Predictions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span>Field-by-Field Predictions</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {predictions.map((prediction, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{prediction.field}</h3>
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  prediction.confidence >= 90 ? 'bg-green-100 text-green-800' :
                  prediction.confidence >= 85 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {prediction.confidence}% confidence
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Yield per hectare</p>
                  <p className="text-2xl font-bold text-green-600">{prediction.yield} t/ha</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total harvest</p>
                  <p className="text-2xl font-bold text-gray-900">{prediction.total} tons</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Field area: <span className="font-medium text-gray-900">{prediction.area} hectares</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vegetation Indices */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Vegetation Health Indices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vegetationIndices.map((index, i) => {
            const getTrendIcon = (trend: string) => {
              switch (trend) {
                case 'up': return '↗️';
                case 'down': return '↘️';
                default: return '→';
              }
            };

            return (
              <div key={index.name} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{index.name}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">{getTrendIcon(index.trend)}</span>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${index.color}`}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current:</span>
                    <span className="font-semibold text-gray-900">{index.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${index.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(parseFloat(index.value) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{index.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Environmental Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-600" />
            <span>Rainfall Impact</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700">Last 30 days</span>
              <span className="font-bold text-blue-800">142mm</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-green-700">Seasonal total</span>
              <span className="font-bold text-green-800">387mm</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm text-yellow-700">Forecast (7 days)</span>
              <span className="font-bold text-yellow-800">45mm</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Sun className="h-5 w-5 text-yellow-600" />
            <span>Temperature Analysis</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-orange-700">Average daily</span>
              <span className="font-bold text-orange-800">24°C</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-sm text-red-700">Maximum</span>
              <span className="font-bold text-red-800">31°C</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700">Minimum</span>
              <span className="font-bold text-blue-800">17°C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>AI Model Information</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Model Type</h3>
            <p className="text-lg font-bold text-purple-600">Gaussian Process Regression</p>
            <p className="text-sm text-purple-700 mt-1">Advanced probabilistic modeling</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Training Data</h3>
            <p className="text-lg font-bold text-blue-600">5,000+ Fields</p>
            <p className="text-sm text-blue-700 mt-1">African maize datasets</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Accuracy</h3>
            <p className="text-lg font-bold text-green-600">87%</p>
            <p className="text-sm text-green-700 mt-1">Validated performance</p>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Model Inputs</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['NDVI', 'EVI', 'SARVI', 'Rainfall', 'Temperature', 'Soil Moisture', 'Planting Date', 'Field History'].map((input) => (
              <span key={input} className="bg-white text-gray-700 px-3 py-1 rounded-lg text-sm font-medium text-center border border-gray-200">
                {input}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-orange-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-800 mb-2">Prediction Alert</h4>
            <p className="text-orange-700 mb-3">
              Weather patterns suggest potential yield reduction in South Field. Consider implementing 
              irrigation strategies to maintain optimal soil moisture levels.
            </p>
            <div className="flex space-x-3">
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                View Recommendations
              </button>
              <button className="border border-orange-600 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;