import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Calendar } from 'lucide-react';

const Analytics = () => {
  const yieldData = [
    { year: '2020', predicted: 3.8, actual: 3.6 },
    { year: '2021', predicted: 4.1, actual: 4.3 },
    { year: '2022', predicted: 3.9, actual: 3.7 },
    { year: '2023', predicted: 4.5, actual: 4.4 },
    { year: '2024', predicted: 4.8, actual: null }
  ];

  const vegetationTrend = [
    { month: 'Jan', ndvi: 0.3, evi: 0.25, sarvi: 0.28 },
    { month: 'Feb', ndvi: 0.4, evi: 0.35, sarvi: 0.38 },
    { month: 'Mar', ndvi: 0.6, evi: 0.52, sarvi: 0.58 },
    { month: 'Apr', ndvi: 0.75, evi: 0.68, sarvi: 0.72 },
    { month: 'May', ndvi: 0.82, evi: 0.76, sarvi: 0.79 },
    { month: 'Jun', ndvi: 0.78, evi: 0.71, sarvi: 0.75 }
  ];

  const cropDistribution = [
    { name: 'Maize', value: 65, color: '#22c55e' },
    { name: 'Wheat', value: 20, color: '#f59e0b' },
    { name: 'Sorghum', value: 10, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ];

  const fieldPerformance = [
    { field: 'North Field', health: 92, yield: 4.8, area: 5.2 },
    { field: 'South Field', health: 76, yield: 3.9, area: 3.8 },
    { field: 'East Field', health: 88, yield: 4.5, area: 7.1 },
    { field: 'West Field', health: 84, yield: 4.2, area: 4.5 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into your agricultural performance</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">4.6 t/ha</p>
          <p className="text-sm text-gray-600">Average Yield</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">87%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">85%</p>
          <p className="text-sm text-gray-600">Avg Health Score</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Active</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">20.6 ha</p>
          <p className="text-sm text-gray-600">Total Area</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <PieChartIcon className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">4 Fields</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">94.8 t</p>
          <p className="text-sm text-gray-600">Total Predicted</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Yield Comparison Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Yield Performance Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="predicted" fill="#22c55e" name="Predicted Yield" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="#16a34a" name="Actual Yield" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Vegetation Indices Trend */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Vegetation Indices Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vegetationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="ndvi" stroke="#22c55e" strokeWidth={3} name="NDVI" />
              <Line type="monotone" dataKey="evi" stroke="#3b82f6" strokeWidth={3} name="EVI" />
              <Line type="monotone" dataKey="sarvi" stroke="#8b5cf6" strokeWidth={3} name="SARVI" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Crop Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Crop Distribution</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Field Performance Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Field Performance Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Field</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Health</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Yield</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Area</th>
                </tr>
              </thead>
              <tbody>
                {fieldPerformance.map((field, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-900">{field.field}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        field.health >= 85 ? 'bg-green-100 text-green-800' :
                        field.health >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {field.health}%
                      </span>
                    </td>
                    <td className="py-3 px-2 font-semibold text-green-600">{field.yield} t/ha</td>
                    <td className="py-3 px-2 text-gray-600">{field.area} ha</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;