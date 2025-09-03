import React from 'react';
import { TrendingUp, MapPin, Cloud, Satellite, BarChart3, AlertTriangle, Calendar } from 'lucide-react';
import { useFields } from '../hooks/useFields';
import { useAlerts } from '../hooks/useAlerts';
import WorkflowDiagram from './WorkflowDiagram';
import MetricsCards from './MetricsCards';

const Dashboard = () => {
  const { fields, loading: fieldsLoading } = useFields();
  const { alerts, loading: alertsLoading } = useAlerts();

  const recentActivity = [
    {
      type: 'prediction',
      title: 'Yield Forecast Updated',
      description: 'AI model processed new satellite data',
      time: '2 hours ago',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100'
    },
    {
      type: 'satellite',
      title: 'New Satellite Data',
      description: 'Sentinel-2 imagery processed for all fields',
      time: '6 hours ago',
      icon: Satellite,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      type: 'weather',
      title: 'Weather Update',
      description: 'Favorable conditions for next 7 days',
      time: '1 day ago',
      icon: Cloud,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const quickStats = [
    { 
      label: 'Active Fields', 
      value: fieldsLoading ? '...' : fields.length.toString(), 
      icon: MapPin, 
      color: 'text-green-600' 
    },
    { 
      label: 'Total Area', 
      value: fieldsLoading ? '...' : `${fields.reduce((sum, field) => sum + field.area, 0).toFixed(1)} ha`, 
      icon: BarChart3, 
      color: 'text-blue-600' 
    },
    { 
      label: 'Avg Health', 
      value: fieldsLoading ? '...' : fields.length > 0 ? `${Math.round(fields.reduce((sum, field) => sum + field.health_score, 0) / fields.length)}%` : '0%', 
      icon: TrendingUp, 
      color: 'text-purple-600' 
    },
    { 
      label: 'Alerts', 
      value: alertsLoading ? '...' : alerts.filter(alert => !alert.read).length.toString(), 
      icon: AlertTriangle, 
      color: 'text-orange-600' 
    }
  ];

  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical' && !alert.read).slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CropSight</h1>
          <p className="text-gray-600">Your comprehensive agricultural intelligence dashboard</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-green-100">
          <Calendar className="h-4 w-4" />
          <span>Growing Season 2024-25</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4 border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3">
                <Icon className={`h-6 w-6 ${stat.color}`} />
                <div>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Metrics */}
      <MetricsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Recent Activity</span>
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className={`p-2 rounded-lg ${activity.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm">{activity.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Workflow Diagram */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
              <Satellite className="h-5 w-5 text-blue-600" />
              <span>AI Prediction Workflow</span>
            </h2>
            <WorkflowDiagram />
          </div>
        </div>
      </div>

      {/* Critical Alerts Summary */}
      {criticalAlerts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Critical Alerts</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-red-800">Critical</span>
                </div>
                <h3 className="font-semibold text-red-900 mb-1">{alert.title}</h3>
                <p className="text-sm text-red-700">{alert.message}</p>
                <button
                  onClick={() => markAsRead(alert.id)}
                  className="mt-3 text-xs text-red-600 hover:text-red-800 font-medium"
                >
                  Mark as read
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Welcome Message for New Users */}
      {fields.length === 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-green-200">
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
              <Satellite className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to CropSight!</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get started by adding your first field to begin monitoring crop health, 
              receiving yield predictions, and accessing weather insights.
            </p>
            <button
              onClick={() => window.location.href = '/fields'}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1"
            >
              Add Your First Field
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;