import React from 'react';
import { Leaf, AlertTriangle, CheckCircle, XCircle, Activity, Thermometer, Droplets } from 'lucide-react';

const CropHealth = () => {
  const healthMetrics = [
    {
      name: 'Vegetation Health',
      status: 'Excellent',
      value: 92,
      color: 'green',
      icon: Leaf,
      trend: 'up'
    },
    {
      name: 'Water Stress',
      status: 'Low',
      value: 18,
      color: 'blue',
      icon: Droplets,
      trend: 'down'
    },
    {
      name: 'Temperature Stress',
      status: 'Moderate',
      value: 35,
      color: 'orange',
      icon: Thermometer,
      trend: 'stable'
    },
    {
      name: 'Disease Risk',
      status: 'Low',
      value: 12,
      color: 'green',
      icon: Activity,
      trend: 'down'
    }
  ];

  const alerts = [
    {
      level: 'warning',
      title: 'Water Stress Detected',
      description: 'Zone 3 showing signs of water stress - consider irrigation',
      time: '2 hours ago'
    },
    {
      level: 'info',
      title: 'Optimal Growth Period',
      description: 'Current conditions are ideal for maize development',
      time: '6 hours ago'
    },
    {
      level: 'success',
      title: 'Disease Monitoring',
      description: 'No disease outbreaks detected in monitored areas',
      time: '1 day ago'
    }
  ];

  const regions = [
    { name: 'Northern Zone', health: 95, area: '45,230 ha', status: 'Excellent' },
    { name: 'Central Zone', health: 88, area: '52,110 ha', status: 'Good' },
    { name: 'Southern Zone', health: 76, area: '38,450 ha', status: 'Fair' },
    { name: 'Eastern Zone', health: 91, area: '29,890 ha', status: 'Excellent' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Health Monitoring</h1>
        <p className="text-gray-600">Real-time health assessment using satellite-derived vegetation indices</p>
      </div>

      {/* Health Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = {
            green: { bg: 'from-green-500 to-green-600', text: 'text-green-600', light: 'bg-green-50' },
            blue: { bg: 'from-blue-500 to-blue-600', text: 'text-blue-600', light: 'bg-blue-50' },
            orange: { bg: 'from-orange-500 to-orange-600', text: 'text-orange-600', light: 'bg-orange-50' },
          };
          const colors = colorClasses[metric.color as keyof typeof colorClasses];

          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${colors.bg} p-3 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${colors.light} ${colors.text}`}>
                  {metric.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{metric.name}</h3>
              <div className="flex items-end space-x-2 mb-3">
                <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-gray-600">%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${colors.bg} h-2 rounded-full transition-all duration-1000`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regional Health Status */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <span>Regional Health Status</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regions.map((region, index) => {
            const getStatusColor = (health: number) => {
              if (health >= 90) return { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' };
              if (health >= 80) return { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' };
              return { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' };
            };
            
            const colors = getStatusColor(region.health);

            return (
              <div key={index} className={`${colors.light} border-2 border-opacity-20 rounded-xl p-4 hover:shadow-md transition-all duration-200`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{region.name}</h3>
                    <p className="text-sm text-gray-600">{region.area}</p>
                  </div>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${colors.light} ${colors.text}`}>
                    {region.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Health Score</span>
                  <span className="text-xl font-bold text-gray-900">{region.health}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${colors.bg} h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${region.health}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alerts and Notifications */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <span>Health Alerts</span>
        </h2>
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const getAlertIcon = (level: string) => {
              switch (level) {
                case 'warning': return { icon: AlertTriangle, color: 'text-orange-500 bg-orange-100' };
                case 'success': return { icon: CheckCircle, color: 'text-green-500 bg-green-100' };
                case 'error': return { icon: XCircle, color: 'text-red-500 bg-red-100' };
                default: return { icon: AlertTriangle, color: 'text-blue-500 bg-blue-100' };
              }
            };

            const alertConfig = getAlertIcon(alert.level);
            const AlertIcon = alertConfig.icon;

            return (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className={`p-2 rounded-full ${alertConfig.color}`}>
                  <AlertIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{alert.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CropHealth;