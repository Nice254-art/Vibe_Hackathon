import React from 'react';
import { TrendingUp, Droplets, Sun, AlertTriangle } from 'lucide-react';

interface VegetationIndex {
  name: string;
  value: string;
  color: string;
  description: string;
}

const YieldPrediction: React.FC = () => {
  const vegetationIndices: VegetationIndex[] = [
    {
      name: 'NDVI',
      value: '0.72',
      color: 'bg-green-500',
      description: 'Normalized Difference Vegetation Index'
    },
    {
      name: 'SARVI',
      value: '0.68',
      color: 'bg-emerald-500',
      description: 'Soil Adjusted and Atmospherically Resistant Vegetation Index'
    },
    {
      name: 'EVI',
      value: '0.65',
      color: 'bg-lime-500',
      description: 'Enhanced Vegetation Index'
    }
  ];

  const predictedYield = 4.2;
  const confidence = 87;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Yield Prediction</h2>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span className="text-sm text-gray-600">ML Model Active</span>
        </div>
      </div>

      {/* Predicted Yield Card */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Predicted Maize Yield
            </h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-green-600">
                {predictedYield}
              </span>
              <span className="text-gray-600">tons/hectare</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600">Confidence: </span>
              <span className="text-sm font-semibold text-green-600 ml-1">
                {confidence}%
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Vegetation Indices */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Vegetation Health Indices
        </h3>
        <div className="space-y-4">
          {vegetationIndices.map((index, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{index.name}</h4>
                  <p className="text-sm text-gray-600">{index.description}</p>
                </div>
                <span className="text-lg font-bold text-gray-800">
                  {index.value}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`${index.color} h-1.5 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(parseFloat(index.value) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Droplets className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-semibold text-gray-800">Rainfall</h4>
              <p className="text-sm text-gray-600">Last 30 days</p>
              <p className="text-lg font-bold text-blue-600">142mm</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Sun className="w-6 h-6 text-yellow-600" />
            <div>
              <h4 className="font-semibold text-gray-800">Temperature</h4>
              <p className="text-sm text-gray-600">Average</p>
              <p className="text-lg font-bold text-yellow-600">24°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-800">Weather Alert</h4>
            <p className="text-sm text-orange-700">
              Drought conditions expected in the next 2 weeks. Consider irrigation planning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;