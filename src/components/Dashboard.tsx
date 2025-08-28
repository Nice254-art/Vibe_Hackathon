import React from 'react';
import { TrendingUp, MapPin, Cloud, Satellite, BarChart3, AlertTriangle } from 'lucide-react';
import WorkflowDiagram from './WorkflowDiagram';
import MetricsCards from './MetricsCards';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Agricultural Intelligence Dashboard</h1>
        <p className="text-gray-600">Monitor crop health and predict yields using satellite data and machine learning</p>
      </div>

      {/* Key Metrics */}
      <MetricsCards />

      {/* Workflow Visualization */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-green-600" />
          <span>Prediction Methodology</span>
        </h2>
        <WorkflowDiagram />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Satellite className="h-5 w-5 text-blue-600" />
            <span>Latest Satellite Data</span>
          </h3>
          <div className="space-y-3">
            {[
              { date: '2024-01-15', source: 'Sentinel-2', coverage: '98%', quality: 'Excellent' },
              { date: '2024-01-10', source: 'Sentinel-2', coverage: '95%', quality: 'Good' },
              { date: '2024-01-05', source: 'Sentinel-2', coverage: '92%', quality: 'Good' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.source}</p>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{item.coverage} coverage</p>
                  <p className="text-xs text-gray-500">{item.quality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Alerts & Notifications</span>
          </h3>
          <div className="space-y-3">
            {[
              { type: 'Weather', message: 'Heavy rainfall expected in Region A', severity: 'high' },
              { type: 'Prediction', message: 'Yield forecast updated for Q2', severity: 'medium' },
              { type: 'Health', message: 'Crop stress detected in Zone 3', severity: 'high' },
            ].map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{alert.type}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;