import React, { useState } from 'react';
import { Satellite, Cloud, BarChart3, TrendingUp, MapPin, Calendar, Leaf, Activity } from 'lucide-react';
import Dashboard from './components/Dashboard';
import SatelliteDataView from './components/SatelliteDataView';
import YieldPrediction from './components/YieldPrediction';
import CropHealth from './components/CropHealth';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'satellite', label: 'Satellite Data', icon: Satellite },
    { id: 'prediction', label: 'Yield Prediction', icon: TrendingUp },
    { id: 'health', label: 'Crop Health', icon: Leaf },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'satellite':
        return <SatelliteDataView />;
      case 'prediction':
        return <YieldPrediction />;
      case 'health':
        return <CropHealth />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AgriVision</h1>
                <p className="text-xs text-gray-500">Crop Yield Prediction Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Season 2024-25</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-lg min-h-screen border-r border-green-100">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Navigation</h2>
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveView(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeView === item.id
                          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;