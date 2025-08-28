import React, { useState } from 'react';
import { Satellite, Download, RefreshCw, Calendar, MapPin, Eye } from 'lucide-react';

const SatelliteDataView = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [processing, setProcessing] = useState(false);

  const handleProcess = () => {
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2000);
  };

  const vegetationIndices = [
    { name: 'NDVI', value: '0.74', color: 'bg-green-500', description: 'Normalized Difference Vegetation Index' },
    { name: 'EVI', value: '0.68', color: 'bg-blue-500', description: 'Enhanced Vegetation Index' },
    { name: 'SARVI', value: '0.71', color: 'bg-purple-500', description: 'Soil Adjusted Vegetation Index' },
    { name: 'GCI', value: '0.82', color: 'bg-teal-500', description: 'Green Chlorophyll Index' },
    { name: 'RVI', value: '3.2', color: 'bg-orange-500', description: 'Ratio Vegetation Index' },
    { name: 'NPCRI', value: '0.45', color: 'bg-red-500', description: 'Normalized Pigment Chlorophyll Ratio Index' },
    { name: 'NDMI', value: '0.58', color: 'bg-cyan-500', description: 'Normalized Difference Moisture Index' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Satellite Data Processing</h1>
          <p className="text-gray-600">Process Sentinel-2 imagery for maize area identification</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleProcess}
            disabled={processing}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 disabled:opacity-50 flex items-center space-x-2"
          >
            {processing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Satellite className="h-4 w-4" />}
            <span>{processing ? 'Processing...' : 'Process Data'}</span>
          </button>
        </div>
      </div>

      {/* Data Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Selection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>All Regions</option>
              <option>Northern Zone</option>
              <option>Central Zone</option>
              <option>Southern Zone</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cloud Coverage</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>Less than 10%</option>
              <option>Less than 20%</option>
              <option>Less than 30%</option>
            </select>
          </div>
        </div>
      </div>

      {/* Maize Area Map Visualization */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <span>Maize Area Classification</span>
        </h2>
        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-8 text-center border-2 border-dashed border-green-300">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg inline-block shadow-md">
              <Eye className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-semibold text-gray-800">Interactive Map View</p>
              <p className="text-sm text-gray-600">Classified maize areas with confidence levels</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="w-4 h-4 bg-green-600 rounded mx-auto mb-1"></div>
                <p className="text-xs text-gray-600">High Confidence</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="w-4 h-4 bg-green-400 rounded mx-auto mb-1"></div>
                <p className="text-xs text-gray-600">Medium Confidence</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="w-4 h-4 bg-yellow-400 rounded mx-auto mb-1"></div>
                <p className="text-xs text-gray-600">Low Confidence</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="w-4 h-4 bg-gray-400 rounded mx-auto mb-1"></div>
                <p className="text-xs text-gray-600">Non-Maize</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vegetation Indices */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Vegetation Indices Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vegetationIndices.map((index, i) => {
            const colors = [
              'from-green-500 to-green-600',
              'from-blue-500 to-blue-600',
              'from-purple-500 to-purple-600',
              'from-teal-500 to-teal-600',
              'from-orange-500 to-orange-600',
              'from-red-500 to-red-600',
              'from-cyan-500 to-cyan-600',
            ];
            
            return (
              <div key={index.name} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{index.name}</h3>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors[i % colors.length]}`}></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current:</span>
                    <span className="font-semibold text-gray-900">{index.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${colors[i % colors.length]} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${parseFloat(index.value) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{index.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SatelliteDataView;